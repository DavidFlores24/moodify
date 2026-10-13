import "server-only";
import { getSpotifySession } from "./session";

export async function getValidAccessToken() {
    const session = await getSpotifySession();

    if (!session.refreshToken || !session.accessToken) {
        throw new Error("Spotify connection required");
    }

    // Refresh a little before expiry.
    if (session.expiresAt && Date.now() < session.expiresAt - 60_000) {
        return session.accessToken;
    }

    const response = await fetch(
        "https://accounts.spotify.com/api/token",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization:
                    "Basic " +
                    Buffer.from(
                        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
                    ).toString("base64"),
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: session.refreshToken,
            }),
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Spotify token refresh failed");
    }

    const tokens = await response.json();

    session.accessToken = tokens.access_token;
    session.expiresAt = Date.now() + tokens.expires_in * 1000;

    // Spotify may or may not return a replacement refresh token.
    if (tokens.refresh_token) {
        session.refreshToken = tokens.refresh_token;
    }

    await session.save();
    return session.accessToken;
}