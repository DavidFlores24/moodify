import "server-only";
import { getValidAccessToken } from "./access-token";

export async function spotifyFetch<T>(
    path: string
): Promise<T> {
    console.log('fetching from spotify');
    const accessToken = await getValidAccessToken();

    const response = await fetch(
        `https://api.spotify.com/v1${path}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error(`Spotify API error: ${response.status}`);
    }

    return response.json() as Promise<T>;
}