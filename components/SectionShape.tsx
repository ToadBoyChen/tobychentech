"use client";

export default function SectionShape() {
  return (
    <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
      <defs>
        <clipPath id="organic-curve" clipPathUnits="objectBoundingBox">
          <path d="M 0 0 Q 0.5 -0.05 1 0 L 1 0.95 Q 0.5 0.90 0 0.95 Z" />
        </clipPath>

        <clipPath id="organic-intro" clipPathUnits="objectBoundingBox">
          <path d="M 0 0 L 1 0 L 1 0.95 Q 0.5 0.90 0 0.95 Z" />
        </clipPath>

        <clipPath id="organic-footer" clipPathUnits="objectBoundingBox">
          <path d="M 0 0 Q 0.5 -0.05 1 0 L 1 1 L 0 1 Z" />
        </clipPath>

        
        <path id="fixed-convex" d="M 0 100 Q 50 0 100 100 L 100 100 L 0 100 Z" />
        <path id="fixed-concave" d="M 0 0 Q 50 100 100 0 L 100 0 L 0 0 Z" />

      </defs>
    </svg>
  );
}