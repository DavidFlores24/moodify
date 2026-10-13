"use client";

import type { TimeRange } from "@/types/enums/timeRange";
import { TIMEFRAMES } from "@/types/TimeFrame";

type Props = {
    value: TimeRange;
    onChange: (range: TimeRange) => void;
};

export function TimeframeSelector({
                                      value,
                                      onChange,
                                  }: Props) {
    return (
        <fieldset className="space-y-3">
            <legend className="text-lg font-semibold">
                Listening period
            </legend>

            <div className="flex flex-wrap gap-2">
                {TIMEFRAMES.map((range) => {
                    const selected = value === range.value;

                    return (
                        <button
                            key={range.value}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => onChange(range.value)}
                            className={`rounded-xl border px-4 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                                selected
                                    ? "border-primary bg-primary/10 text-foreground"
                                    : "border-border bg-surface text-muted hover:bg-surface-hover"
                            }`}
                        >
                            {range.label}
                        </button>
                    );
                })}
            </div>
        </fieldset>
    );
}