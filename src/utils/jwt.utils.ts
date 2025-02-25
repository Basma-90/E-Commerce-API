import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import config from 'config';



export function signJwt(object: Object,keyName:"accessPrivateKey"|"refreshPrivateKey",
    options?: jwt.SignOptions | undefined) {
    const signingKey = Buffer.from(config.get<string>(keyName),
        'base64'
    ).toString('ascii')

    return jwt.sign(object, signingKey, {
        ...(options && options),
        algorithm: 'RS256',
    })
}

export function verifyJwt(token: string,
    keyName:"accessPublicKey"|"refreshPublicKey"
) {
    const publicKey = Buffer.from(
        config.get<string>(keyName)
        , 'base64').toString(
        'ascii'
    )

    try {
        const decoded = jwt.verify(token, publicKey)
        return {
            valid: true,
            expired: false,
            decoded,
        }
    } catch (e: any) {
        console.error("jwte",e.messag);
        return {
            valid: false,
            expired: e.message === 'jwt expired',
            decoded: null,
        }
    }
}


