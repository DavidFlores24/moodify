"use client";

import type { MoodName } from "@/types/enums/moodName";
import { MOODS } from "@/types/Mood";
import {
    Sun,
    CloudRain,
    Zap,
    Leaf,
    Target,
} from "lucide-react";

const moodIcons = {
    happy: Sun,
    melancholic: CloudRain,
    energetic: Zap,
    relaxed: Leaf,
    focused: Target,
};

const moodColors: Record<MoodName, string> = {
    happy: "text-amber-400",
    melancholic: "text-indigo-400",
    energetic: "text-purple-400",
    relaxed: "text-emerald-400",
    focused: "text-sky-400",
};

type MoodSelectorProps = {
    value: MoodName;
    onChange: (mood: MoodName) => void;
};

export function MoodSelector({
                                 value,
                                 onChange,
                             }: MoodSelectorProps) {
    return (
        <fieldset className="space-y-4">
            <legend className="text-lg font-semibold">
                How are you feeling?
            </legend>

            <p className="text-sm text-muted">
                Choose a mood to explore your music.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {MOODS.map((mood) => {
                    const Icon = moodIcons[mood.value];
                    const selected = value === mood.value;

                    return (
                        <button
                            key={mood.value}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => onChange(mood.value)}
                            className={`flex min-h-36 flex-col items-center gap-3 rounded-2xl border p-4 text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                                selected
                                    ? "border-primary bg-primary/10"
                                    : "border-border bg-surface hover:bg-surface-hover"
                            }`}
                        >
                            <Icon
                                aria-hidden="true"
                                className={`h-7 w-7 ${moodColors[mood.value]}`}
                            />

                            <span className="font-medium">
                {mood.label}
              </span>

                            <span className="text-xs leading-relaxed text-muted">
                {mood.description}
              </span>
                        </button>
                    );
                })}
            </div>
        </fieldset>
    );
}