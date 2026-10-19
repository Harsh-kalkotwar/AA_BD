"use client";

import React from "react";
import Button from "@/components/Button";

/* ============================================================================
   EDITABLE LETTER CONTENT
   Edit this section to customize the letter date, greeting, paragraphs,
   sign-off, and signature.
   ============================================================================ */
const letterConfig = {
  // Date displayed in the top-right corner of the letter
  letterDate: "28th September 2026",

  // Greeting at the start of the letter
  letterGreeting: "Heyy Aarohii,",

  // Main letter paragraphs (each string will be rendered as a handwritten paragraph)
  letterParagraphs: [
    "Hey firstly I'm really sry for being this late....And IK u'll just laugh if I write a big para so instead I'll keep it short and sweet(doubtful). Happyyyy Birthdayy Dumberr!!,I hope u have(had) a crazyyy bday and u enjoyed a lot.I wish You stay the way you are!!Crazyyy,funny,Gorgeous,Optimistic,Cheerfull,The fun element on the table,Supportive,Understanding,Cuteee,Rude and the list goes on.... (except the BHEL part u should change that)and..Ig enough isse bada likhuga toh ya toh tu read hi nahi karegi ya sabko dikhayegi n hassegi ya royegi(possiblity=0) And finally Wish u a Happy day,month,year and whole life!!.",
  ],

  // Handwritten sign-off before your name
  letterSignOff: "Once again Happy B'day!!,",

  // Signature at the bottom of the letter
  letterSignature: "",
};

export default function LetterPage() {
  return (
    <div className="letter-viewport">
      {/* Top Navigation Bar with Shared Button returning to /gallery */}
      <header className="letter-header">
        <div className="back-wrapper">
          <Button
            label="Back to Gallery"
            link="/gallery"
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
      </header>

      {/* Main Letter Sheet Container */}
      <main className="letter-stage">
        <article className="paper-sheet" aria-label="Handwritten Birthday Letter">
          {/* Subtle vintage texture overlay */}
          <div className="paper-texture-overlay" aria-hidden="true" />

          {/* Letter Header: Date */}
          <div className="paper-header">
            <span className="letter-date">{letterConfig.letterDate}</span>
          </div>

          {/* Greeting */}
          <h1 className="letter-greeting">{letterConfig.letterGreeting}</h1>

          {/* Body Paragraphs */}
          <div className="letter-body">
            {letterConfig.letterParagraphs.map((paragraph, index) => (
              <p key={index} className="letter-paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Botanical Pressed Flower Accent */}
          <div className="botanical-accent" aria-hidden="true">
            <svg width="42" height="42" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M50 15 C45 35, 25 45, 50 85 C75 45, 55 35, 50 15 Z"
                stroke="#A47B65"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="rgba(164, 123, 101, 0.12)"
              />
              <path
                d="M50 35 Q40 50 32 60"
                stroke="#A47B65"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M50 45 Q60 55 68 62"
                stroke="#A47B65"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Sign-off & Signature */}
          <footer className="letter-footer">
            <p className="letter-signoff">{letterConfig.letterSignOff}</p>
            <p className="letter-signature">{letterConfig.letterSignature}</p>
          </footer>
        </article>

        {/* Forward Navigation to Page 4 — Final Surprise */}
        <div className="next-wrapper">
          <Button
            label="Click if u cried/laughed"
            link="/final"
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
              fontWeight: 500,
            }}
            padding="12px 28px"
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
      </main>

      <style jsx>{`
        .letter-viewport {
          min-height: 100vh;
          min-height: 100dvh;
          width: 100%;
          background-color: #171311;
          background-image: 
            radial-gradient(ellipse at 50% 20%, rgba(164, 123, 101, 0.16) 0%, rgba(23, 19, 17, 0.98) 75%),
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
          background-size: 100% 100%, 32px 32px, 32px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem 1rem 4rem;
          box-sizing: border-box;
          overflow-x: hidden;
        }

        .letter-header {
          width: 100%;
          max-width: 820px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 0.5rem 0 1.5rem;
          z-index: 20;
        }

        .back-wrapper {
          display: inline-flex;
        }

        .letter-stage {
          width: 100%;
          max-width: 760px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .next-wrapper {
          display: flex;
          justify-content: center;
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
          z-index: 20;
          position: relative;
        }

        /* Real Aged Ivory Parchment Paper */
        .paper-sheet {
          position: relative;
          width: 100%;
          max-width: 680px;
          background: #FAF1DF;
          background-image: 
            radial-gradient(circle at 12% 18%, rgba(244, 232, 210, 0.8) 0%, transparent 60%),
            radial-gradient(circle at 88% 82%, rgba(217, 197, 163, 0.35) 0%, transparent 65%),
            linear-gradient(178deg, #FAF1DF 0%, #F4E8D2 55%, #EFE1C5 100%);
          border: 1px solid rgba(217, 197, 163, 0.7);
          border-radius: 4px 6px 3px 5px;
          box-shadow:
            0 1px 3px rgba(0, 0, 0, 0.08),
            0 14px 40px -8px rgba(18, 12, 9, 0.5),
            0 30px 70px -15px rgba(0, 0, 0, 0.7);
          padding: 3.75rem 3.5rem 4.25rem;
          color: #4A3528;
          font-family: 'Caveat', 'Marck Script', cursive;
          box-sizing: border-box;
          overflow: hidden;
        }

        /* Imperfect natural paper edge & subtle texture */
        .paper-texture-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 27px,
            rgba(164, 123, 101, 0.04) 28px
          );
          opacity: 0.85;
          mix-blend-mode: multiply;
        }

        .paper-header {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 2rem;
        }

        .letter-date {
          font-size: 1.55rem;
          color: #60473A;
          letter-spacing: 0.04em;
          transform: rotate(-1.2deg);
          display: inline-block;
          border-bottom: 1px dashed rgba(164, 123, 101, 0.4);
          padding-bottom: 2px;
        }

        .letter-greeting {
          font-size: 2.2rem;
          font-weight: 600;
          color: #3D291F;
          margin: 0 0 1.75rem;
          letter-spacing: 0.02em;
          line-height: 1.3;
          text-shadow: 0 0 1px rgba(61, 41, 31, 0.2);
        }

        .letter-body {
          display: flex;
          flex-direction: column;
          gap: 1.45rem;
        }

        .letter-paragraph {
          font-size: 1.62rem;
          line-height: 1.85;
          color: #4A3528;
          margin: 0;
          text-indent: 1.5rem;
          letter-spacing: 0.015em;
          text-shadow: 0 0 1px rgba(74, 53, 40, 0.18);
        }

        .botanical-accent {
          display: flex;
          justify-content: center;
          margin: 2.2rem 0 1rem;
          opacity: 0.75;
        }

        .letter-footer {
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-align: right;
        }

        .letter-signoff {
          font-size: 1.75rem;
          color: #553D30;
          margin: 0 0 0.35rem;
          letter-spacing: 0.02em;
        }

        .letter-signature {
          font-size: 2.1rem;
          font-weight: 700;
          color: #3D291F;
          margin: 0;
          letter-spacing: 0.03em;
          transform: rotate(-1.5deg);
          text-shadow: 0 0 1px rgba(61, 41, 31, 0.25);
        }

        @media (max-width: 768px) {
          .letter-viewport {
            padding: 1rem 0.75rem 3rem;
          }

          .paper-sheet {
            padding: 2.5rem 1.6rem 3rem;
            border-radius: 3px;
          }

          .letter-date {
            font-size: 1.35rem;
          }

          .letter-greeting {
            font-size: 1.85rem;
            margin-bottom: 1.25rem;
          }

          .letter-paragraph {
            font-size: 1.42rem;
            line-height: 1.75;
            text-indent: 1rem;
          }

          .letter-signoff {
            font-size: 1.55rem;
          }

          .letter-signature {
            font-size: 1.85rem;
          }
        }
      `}</style>
    </div>
  );
}
