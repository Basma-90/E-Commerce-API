export default {
    saltWorkFactor: 10,
    accessTokenTTL: "15m",
    refreshTokenTTL: "1y",
    accessPrivateKey: process.env.PRIVATE_KEY || '',
    accessPublicKey: process.env.PUBLIC_KEY || '',
    refreshPrivateKey: process.env.REFRESH_PRIVATE_KEY || '',
    refreshPublicKey: process.env.REFRESH_PUBLIC_KEY || '',
};
