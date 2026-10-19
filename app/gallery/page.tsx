"use client";

import React from "react";
import SphereGallery3D, { GalleryItem } from "@/components/SphereGallery3D";
import Button from "@/components/Button";

/* ============================================================================
   EDITABLE GALLERY CONTENT
   Edit this section to customize headings, labels, instructions, and photos.
   ============================================================================ */
const galleryConfig = {
  // Main heading displayed at the top of the gallery
  galleryTitle: "A Little Too Pretty",

  // Supporting subtitle beneath the main heading
  gallerySubtitle: "Don't let these pictures fool you, you're still annoying.",

  // Text label for the Back navigation button
  backButtonText: "Back",

  // Counter badge text in the top right
  memoryCountText: "12 Memories",

  // Interaction instructions displayed at the bottom of the page
  galleryHintText: "Click & drag to rotate the sphere • Hover cards to inspect",

  // 12 photos loaded from public/images/ into the 3D Sphere Gallery.
  // Add, swap, or reorder images and optional links here:
  images: [
    { image: "/images/IMG_2710.jpeg", link: "" },
    { image: "/images/IMG_2877.jpeg", link: "" },
    { image: "/images/IMG_2916.jpeg", link: "" },
    { image: "/images/IMG_3275.jpeg", link: "" },
    { image: "/images/IMG_3868.jpeg", link: "" },
    { image: "/images/FullSizeRender%202.jpeg", link: "" },
    { image: "/images/Images/CF230A27-07F5-413C-B762-C8F2E337D816.jpeg", link: "" },
    { image: "/images/7ad6058e-7d1c-471e-a53b-7f750ce3ac19.jpeg", link: "" },
    { image: "/images/a6ed65d5-4fb2-4e53-a058-e9c4817b463b.jpeg", link: "" },
    { image: "/images/CF230A27-07F5-413C-B762-C8F2E337D816.jpeg", link: "" },
    { image: "/images/FullSizeRender.jpeg", link: "" },
    { image: "/image/IMG_4313.jpeg", link: "" },
  ] as GalleryItem[],
};

export default function GalleryPage() {
  return (
    <main className="gallery-container">
      {/* Top Navigation Bar & Title */}
      <header className="gallery-header">
        <div className="back-control-wrapper">
          <Button
            label={galleryConfig.backButtonText}
            link="/"
            addIcon={true}
            icon={{
              side: "left",
              icon: "arrow",
              symbol: "←",
              size: 16,
              color: "#E9E7F2",
            }}
            font={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: 500,
            }}
            padding="10px 22px"
            rounded={100}
            colors={{
              fill: "#2C3E50",
              textColor: "#E9E7F2",
            }}
            glow={{
              color: "#5E2A8C",
              size: 14,
              opacity: 100,
            }}
            stroke={{
              color: "#5E2A8C",
              count: 1,
              size: 55,
              thickness: 2,
              speed: 40,
              direction: "cw",
            }}
            pixel={{
              color: "#E9E7F2",
              size: 3,
              density: 35,
              brightness: 100,
            }}
            style={{
              pointerEvents: "auto",
              boxShadow: "0 4px 18px rgba(0, 0, 0, 0.4)",
            }}
          />
        </div>

        <div className="title-block">
          <h1 className="gallery-title">{galleryConfig.galleryTitle}</h1>
          <p className="gallery-subtitle">{galleryConfig.gallerySubtitle}</p>
        </div>

        {/* Counter Pill */}
        <div className="counter-pill" aria-label={galleryConfig.memoryCountText}>
          <span>{galleryConfig.memoryCountText}</span>
        </div>
      </header>

      {/* 3D Sphere Gallery Section (Centrepiece) */}
      <section className="gallery-stage" aria-label="Interactive 3D Sphere Photo Gallery">
        <div className="sphere-wrapper">
          <SphereGallery3D
            images={galleryConfig.images}
            style={{
              minWidth: 0,
              minHeight: 0,
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </section>

      {/* Bottom Floating Interaction Hint & Enough..Next Navigation */}
      <footer className="gallery-footer">
        <div className="interaction-hint">
          <span className="hint-dot" aria-hidden="true" />
          <span>{galleryConfig.galleryHintText}</span>
        </div>

        <div className="next-control-wrapper">
          <Button
            label="Enough..Next"
            link="/letter"
            addIcon={true}
            icon={{
              side: "right",
              icon: "arrow",
              symbol: "→",
              size: 16,
              color: "#E9E7F2",
            }}
            font={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
            padding="10px 24px"
            rounded={100}
            colors={{
              fill: "#2C3E50",
              textColor: "#E9E7F2",
            }}
            glow={{
              color: "#5E2A8C",
              size: 16,
              opacity: 100,
            }}
            stroke={{
              color: "#5E2A8C",
              count: 1,
              size: 60,
              thickness: 2,
              speed: 40,
              direction: "ccw",
            }}
            pixel={{
              color: "#E9E7F2",
              size: 3,
              density: 35,
              brightness: 100,
            }}
            style={{
              pointerEvents: "auto",
              boxShadow: "0 4px 20px rgba(94, 42, 140, 0.45)",
            }}
          />
        </div>
      </footer>

      <style jsx>{`
        .gallery-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          overflow: hidden;
          background-color: #090A10;
          display: flex;
          flex-direction: column;
        }

        .gallery-header {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 30;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 2rem;
          background: linear-gradient(
            to bottom,
            rgba(9, 10, 16, 0.92) 0%,
            rgba(9, 10, 16, 0.6) 65%,
            rgba(9, 10, 16, 0) 100%
          );
          pointer-events: none;
        }

        .back-control-wrapper {
          display: inline-flex;
          align-items: center;
          pointer-events: auto;
          z-index: 40;
        }

        .title-block {
          text-align: center;
          pointer-events: auto;
        }

        .gallery-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          margin: 0;
          color: #E9E7F2;
          text-shadow: 0 2px 14px rgba(94, 42, 140, 0.6);
        }

        .gallery-subtitle {
          font-size: 0.85rem;
          color: rgba(233, 231, 242, 0.72);
          margin-top: 0.25rem;
          font-weight: 300;
          letter-spacing: 0.04em;
        }

        .counter-pill {
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #E9E7F2;
          background: rgba(94, 42, 140, 0.4);
          border: 1px solid rgba(233, 231, 242, 0.2);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          pointer-events: auto;
        }

        .gallery-stage {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 10;
        }

        .sphere-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .gallery-footer {
          position: absolute;
          bottom: 1.25rem;
          left: 0;
          right: 0;
          z-index: 30;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          pointer-events: none;
        }

        .next-control-wrapper {
          display: inline-flex;
          align-items: center;
          pointer-events: auto;
          z-index: 40;
        }

        .interaction-hint {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.55rem 1.25rem;
          border-radius: 9999px;
          font-size: 0.82rem;
          color: rgba(233, 231, 242, 0.8);
          background: rgba(44, 62, 80, 0.5);
          border: 1px solid rgba(233, 231, 242, 0.15);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          pointer-events: auto;
          user-select: none;
        }

        .hint-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #5E2A8C;
          box-shadow: 0 0 8px #E9E7F2;
          animation: pulse 2.2s infinite ease-in-out;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(0.85);
          }
          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        @media (max-width: 768px) {
          .gallery-header {
            padding: 1rem;
            align-items: flex-start;
          }

          .gallery-title {
            font-size: 1.25rem;
          }

          .gallery-subtitle {
            font-size: 0.75rem;
          }

          .counter-pill {
            display: none;
          }

          .interaction-hint {
            font-size: 0.75rem;
            padding: 0.45rem 1rem;
          }

          .gallery-footer {
            padding: 0 1rem 0.85rem;
            flex-direction: column-reverse;
            gap: 0.65rem;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>
    </main>
  );
}
