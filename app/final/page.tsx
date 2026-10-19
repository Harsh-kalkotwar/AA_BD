"use client";

import React from "react";
import ImageMotionTrail from "@/components/ImageMotionTrail";
import Button from "@/components/Button";

/* ============================================================================
   EDITABLE FINAL PAGE CONTENT
   Edit this section to customize the final heading, subtitle, photo,
   and back button label.
   ============================================================================ */
const finalConfig = {
  // Main heading displayed at the top of the page
  finalHeading: "One Last Surprise",

  // Supporting subtitle shown below the heading
  finalSubtitle: "A little moment, just for you.",

  // Label for the button returning to the letter
  backButtonText: "Back to Letter",

  // The hero photo displayed in the Image Motion Trail
  // Easily swap this with any photo from public/images/ or public/image/
  photo: "/image/IMG_4313.jpeg",

  // Base card dimensions (increased for a more impactful, prominent display)
  cardWidth: 380,
  cardHeight: 500,
};

// Lightweight, randomized floating hearts & rose particles (staggered CSS animations)
const DECORATIONS = [
  { id: 1, type: "heart", left: "6%", size: 18, duration: 13, delay: 0, drift: 24, rot: 15 },
  { id: 2, type: "rose", left: "14%", size: 22, duration: 16, delay: 3, drift: -20, rot: -25 },
  { id: 3, type: "heart", left: "22%", size: 14, duration: 14, delay: 6, drift: 18, rot: 20 },
  { id: 4, type: "rose", left: "28%", size: 24, duration: 18, delay: 1.5, drift: -15, rot: 30 },
  { id: 5, type: "heart", left: "37%", size: 16, duration: 15, delay: 7.5, drift: 25, rot: -10 },
  { id: 6, type: "heart", left: "63%", size: 20, duration: 17, delay: 2, drift: -22, rot: 25 },
  { id: 7, type: "rose", left: "71%", size: 23, duration: 19, delay: 8, drift: 18, rot: -30 },
  { id: 8, type: "heart", left: "79%", size: 15, duration: 14, delay: 4, drift: -18, rot: 15 },
  { id: 9, type: "rose", left: "86%", size: 25, duration: 16, delay: 10, drift: 20, rot: -15 },
  { id: 10, type: "heart", left: "93%", size: 17, duration: 13, delay: 5.5, drift: -25, rot: 35 },
  { id: 11, type: "rose", left: "10%", size: 20, duration: 20, delay: 11, drift: 15, rot: 40 },
  { id: 12, type: "heart", left: "32%", size: 13, duration: 15, delay: 9, drift: -20, rot: -20 },
  { id: 13, type: "rose", left: "67%", size: 21, duration: 17, delay: 12.5, drift: 22, rot: 20 },
  { id: 14, type: "heart", left: "82%", size: 19, duration: 14, delay: 8.5, drift: -15, rot: -35 },
];

export default function FinalSurprisePage() {
  // Dynamically responsive card dimensions based on screen size
  const [cardSize, setCardSize] = React.useState({
    width: finalConfig.cardWidth,
    height: finalConfig.cardHeight,
  });

  React.useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (w < 480) {
        // Mobile screens
        const width = Math.min(Math.round(w * 0.84), 310);
        setCardSize({ width, height: Math.round(width * 1.32) });
      } else if (w < 768) {
        // Tablet / small screens
        setCardSize({ width: 330, height: 435 });
      } else if (h < 750) {
        // Shorter desktop viewports
        setCardSize({ width: 340, height: 450 });
      } else {
        // Desktop / large screens
        setCardSize({ width: finalConfig.cardWidth, height: finalConfig.cardHeight });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  // Normalize photo path whether entered with or without "public/" prefix
  const resolveImageSrc = (path: string): string => {
    if (!path) return "";
    let clean = path.trim();
    if (clean.startsWith("public/")) {
      clean = "/" + clean.slice("public/".length);
    } else if (clean.startsWith("./public/")) {
      clean = "/" + clean.slice("./public/".length);
    } else if (clean.startsWith("/public/")) {
      clean = "/" + clean.slice("/public/".length);
    } else if (!clean.startsWith("/") && !clean.startsWith("http")) {
      clean = "/" + clean;
    }
    return clean;
  };

  return (
    <div className="final-container">
      {/* Layer 1: Atmospheric Background Gradient */}
      <div className="ambient-background" aria-hidden="true" />

      {/* Layer 2: Floating Hearts & Roses (STRICTLY BEHIND PHOTO, z-index: 5, pointer-events: none) */}
      <div className="floating-decorations-layer" aria-hidden="true">
        {DECORATIONS.map((item) => (
          <div
            key={item.id}
            className="floating-item"
            style={
              {
                left: item.left,
                animationDuration: `${item.duration}s`,
                animationDelay: `${item.delay}s`,
                "--drift-x": `${item.drift}px`,
                "--rot": `${item.rot}deg`,
              } as React.CSSProperties
            }
          >
            {item.type === "heart" ? (
              <svg
                width={item.size}
                height={item.size}
                viewBox="0 0 24 24"
                fill="currentColor"
                className="deco-heart"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg
                width={item.size}
                height={item.size}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="deco-rose"
              >
                <path d="M12 4C9 4 7 6 7 9C7 11.5 8.5 13.5 10.5 14.5L10 20M14 20L13.5 14.5C15.5 13.5 17 11.5 17 9C17 6 15 4 12 4Z" />
                <path d="M10 11C11 11.5 13 11.5 14 11" />
                <path d="M10 17C8.5 16 7 17 6 18M14 17C15.5 16 17 17 18 18" />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Layer 3: Top Navigation Bar & Title (z-index: 30) */}
      <header className="final-header">
        <div className="back-wrapper">
          <Button
            label={finalConfig.backButtonText}
            link="/letter"
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
              boxShadow: "0 4px 18px rgba(0, 0, 0, 0.45)",
            }}
          />
        </div>

        <div className="title-block">
          <h1 className="final-title">{finalConfig.finalHeading}</h1>
          <p className="final-subtitle">{finalConfig.finalSubtitle}</p>
        </div>

        {/* Balance spacer */}
        <div className="header-spacer" aria-hidden="true" />
      </header>

      {/* Layer 4: Image Motion Trail Stage (z-index: 10, cursor-following & return-to-center) */}
      <main className="trail-stage" aria-label="Interactive Birthday Photo Reveal">
        <div className="trail-wrapper">
          <ImageMotionTrail
            image={resolveImageSrc(finalConfig.photo)}
            background="transparent"
            copies={23}
            itemWidth={cardSize.width}
            itemHeight={cardSize.height}
            rounded={24}
            perspective={60}
            fade={26}
            hoverOut="reset"
            motion={{
              shiftX: 230,
              shiftY: 85,
              tiltX: 8,
              tiltY: 14,
              twist: 5,
            }}
            style={{
              minWidth: 0,
              minHeight: 0,
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </main>

      {/* Floating Interaction Hint at Bottom */}
      <footer className="final-footer">
        <div className="trail-hint">
          <span className="hint-glow" aria-hidden="true" />
          <span>Move your cursor to trace the memory</span>
        </div>
      </footer>

      <style jsx>{`
        .final-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          overflow: hidden;
          background-color: #0A0D14;
          display: flex;
          flex-direction: column;
        }

        /* Ambient Cosmic Background */
        .ambient-background {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: 
            radial-gradient(circle at 50% 45%, rgba(94, 42, 140, 0.22) 0%, rgba(44, 62, 80, 0.25) 45%, rgba(10, 13, 20, 0.95) 100%),
            linear-gradient(180deg, rgba(10, 13, 20, 0.8) 0%, rgba(10, 13, 20, 0.4) 50%, rgba(10, 13, 20, 0.95) 100%);
        }

        /* Floating Decorations Layer (z-index: 5 — strictly behind photo layer) */
        .floating-decorations-layer {
          position: absolute;
          inset: 0;
          z-index: 5;
          pointer-events: none;
          overflow: hidden;
        }

        .floating-item {
          position: absolute;
          bottom: -40px;
          pointer-events: none;
          animation: floatUp linear infinite;
          will-change: transform, opacity;
        }

        .deco-heart {
          color: rgba(212, 165, 184, 0.45);
          filter: drop-shadow(0 0 6px rgba(212, 165, 184, 0.35));
        }

        .deco-rose {
          color: rgba(164, 123, 101, 0.5);
          filter: drop-shadow(0 0 6px rgba(164, 123, 101, 0.35));
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg) scale(0.75);
            opacity: 0;
          }
          15% {
            opacity: 0.65;
          }
          75% {
            opacity: 0.45;
          }
          100% {
            transform: translateY(-110vh) translateX(var(--drift-x, 20px)) rotate(var(--rot, 25deg)) scale(1.08);
            opacity: 0;
          }
        }

        /* Header Navigation */
        .final-header {
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
            rgba(10, 13, 20, 0.94) 0%,
            rgba(10, 13, 20, 0.6) 65%,
            rgba(10, 13, 20, 0) 100%
          );
          pointer-events: none;
        }

        .back-wrapper {
          display: inline-flex;
          align-items: center;
          pointer-events: auto;
          z-index: 35;
        }

        .title-block {
          text-align: center;
          pointer-events: auto;
        }

        .final-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          margin: 0;
          color: #E9E7F2;
          text-shadow: 0 2px 16px rgba(94, 42, 140, 0.65);
        }

        .final-subtitle {
          font-size: 0.88rem;
          color: rgba(233, 231, 242, 0.76);
          margin-top: 0.25rem;
          font-weight: 300;
          letter-spacing: 0.04em;
        }

        .header-spacer {
          width: 140px;
          display: none;
        }

        @media (min-width: 769px) {
          .header-spacer {
            display: block;
          }
        }

        /* Image Motion Trail Stage (z-index: 10) */
        .trail-stage {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 10;
        }

        .trail-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        /* Footer Interaction Hint */
        .final-footer {
          position: absolute;
          bottom: 1.4rem;
          left: 0;
          right: 0;
          z-index: 25;
          display: flex;
          justify-content: center;
          pointer-events: none;
        }

        .trail-hint {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.55rem 1.3rem;
          border-radius: 9999px;
          font-size: 0.82rem;
          color: rgba(233, 231, 242, 0.82);
          background: rgba(44, 62, 80, 0.52);
          border: 1px solid rgba(233, 231, 242, 0.16);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
          pointer-events: auto;
          user-select: none;
        }

        .hint-glow {
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
          .final-header {
            padding: 1rem;
            align-items: flex-start;
          }

          .final-title {
            font-size: 1.25rem;
          }

          .final-subtitle {
            font-size: 0.75rem;
          }

          .trail-hint {
            font-size: 0.75rem;
            padding: 0.45rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}
