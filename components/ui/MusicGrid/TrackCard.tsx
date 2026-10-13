import Image from 'next/image'
import { ExternalLink } from "lucide-react";
import type { Track } from "@/types/music";

type Props = {
    track: Track;
    rank?: number;
};

export function TrackCard({ track, rank }: Props) {
    const artwork = track.album.images[0]?.url;
    const spotifyUrl = track.external_urls?.spotify;

    return (
        <article className="group flex min-w-0 items-center gap-3 rounded-2xl border border-border bg-surface p-3 transition-colors hover:bg-surface-hover">
            {rank !== undefined && (
                <span className="w-5 shrink-0 text-sm text-muted">
          {rank}
        </span>
            )}

            {artwork ? (
                <Image
                    src={artwork}
                    alt=""
                    className="h-16 w-16 shrink-0 rounded-xl object-cover"
                    loading="lazy"
                />
            ) : (
                <div
                    aria-hidden="true"
                    className="h-16 w-16 shrink-0 rounded-xl bg-surface-hover"
                />
            )}

            <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold">
                    {track.name}
                </h3>

                <p className="mt-1 truncate text-sm text-muted">
                    {track.artists.map((artist) => artist.name).join(", ")}
                </p>

                <p className="mt-1 truncate text-xs text-muted">
                    {track.album.name}
                </p>
            </div>

            {spotifyUrl && (
                <a
                    href={spotifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${track.name} on Spotify`}
                    className="shrink-0 rounded-lg p-2 text-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                    <ExternalLink size={18} />
                </a>
            )}
        </article>
    );
}