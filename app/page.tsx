"use client";

import React from "react";
import ButterflyDrift from "@/components/ButterflyDrift";
import SparkleButton from "@/components/SparkleButton";
import Button from "@/components/Button";

/* ============================================================================
   EDITABLE INTRO CONTENT
   Edit this section to change the text and button labels on Page 1.
   ============================================================================ */
const introConfig = {
  // Pill badge at the top
  topBadge: "A LITTLE SOMETHING JUST FOR YOU",

  // Subtitle below the Happy Birthday greeting
  subtitle:
    "Belated Happy birthday,ik ik its late but ig better late than never!\nReally sorry for the delay!!",

  // Label for the navigation button to Page 2
  buttonLabel: "Click here Dumber",
};

export default function IntroPage() {
  return (
    <main className="intro-container">
      {/* Background: Butterfly Drift WebGL simulation */}
      <div className="background-layer" aria-hidden="true">
        <ButterflyDrift
          style={{
            minWidth: 0,
            minHeight: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      {/* Atmospheric gradient overlay for contrast and palette integration */}
      <div className="atmosphere-overlay" aria-hidden="true" />

      {/* Foreground Content */}
      <div className="content-layer">
        <header className="intro-header">
          <span className="badge-pill">{introConfig.topBadge}</span>
        </header>

        {/* Central Birthday Greeting */}
        <section className="greeting-wrapper">
          <div className="sparkle-scaler">
            <SparkleButton />
          </div>
          <p className="subtext">{introConfig.subtitle}</p>
        </section>

        {/* Navigation Control to Page 2 using Starfield Button */}
        <footer className="intro-footer">
          <div className="button-wrapper" style={{ pointerEvents: "auto" }}>
            <Button
              label={introConfig.buttonLabel}
              link="/gallery"
              addIcon={true}
              icon={{
                side: "right",
                icon: "arrow",
                symbol: "→",
                size: 20,
                color: "#E9E7F2",
              }}
              font={{
                fontFamily: "Inter, sans-serif",
                fontSize: "17px",
                fontWeight: 600,
                letterSpacing: "0.03em",
              }}
              padding="16px 36px"
              rounded={100}
              colors={{
                fill: "#2C3E50",
                textColor: "#E9E7F2",
              }}
              glow={{
                color: "#5E2A8C",
                size: 20,
                opacity: 100,
              }}
              stroke={{
                color: "#5E2A8C",
                count: 1,
                size: 80,
                thickness: 2,
                speed: 50,
                direction: "ccw",
              }}
              pixel={{
                color: "#E9E7F2",
                size: 4,
                density: 45,
                brightness: 100,
              }}
              style={{
                pointerEvents: "auto",
                boxShadow: "0 8px 32px rgba(94, 42, 140, 0.45)",
              }}
            />
          </div>
        </footer>
      </div>

      <style jsx>{`
        .intro-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          overflow: hidden;
          background-color: #090A10;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .background-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
        }

        .atmosphere-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(44, 62, 80, 0.25) 0%,
            rgba(94, 42, 140, 0.15) 45%,
            rgba(9, 10, 16, 0.65) 100%
          );
        }

        .content-layer {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1200px;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 2.5rem 1.5rem;
          pointer-events: none;
        }

        .intro-header {
          display: flex;
          justify-content: center;
          width: 100%;
          pointer-events: auto;
        }

        .badge-pill {
          display: inline-flex;
          align-items: center;
          padding: 0.45rem 1.2rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #E9E7F2;
          background: rgba(44, 62, 80, 0.55);
          border: 1px solid rgba(233, 231, 242, 0.22);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .greeting-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 100%;
          margin: auto 0;
          text-align: center;
          pointer-events: auto;
        }

        .sparkle-scaler {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 100%;
          transform: scale(min(1, calc(90vw / 680)));
          transform-origin: center center;
          filter: drop-shadow(0 10px 30px rgba(94, 42, 140, 0.35));
        }

        .subtext {
          margin-top: 1.5rem;
          max-width: 620px;
          font-size: 1.05rem;
          line-height: 1.6;
          color: rgba(233, 231, 242, 0.88);
          font-weight: 300;
          letter-spacing: 0.02em;
          white-space: pre-line;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
        }

        .intro-footer {
          display: flex;
          justify-content: center;
          width: 100%;
          pointer-events: auto;
          margin-bottom: 0.5rem;
        }

        .button-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .content-layer {
            padding: 1.75rem 1rem;
          }

          .badge-pill {
            font-size: 0.72rem;
            padding: 0.35rem 0.9rem;
            letter-spacing: 0.1em;
          }

          .subtext {
            font-size: 0.92rem;
            max-width: 90%;
            margin-top: 1rem;
          }
        }
      `}</style>
    </main>
  );
}
