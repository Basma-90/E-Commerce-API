import { Request, Response,NextFunction } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../services/auth.services";


export const requireUser = (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.user) {
        return res.status(403).send("Unauthorized");
    }
    next();
}

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {

    const accessToken= get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
    const refreshToken= get(req, "headers.x-refresh");

    if (!accessToken) return next();
    const {decoded, expired} = verifyJwt(accessToken, 'accessPublicKey');

    if (decoded) {
        res.locals.user = decoded;
        return next();
    }

    if (expired && refreshToken && typeof refreshToken === "string") { 
        const newAccessToken = await reIssueAccessToken({ refreshToken });
        if (newAccessToken) {
            res.setHeader("x-access-token", newAccessToken);
        }

        const result = verifyJwt(newAccessToken as string,'accessPublicKey');
        res.locals.user = result.decoded;
        console.log("deserialuser",result.decoded);
        return next();
    }
    console.log("deserialuser",accessToken,refreshToken);
    return next();
}