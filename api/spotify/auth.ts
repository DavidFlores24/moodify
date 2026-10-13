import "server-only";
import { randomBytes } from "node:crypto";
import { getSpotifySession } from "./session";

const AUTHORIZE_URL = "https://accounts.spotify.com/authorize";
const TOKEN_URL = "https://accounts.spotify.com/api/token";

function requiredEnv(name: string) {
    const value = process.env[name];
    if (!value) throw new Error(`Missing ${name}`);
    return value;
}

export async function beginSpotifyLogin() {
    const session = await getSpotifySession();
    console.log("Got session");
    const state = randomBytes(32).toString("hex");
    console.log(state);

    session.oauthState = state;
    await session.save();

    const params = new URLSearchParams({
        client_id: requiredEnv("SPOTIFY_CLIENT_ID"),
        response_type: "code",
        redirect_uri: requiredEnv("SPOTIFY_REDIRECT_URI"),
        scope: "user-top-read",
        state,
    });

    return `${AUTHORIZE_URL}?${params}`;
}

export async function exchangeCode(code: string) {
    const credentials = Buffer.from(
        `${requiredEnv("SPOTIFY_CLIENT_ID")}:${requiredEnv("SPOTIFY_CLIENT_SECRET")}`
    ).toString("base64");

    const response = await fetch(TOKEN_URL, {
        method: "POST",
        headers: {
            Authorization: `Basic ${credentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: requiredEnv("SPOTIFY_REDIRECT_URI"),
        }),
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Spotify token exchange failed");
    }

    const tokens = await response.json();

    const session = await getSpotifySession();
    session.accessToken = tokens.access_token;
    session.refreshToken = tokens.refresh_token;
    session.expiresAt = Date.now() + tokens.expires_in * 1000;
    delete session.oauthState;
    await session.save();
}