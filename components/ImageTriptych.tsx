"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageTriptychProps {
  images: {
    src: string;
    alt: string;
  }[];
}

export function ImageTriptych({ images }: ImageTriptychProps) {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  return (
    <>
      <div className="bento-grid">
        {images.map((image, index) => (
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
              unoptimized
            />
          </div>
        ))}
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
