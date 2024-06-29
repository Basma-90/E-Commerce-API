import { Request, Response } from "express";
import {
    createSession,
    findSessions,
    updateSession,
} from "../services/auth.services";
import { validateUser } from "../services/user.services";
import { signJwt } from "../utils/jwt.utils";
import dotenv from "dotenv";
dotenv.config();
import config from "config";

export const createUserSessionHandler = async (req: Request, res: Response) => {

    const user = await validateUser(req.body);
    if (!user) {
        return res.status(401).send("Invalid username or password");
    }
    const session = await createSession(user._id, req.get("user-agent") || "");

    const accessToken = signJwt(
        {
            ...user,
            session: session._id,
        },
        'accessPrivateKey',
        {
            expiresIn: config.get('accessTokenTTL'), //15 minutes
        }
    )

    const refreshToken = signJwt(
        {
            ...user,
            session: session._id,
        },
        'refreshPrivateKey', 
        {
            expiresIn: config.get('refreshTokenTTL'), 
        }
    )

    return res.send({ accessToken, refreshToken });
}

export const getUserSessionsHandler = async (req: Request, res: Response) => {
    const user = res.locals.user;
    const sessions = await findSessions({ user: user._id, valid: true });
    return res.send(sessions);
}

export const deleteUserSessionHandler = async (req: Request, res: Response) => {
    const sessionId = res.locals.user.session;
    console.log("updated seesion", sessionId);
    console.log(sessionId);
    await updateSession({ _id: sessionId }, { valid: false });

    return res.send({
        accessToken: null,
        refreshToken: null,
    });
}

