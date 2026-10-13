import 'server-only'
import { cookies } from 'next/headers';
import { getIronSession, type SessionOptions } from 'iron-session';

export interface SpotifySession {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    oauthState?: string;
}

if (!process.env.SESSION_PASSWORD) {
    throw new Error("Missing Password");
}

const options: SessionOptions = {
    cookieName: "moodify_session",
    password: process.env.SESSION_PASSWORD,
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    },
};

export async function getSpotifySession() {
    return getIronSession<SpotifySession>(
        await cookies(),
        options
    );
}