"use client";

import { useState } from "react";
import Image from "next/image";
import blurData from "../lib/blur-data.json";

interface ImageTriptychProps {
  images: {
    src: string;
    alt: string;
  }[];
}

export function ImageTriptych({ images }: ImageTriptychProps) {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const getBlurDataURL = (src: string) =>
    (blurData as Record<string, string>)[src];

  return (
    <>
      <div className="bento-grid">
        {images.map((image, index) => {
          const blurDataURL = getBlurDataURL(image.src);
          return (
            <div
              key={index}
              className={`bento-item bento-item-${index}`}
              onClick={() => setExpandedImage(image.src)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="bento-image"
                placeholder={blurDataURL ? "blur" : "empty"}
                blurDataURL={blurDataURL}
                unoptimized
              />
            </div>
          );
        })}
      </div>

      {expandedImage && (
        <div
          className="lightbox-overlay"
          onClick={() => setExpandedImage(null)}
        >
          <img
            src={expandedImage}
            alt="Expanded view"
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
