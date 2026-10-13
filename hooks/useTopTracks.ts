"use client";

import { useEffect, useState } from "react";
import { TimeRange } from '@/types/enums/timeRange'
import type { Track } from "@/types/music";

type Result = {
    items: Track[];
};

export function useTopTracks(timeframe: TimeRange) {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        async function load() {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `/api/spotify/top-tracks?time_range=${timeframe}`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error("Could not load your tracks");
                }

                const data: Result = await response.json();
                setTracks(data.items ?? []);
            } catch (err) {
                if (controller.signal.aborted) return;

                setError(
                    err instanceof Error
                        ? err.message
                        : "Something went wrong"
                );
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        void load();

        return () => controller.abort();
    }, [timeframe]);

    return { tracks, loading, error };
}