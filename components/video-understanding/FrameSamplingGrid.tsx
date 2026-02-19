"use client";

import { useState, useEffect } from "react";
import { useInView } from "../../hooks/useInView";

interface FrameSamplingGridProps {
  totalFrames?: number;
  highlightFrame?: number;
}

export function FrameSamplingGrid({
  totalFrames = 30,
  highlightFrame = 12,
}: FrameSamplingGridProps) {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [animationKey, setAnimationKey] = useState(0);

  // Calculate total animation duration (100ms per frame for slower animation)
  const lastFrameDelay = (totalFrames - 1) * 100;
  const cycleDuration = lastFrameDelay + 500 + 6000; // delay + animation + pause

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setAnimationKey((k) => k + 1);
    }, cycleDuration);

    return () => clearInterval(interval);
  }, [isInView, cycleDuration]);

  return (
    <div ref={ref} className="my-8">
      <div className="text-center mb-4">
        <p className="text-sm text-muted-foreground">
          30 seconds of video = <span className="font-semibold text-foreground">30 frames</span> sampled (1 FPS)
        </p>
      </div>

      <div className="bg-secondary/50 rounded-xl p-4 border border-border">
        <div className="grid grid-cols-10 gap-1.5">
          {Array.from({ length: totalFrames }).map((_, i) => {
            const isHighlight = i === highlightFrame;
            const delay = i * 100; // 100ms stagger for slower animation

            return (
              <div
                key={`${animationKey}-${i}`}
                className={`
                  aspect-[9/16] rounded-md flex items-end justify-center pb-1
                  ${isHighlight
                    ? "bg-primary ring-2 ring-primary ring-offset-2 ring-offset-background"
                    : "bg-muted-foreground/20"
                  }
                  ${isInView ? "opacity-100" : "opacity-0"}
                `}
                style={{
                  animation: isInView ? `frameAppear 0.5s ease-out ${delay}ms both` : "none",
                }}
              >
                <span className={`text-[10px] font-mono ${isHighlight ? "text-primary-foreground" : "text-muted-foreground"}`}>
                  {i + 1}s
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center gap-6 mt-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-muted-foreground/20" />
          <span className="text-muted-foreground">Sampled frame</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-primary" />
          <span className="text-muted-foreground">Target frame (screw counting)</span>
        </div>
      </div>
    </div>
  );
}
