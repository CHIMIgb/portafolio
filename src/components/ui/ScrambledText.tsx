"use client";

import { useState, useEffect } from "react";

interface ScrambledTextProps {
  text: string;
  className?: string; 
  delay?: number;
  duration?: number;
}

const SHUFFLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

export default function ScrambledText({ text, className = "", delay = 0, duration = 5000 }: ScrambledTextProps) {
  // Initialize with a static index to avoid server-side hydration mismatch
  const [output, setOutput] = useState<{char: string, decoded: boolean}[]>(
    text.split("").map(c => ({ char: c === " " ? " " : SHUFFLE_CHARS[0], decoded: c === " " }))
  );
  
  const [started, setStarted] = useState(false);

  // Initialize random chars immediately on mount to be different on every reload
  useEffect(() => {
    setOutput(text.split("").map(c => ({ char: c === " " ? " " : SHUFFLE_CHARS[Math.floor(Math.random() * SHUFFLE_CHARS.length)], decoded: c === " " })));
  }, [text]);

  // Start delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  // Scramble and decode loop
  useEffect(() => {
    if (!started) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const iterate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setOutput(prev => 
        prev.map((item, index) => {
          const actualChar = text[index];
          // Spaces are always decoded
          if (actualChar === " ") return { char: " ", decoded: true };
          
          // If already decoded, leave it
          if (item.decoded) return item;

          // Target time for this character to decode (staggered mapping based on index or random)
          // To make it look like a progressive translation, we can decode earlier characters first or just randomly
          // Here we do random threshold for each character
          const decodeThreshold = (index / text.length) * 0.5 + Math.random() * 0.5;

          if (progress >= decodeThreshold) {
            return { char: actualChar, decoded: true };
          }

          // If not decoded yet, keep shuffling it
          // Only shuffle every few frames to prevent too crazy blinking, controlled by time
          if (timestamp % 50 < 16) {
             return { char: SHUFFLE_CHARS[Math.floor(Math.random() * SHUFFLE_CHARS.length)], decoded: false };
          }
          
          return item;
        })
      );

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(iterate);
      } else {
        // Enforce all are decoded at the end
        setOutput(text.split("").map(c => ({ char: c, decoded: true })));
      }
    };

    animationFrameId = requestAnimationFrame(iterate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [started, text, duration]);

  return (
    <span className={className}>
      {output.map((item, i) => (
        item.decoded ? (
          <span key={i}>{item.char}</span>
        ) : (
          <span key={i} className="covenant-text" style={{ fontSize: "1.1em" }}>
            {item.char}
          </span>
        )
      ))}
    </span>
  );
}
