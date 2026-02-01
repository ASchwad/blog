"use client";

import React from "react";

interface CodeTabsProps {
  tabs: string[];
  children: React.ReactNode;
}

export function CodeTabs({ tabs, children }: CodeTabsProps) {
  const [activeTab, setActiveTab] = React.useState(0);
  const childArray = React.Children.toArray(children);

  return (
    <div className="my-4 overflow-hidden rounded-lg border border-border">
      {/* Editor-style tab bar */}
      <div className="flex bg-[#1e1e1e] border-b border-[#333]">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-sm font-mono transition-colors ${
              activeTab === index
                ? "bg-[#2d2d2d] text-white border-t-2 border-t-[#007acc]"
                : "text-[#969696] hover:bg-[#2a2a2a] hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Code content - remove default margins from pre/code/figure */}
      <div className="[&_pre]:m-0! [&_pre]:rounded-none! [&_pre]:border-0! [&_figure]:m-0! [&_figure]:p-0!">
        {childArray[activeTab]}
      </div>
    </div>
  );
}
