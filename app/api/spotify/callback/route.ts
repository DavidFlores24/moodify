import { NextRequest, NextResponse } from "next/server";
import { exchangeCode } from "@/api/spotify/auth";
import { getSpotifySession } from "@/api/spotify/session";

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const error = url.searchParams.get("error");

    const session = await getSpotifySession();

    const appUrl =
        process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:3000"
            : new URL(request.url).origin;

    if (error) {
        console.log("error authenticating");
        delete session.oauthState;
        await session.save();
        return NextResponse.redirect(
            new URL("/?spotify_error=access_denied", appUrl)
        );
    }

    if (
        !code ||
        !state ||
        !session.oauthState ||
        state !== session.oauthState
    ) {
        return NextResponse.redirect(
            new URL("/?spotify_error=invalid_state", appUrl)
        );
    }

    try {
        await exchangeCode(code);

        return NextResponse.redirect(
            new URL("/?connected=true", appUrl)
        );
    } catch (error) {
        console.error(
            "Spotify callback failed:",
            error instanceof Error
                ? error.message
                : "Unknown error"
        );

        return NextResponse.redirect(
            new URL("/?spotify_error=connection_failed", appUrl)
        );
    }
}