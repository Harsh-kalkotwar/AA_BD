"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

// Audio tracks mapped to each of the four pages
const TRACK_MAP: Record<string, { src: string; title: string }> = {
  "/": {
    src: "/bgm/Pg1_Happy_birthday.m4a",
    title: "Happy Birthday",
  },
  "/gallery": {
    src: "/bgm/Pg2_Enchanted.m4a",
    title: "Enchanted",
  },
  "/letter": {
    src: "/bgm/Pg3_Lover.m4a",
    title: "Lover",
  },
  "/final": {
    src: "/bgm/Pg4_Puri%20tu.m4a",
    title: "Puri Tu",
  },
};

export default function BackgroundMusic() {
  const pathname = usePathname() || "/";

  // Audio element reference (single persistent element across all pages)
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Independent saved playback positions for each page route
  const trackPositions = useRef<Record<string, number>>({
    "/": 0,
    "/gallery": 0,
    "/letter": 0,
    "/final": 0,
  });

  // Track the active route currently playing
  const currentRouteRef = useRef<string>(pathname);

  // User preference state (if paused manually, keep paused across navigation)
  const [isUserPaused, setIsUserPaused] = useState<boolean>(false);
  const userPausedRef = useRef<boolean>(false);

  // Playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState<boolean>(false);

  // Normalize pathname to match TRACK_MAP keys (strip trailing slashes)
  const getNormalizedRoute = useCallback((path: string): string => {
    if (!path || path === "/") return "/";
    return path.endsWith("/") ? path.slice(0, -1) : path;
  }, []);

  const normalizedRoute = getNormalizedRoute(pathname);
  const currentTrack = TRACK_MAP[normalizedRoute] || TRACK_MAP["/"];
  const isGallery = normalizedRoute === "/gallery";

  // Safe playback attempt helper
  const attemptPlay = useCallback((audio: HTMLAudioElement) => {
    if (userPausedRef.current) return;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setAutoplayBlocked(false);
        })
        .catch((err) => {
          if (err.name === "NotAllowedError") {
            setAutoplayBlocked(true);
            setIsPlaying(false);
          }
        });
    }
  }, []);

  // Handle route changes and switch tracks with position memory
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const prevRoute = currentRouteRef.current;

    // 1. Save current playback position of previous route before switching
    if (prevRoute && !isNaN(audio.currentTime) && audio.currentTime > 0) {
      trackPositions.current[prevRoute] = audio.currentTime;
    }

    currentRouteRef.current = normalizedRoute;
    const track = TRACK_MAP[normalizedRoute];

    if (!track) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    let isCancelled = false;
    const savedTime = trackPositions.current[normalizedRoute] || 0;

    // Check if the audio is already pointing to this track source
    let currentSrcPath = "";
    try {
      if (audio.src) {
        currentSrcPath = new URL(audio.src, window.location.href).pathname;
      }
    } catch {
      currentSrcPath = audio.src;
    }

    let targetSrcPath = "";
    try {
      targetSrcPath = new URL(track.src, window.location.href).pathname;
    } catch {
      targetSrcPath = track.src;
    }

    // If already playing the same source, continue or attempt to play if unpaused
    if (currentSrcPath === targetSrcPath && audio.readyState >= 1) {
      if (!userPausedRef.current && audio.paused) {
        attemptPlay(audio);
      }
      return;
    }

    // Switch to new track
    audio.pause();
    audio.src = track.src;

    const handleLoadedMetadata = () => {
      if (isCancelled) return;

      // Restore position if previously saved, else start from 0
      const duration = audio.duration;
      if (savedTime > 0 && (!duration || savedTime < duration)) {
        try {
          audio.currentTime = savedTime;
        } catch {
          // Ignore if seek not ready
        }
      } else {
        audio.currentTime = 0;
      }

      // Automatically attempt playback
      if (!userPausedRef.current) {
        attemptPlay(audio);
      }
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata, { once: true });
    audio.load();

    return () => {
      isCancelled = true;
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [normalizedRoute, getNormalizedRoute, attemptPlay]);

  // Immediately attempt playback on initial mount for Page 1 & general load
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && !userPausedRef.current) {
      attemptPlay(audio);
    }
  }, [attemptPlay]);

  // Listen to any first natural user interaction to start playback immediately if browser blocked unprompted autoplay
  useEffect(() => {
    const handleFirstUserInteraction = () => {
      const audio = audioRef.current;
      if (audio && !userPausedRef.current && audio.paused) {
        attemptPlay(audio);
      }
    };

    const eventOptions = { once: true, passive: true };
    window.addEventListener("pointerdown", handleFirstUserInteraction, eventOptions);
    window.addEventListener("keydown", handleFirstUserInteraction, eventOptions);
    window.addEventListener("touchstart", handleFirstUserInteraction, eventOptions);
    window.addEventListener("wheel", handleFirstUserInteraction, eventOptions);
    window.addEventListener("scroll", handleFirstUserInteraction, eventOptions);

    return () => {
      window.removeEventListener("pointerdown", handleFirstUserInteraction);
      window.removeEventListener("keydown", handleFirstUserInteraction);
      window.removeEventListener("touchstart", handleFirstUserInteraction);
      window.removeEventListener("wheel", handleFirstUserInteraction);
      window.removeEventListener("scroll", handleFirstUserInteraction);
    };
  }, [attemptPlay]);

  // Audio element listeners (timeupdate, ended, play, pause)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Continuously record playback position so navigation away never loses progress
    const handleTimeUpdate = () => {
      const activeRoute = currentRouteRef.current;
      if (activeRoute && !isNaN(audio.currentTime) && audio.currentTime > 0) {
        trackPositions.current[activeRoute] = audio.currentTime;
      }
    };

    // Continuous independent loop: when track ends, restart same track from 0
    const handleEnded = () => {
      const activeRoute = currentRouteRef.current;
      if (activeRoute) {
        trackPositions.current[activeRoute] = 0;
      }
      audio.currentTime = 0;
      if (!userPausedRef.current) {
        attemptPlay(audio);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [attemptPlay]);

  // Toggle Play / Pause button handler
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // Pause active track
      audio.pause();
      userPausedRef.current = true;
      setIsUserPaused(true);
      setIsPlaying(false);
      if (currentRouteRef.current) {
        trackPositions.current[currentRouteRef.current] = audio.currentTime;
      }
    } else {
      // Resume active track from saved position
      userPausedRef.current = false;
      setIsUserPaused(false);
      setAutoplayBlocked(false);
      attemptPlay(audio);
    }
  };

  return (
    <>
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        preload="auto"
        playsInline
        aria-hidden="true"
        style={{ display: "none" }}
      />

      {/* Floating Ambient Music Control Pill (Top-Right Corner) */}
      <aside className={`bgm-container ${isGallery ? "gallery-route" : ""}`}>
        <button
          type="button"
          onClick={togglePlayPause}
          className={`bgm-btn ${isPlaying ? "playing" : "paused"} ${
            autoplayBlocked ? "autoplay-blocked" : ""
          }`}
          aria-label={isPlaying ? `Pause music: ${currentTrack.title}` : `Play music: ${currentTrack.title}`}
          title={isPlaying ? `Pause (${currentTrack.title})` : `Play (${currentTrack.title})`}
        >
          {/* Animated sound bars or Play icon */}
          <div className="bgm-icon-wrapper" aria-hidden="true">
            {isPlaying ? (
              <div className="sound-wave">
                <span className="wave-bar bar-1" />
                <span className="wave-bar bar-2" />
                <span className="wave-bar bar-3" />
                <span className="wave-bar bar-4" />
              </div>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="play-icon"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </div>

          {/* Track name label */}
          <div className="bgm-text-wrapper">
            <span className="track-note" aria-hidden="true">♪</span>
            <span className="track-name">{currentTrack.title}</span>
          </div>
        </button>

        <style jsx>{`
          .bgm-container {
            position: fixed;
            top: 1.25rem;
            right: 1.5rem;
            z-index: 9999;
            pointer-events: auto;
            transition: right 0.3s cubic-bezier(0.16, 1, 0.3, 1), top 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }

          /* On Gallery page (desktop), position to the left of the '12 Memories' counter pill */
          .bgm-container.gallery-route {
            right: 9.5rem;
          }

          .bgm-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.55rem;
            height: 40px;
            padding: 0 0.95rem 0 0.8rem;
            border-radius: 9999px;
            background: rgba(44, 62, 80, 0.82);
            border: 1px solid rgba(233, 231, 242, 0.24);
            color: #E9E7F2;
            cursor: pointer;
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            box-shadow: 
              0 4px 20px rgba(0, 0, 0, 0.4),
              0 0 12px rgba(94, 42, 140, 0.35);
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            user-select: none;
            outline: none;
          }

          .bgm-btn:hover {
            background: rgba(44, 62, 80, 0.95);
            border-color: rgba(233, 231, 242, 0.5);
            box-shadow: 
              0 6px 24px rgba(0, 0, 0, 0.55),
              0 0 18px rgba(94, 42, 140, 0.6);
            transform: translateY(-1px);
          }

          .bgm-btn:focus-visible {
            box-shadow: 
              0 0 0 2px #5E2A8C,
              0 0 0 4px rgba(233, 231, 242, 0.5);
          }

          .bgm-btn.autoplay-blocked {
            animation: gentleGlow 2.5s infinite ease-in-out;
          }

          @keyframes gentleGlow {
            0%, 100% {
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), 0 0 10px rgba(94, 42, 140, 0.3);
            }
            50% {
              box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5), 0 0 20px rgba(233, 231, 242, 0.55);
            }
          }

          .bgm-icon-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 18px;
            height: 18px;
            flex-shrink: 0;
          }

          .play-icon {
            color: #E9E7F2;
            margin-left: 1px;
          }

          /* Equalizer sound wave bars */
          .sound-wave {
            display: flex;
            align-items: flex-end;
            gap: 2.2px;
            height: 15px;
            width: 16px;
          }

          .wave-bar {
            width: 2.2px;
            background: #E9E7F2;
            border-radius: 2px;
            box-shadow: 0 0 4px rgba(233, 231, 242, 0.6);
          }

          .bar-1 {
            height: 7px;
            animation: soundBounce 0.8s ease-in-out infinite alternate;
          }
          .bar-2 {
            height: 13px;
            animation: soundBounce 0.55s ease-in-out infinite alternate 0.15s;
          }
          .bar-3 {
            height: 5px;
            animation: soundBounce 0.75s ease-in-out infinite alternate 0.3s;
          }
          .bar-4 {
            height: 10px;
            animation: soundBounce 0.65s ease-in-out infinite alternate 0.1s;
          }

          @keyframes soundBounce {
            0% {
              height: 3px;
            }
            100% {
              height: 14px;
            }
          }

          .bgm-text-wrapper {
            display: flex;
            align-items: center;
            gap: 0.3rem;
            font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 0.78rem;
            font-weight: 500;
            letter-spacing: 0.02em;
            white-space: nowrap;
          }

          .track-note {
            opacity: 0.75;
            font-size: 0.85rem;
          }

          .track-name {
            max-width: 130px;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          @media (max-width: 768px) {
            .bgm-container {
              top: 0.85rem;
              right: 1rem;
            }

            .bgm-container.gallery-route {
              right: 1rem; /* On mobile, counter-pill is hidden */
            }

            .bgm-btn {
              height: 36px;
              padding: 0 0.75rem 0 0.65rem;
            }

            .track-name {
              max-width: 85px;
            }
          }
        `}</style>
      </aside>
    </>
  );
}
