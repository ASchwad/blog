"use client";

import { useState, useEffect } from "react";
import { useInView } from "../../hooks/useInView";

interface VideoLengthTimelineProps {
  totalSeconds?: number;
  targetSecond?: number;
  keepSeconds?: number;
}

export function VideoLengthTimeline({
  totalSeconds = 60,
  targetSecond = 12,
  keepSeconds = 30,
}: VideoLengthTimelineProps) {
  const { ref, isInView } = useInView({ threshold: 0.3 });
  const [animationKey, setAnimationKey] = useState(0);

  // Calculate total animation duration (60ms per frame for slower animation)
  const lastFrameDelay = (totalSeconds - 1) * 60;
  const turnRedComplete = lastFrameDelay + 1500 + 500;
  const cycleDuration = turnRedComplete + 6000; // Add pause before restart

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setAnimationKey((k) => k + 1);
    }, cycleDuration);

    return () => clearInterval(interval);
  }, [isInView, cycleDuration]);

  return (
    <div ref={ref} className="my-8">
      <p className="text-muted-foreground mb-6">
        Reduce the &quot;needle in a haystack&quot; problem by trimming to relevant sections
      </p>

      <div className="space-y-4">
        {/* Timeline label */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Full Video Timeline</span>
          <span className="text-xs">(each square = 1 second)</span>
        </div>

        {/* Timeline grid */}
        <div className="flex flex-wrap gap-1 max-w-xl mx-auto justify-center">
          {Array.from({ length: totalSeconds }).map((_, i) => {
            const isTarget = i === targetSecond;
            const isRemovable = i >= keepSeconds;
            const baseDelay = i * 60;

            return (
              <div
                key={`${animationKey}-${i}`}
                className={`
                  w-6 h-6 rounded flex items-center justify-center text-[10px] font-medium
                  transition-all duration-300
                  ${isTarget
                    ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-1 ring-offset-background"
                    : isRemovable
                      ? "bg-red-500/80 text-white"
                      : "bg-green-500/80 text-white"
                  }
                  ${isInView ? "opacity-100 scale-100" : "opacity-0 scale-0"}
                `}
                style={{
                  animation: isInView
                    ? isRemovable
                      ? `frameAppear 0.3s ease-out ${baseDelay}ms both, turnRed 0.5s ease-out ${baseDelay + 1500}ms both`
                      : `frameAppear 0.3s ease-out ${baseDelay}ms both`
                    : "none",
                }}
              >
                {isTarget ? "!" : isRemovable ? "x" : ""}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-primary" />
            <span className="text-muted-foreground">Target frame</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-red-500/80" />
            <span className="text-muted-foreground">Removed (irrelevant)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-green-500/80" />
            <span className="text-muted-foreground">Kept</span>
          </div>
        </div>

        {/* Result message */}
        <div
          className={`mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-center transition-opacity duration-500 ${isInView ? "opacity-100" : "opacity-0"}`}
          style={{
            transitionDelay: isInView ? "3s" : "0s",
          }}
        >
          <span className="text-sm text-green-600 dark:text-green-400">
            Easier for the LLM to find the target in 30s vs 60s of video
          </span>
        </div>
      </div>
    </div>
  );
}
