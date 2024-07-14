import { SignJWT, jwtVerify } from 'jose';

export async function createJWT(payload, env) {
    const secretKey = new TextEncoder().encode(env.JWT_SECRET);

    const jwt = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('2h')
        .sign(secretKey);

    return jwt;
}

export async function verifyJWT(token, env) {
    try {
        const secretKey = new TextEncoder().encode(env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secretKey);
        return payload;
    } catch (error) {
        return null;
    }
}