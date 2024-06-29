import {UserDocument} from "../models/user.model";
import Auth, { AuthDocument } from "../models/auth.model";
import { FilterQuery, UpdateQuery } from "mongoose";
import { verifyJwt, signJwt } from "../utils/jwt.utils";
import { get } from "lodash";
import { findUser } from "./user.services";
import dotenv from "dotenv";
dotenv.config();
import config from "config";


export const createSession = async (user: UserDocument, userAgent: string) => {
    const session = await Auth.create({ user: user._id, userAgent });
    return session.toJSON();
}

export const findSessions = async (query: FilterQuery<AuthDocument>) => {
    return Auth.find(query).lean();
}

export const updateSession = async (query: FilterQuery<AuthDocument>, update: UpdateQuery<AuthDocument>) => {
    return Auth.updateOne(query, update);
}

export async function reIssueAccessToken({
    refreshToken,
}: {
    refreshToken: string
}) {
    const { decoded } = verifyJwt(refreshToken, 'refreshPublicKey')
    if (!decoded || !get(decoded, 'session')) return false
    const session = await Auth.findById(get(decoded, 'session'))
    if (!session || !session.valid) return false
    const user = await findUser({ _id: session.user })
    if (!user) return false

    const accessToken = signJwt(
        {
            ...user,
            session: session._id,
        },
        'accessPrivateKey',
        {
            expiresIn: config.get('accessTokenTTL'), //15 minutes
        },
    )

    console.log("reisssueaccessToken", accessToken);

    return accessToken
}