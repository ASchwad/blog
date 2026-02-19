"use client";

import { useState, useEffect } from "react";
import { useInView } from "../../hooks/useInView";

interface SpeedOption {
  label: string;
  frames: number;
  color: string;
}

const speeds: SpeedOption[] = [
  { label: "1x Speed", frames: 30, color: "bg-muted-foreground/30" },
  { label: "0.2x Speed", frames: 150, color: "bg-primary/60" },
  { label: "0.1x Speed", frames: 300, color: "bg-primary" },
];

export function PlaybackSpeedComparison() {
  const { ref, isInView } = useInView({ threshold: 0.3 });
  const maxFrames = 300;
  const [animationKey, setAnimationKey] = useState(0);

  // Calculate total animation duration (400ms per item for slower animation)
  const lastItemDelay = (speeds.length - 1) * 400;
  const cycleDuration = lastItemDelay + 500 + 1200 + 6000; // delay + barGrow delay + barGrow + pause

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
        Slow down video = more frames per second for the AI to analyze
      </p>

      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center sm:items-end">
        {speeds.map((speed, index) => {
          const barWidth = (speed.frames / maxFrames) * 100;
          const delay = index * 400;

          return (
            <div
              key={`${animationKey}-${speed.label}`}
              className={`flex flex-col items-center gap-3 ${isInView ? "opacity-100" : "opacity-0"}`}
              style={{
                animation: isInView ? `slideInRight 0.6s ease-out ${delay}ms both` : "none",
              }}
            >
              {/* Video placeholder */}
              <div className="w-24 h-40 bg-secondary rounded-lg border border-border flex items-center justify-center">
                <div className="text-4xl opacity-50">
                  {index === 0 ? "1x" : index === 1 ? "0.2x" : "0.1x"}
                </div>
              </div>

              {/* Label */}
              <span className="text-sm font-medium">{speed.label}</span>

              {/* Progress bar */}
              <div className="w-24 h-2 bg-border rounded-full overflow-hidden">
                <div
                  className={`h-full ${speed.color} rounded-full`}
                  style={{
                    width: isInView ? `${barWidth}%` : "0%",
                    animation: isInView ? `barGrow 1.2s ease-out ${delay + 500}ms both` : "none",
                  }}
                />
              </div>

              {/* Frame count */}
              <span className="text-xs text-muted-foreground">
                {speed.frames} frames
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
        <span className="text-sm text-green-600 dark:text-green-400">
          0.1x speed = 10x more frames for the AI to catch details
        </span>
      </div>
    </div>
  );
}
