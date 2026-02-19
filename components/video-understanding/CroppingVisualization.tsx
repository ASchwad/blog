"use client";

import { useState, useEffect } from "react";
import { useInView } from "../../hooks/useInView";

export function CroppingVisualization() {
  const { ref, isInView } = useInView({ threshold: 0.3 });
  const [animationKey, setAnimationKey] = useState(0);

  // Cycle duration: last animation delay (2.5s) + animation + pause
  const cycleDuration = 2500 + 800 + 6000; // animations + pause

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
        Isolate the region of interest to reduce context noise
      </p>

      <div key={animationKey}>
      <div className="flex items-center justify-center gap-6 sm:gap-10">
        {/* Original frame */}
        <div
          className="flex flex-col items-center gap-3"
          style={{
            animation: isInView ? "slideInLeft 0.8s ease-out both" : "none",
          }}
        >
          <div className="relative w-28 h-48 sm:w-36 sm:h-64 bg-secondary rounded-lg border border-border overflow-hidden">
            {/* Simulated full frame content */}
            <div className="absolute inset-0 flex flex-col">
              <div className="flex-1 bg-muted-foreground/10" />
              <div className="h-1/3 bg-muted-foreground/20 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-muted-foreground/30" />
              </div>
              <div className="flex-1 bg-muted-foreground/10" />
            </div>
            {/* Crop overlay hint */}
            <div
              className="absolute inset-x-2 top-1/3 bottom-1/3 border-2 border-dashed border-primary/50 rounded"
              style={{
                animation: isInView ? "fadeIn 0.8s ease-out 800ms both" : "none",
              }}
            />
          </div>
          <span className="text-xs text-muted-foreground font-medium">Original</span>
        </div>

        {/* Arrow */}
        <div
          className="text-2xl text-primary"
          style={{
            animation: isInView ? "scaleIn 0.8s ease-out 1200ms both" : "none",
          }}
        >
          &rarr;
        </div>

        {/* Cropped frame */}
        <div
          className="flex flex-col items-center gap-3"
          style={{
            animation: isInView ? "slideInRight 0.8s ease-out 1800ms both" : "none",
          }}
        >
          <div className="relative w-28 h-48 sm:w-36 sm:h-64 bg-secondary rounded-lg border-2 border-primary overflow-hidden shadow-lg shadow-primary/20">
            {/* Simulated cropped/zoomed content */}
            <div className="absolute inset-0 flex items-center justify-center bg-muted-foreground/20">
              <div className="w-16 h-16 rounded-full bg-muted-foreground/40 flex items-center justify-center">
                <span className="text-2xl">x4</span>
              </div>
            </div>
            {/* Zoom indicator */}
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] rounded-full font-medium">
              1.5x
            </div>
          </div>
          <span className="text-xs text-primary font-medium">Cropped (zoomed)</span>
        </div>
      </div>

      <div
        className="mt-6 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-center"
        style={{
          animation: isInView ? "fadeIn 0.8s ease-out 2500ms both" : "none",
        }}
      >
        <span className="text-sm text-green-600 dark:text-green-400">
          Less visual noise = better focus on the screws
        </span>
      </div>
      </div>
    </div>
  );
}
