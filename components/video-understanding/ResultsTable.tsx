"use client";

import { useInView } from "../../hooks/useInView";

interface ResultRow {
  speed: string;
  length: string;
  crop: string;
  result: boolean;
}

const results: ResultRow[] = [
  { speed: "1x", length: "Full", crop: "No", result: false },
  { speed: "1x", length: "Full", crop: "Yes", result: false },
  { speed: "1x", length: "30s", crop: "No", result: false },
  { speed: "1x", length: "30s", crop: "Yes", result: false },
  { speed: "0.2x", length: "Full", crop: "No", result: false },
  { speed: "0.2x", length: "Full", crop: "Yes", result: false },
  { speed: "0.2x", length: "30s", crop: "No", result: false },
  { speed: "0.2x", length: "30s", crop: "Yes", result: true },
  { speed: "0.1x", length: "Full", crop: "No", result: false },
  { speed: "0.1x", length: "Full", crop: "Yes", result: true },
  { speed: "0.1x", length: "30s", crop: "No", result: true },
  { speed: "0.1x", length: "30s", crop: "Yes", result: true },
];

export function ResultsTable() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <div ref={ref} className="my-8">
      <h4 className="text-lg font-semibold mb-4">Parameter Combinations Tested</h4>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr
              className={`bg-secondary transition-opacity duration-300 ${isInView ? "opacity-100" : "opacity-0"}`}
            >
              <th className="text-left p-3 font-medium text-muted-foreground">Speed</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Length</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Crop</th>
              <th className="text-center p-3 font-medium text-muted-foreground">Correct Count?</th>
            </tr>
          </thead>
          <tbody>
            {results.map((row, index) => {
              const isSuccess = row.result;
              const delay = index * 80;

              return (
                <tr
                  key={index}
                  className={`
                    border-b border-border transition-all duration-300
                    ${isSuccess ? "bg-green-500/10" : "bg-background"}
                    ${isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
                  `}
                  style={{
                    transitionDelay: isInView ? `${delay}ms` : "0ms",
                  }}
                >
                  <td className="p-3 font-medium">{row.speed}</td>
                  <td className="p-3">{row.length}</td>
                  <td className="p-3">{row.crop}</td>
                  <td className="p-3 text-center">
                    <span className={`text-lg ${isSuccess ? "text-green-500" : "text-red-500"}`}>
                      {isSuccess ? "✓" : "✗"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div
        className={`mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg transition-all duration-500 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        style={{ transitionDelay: "1.2s" }}
      >
        <p className="text-sm text-green-600 dark:text-green-400 font-medium">
          Key insight: Combining all three optimizations (slower playback + trimmed length + cropped focus)
          gave the AI the best chance to count screws correctly.
        </p>
      </div>
    </div>
  );
}
