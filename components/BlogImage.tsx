"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface BlogImageProps {
  src: string;
  alt: string;
}

export function BlogImage({ src, alt }: BlogImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.src = src;
  }, [src]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Calculate smart dimensions based on aspect ratio
  const getImageStyle = () => {
    if (!dimensions) return {};

    const aspectRatio = dimensions.width / dimensions.height;

    // For tall/portrait images (aspect ratio < 0.8), constrain the height
    if (aspectRatio < 0.8) {
      return {
        maxHeight: "400px",
        width: "auto",
        maxWidth: "100%",
      };
    }

    // For square-ish images (0.8 <= aspect ratio <= 1.2)
    if (aspectRatio <= 1.2) {
      return {
        maxHeight: "450px",
        width: "auto",
        maxWidth: "100%",
      };
    }

    // For wide/landscape images, use full width
    return {
      width: "100%",
      height: "auto",
    };
  };

  return (
    <>
      <span className="blog-image-wrapper" onClick={() => setIsOpen(true)}>
        <Image
          src={src}
          alt={alt}
          width={dimensions?.width || 800}
          height={dimensions?.height || 450}
          className="blog-image"
          style={getImageStyle()}
          unoptimized
        />
      </span>

      {isOpen && (
        <div className="lightbox-overlay" onClick={() => setIsOpen(false)}>
          <button
            className="lightbox-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              width={dimensions?.width || 800}
              height={dimensions?.height || 450}
              className="lightbox-image"
              unoptimized
            />
          </div>
        </div>
      )}
    </>
  );
}
