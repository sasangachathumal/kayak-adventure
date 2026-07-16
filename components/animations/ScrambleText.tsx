"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const CHARS = "-_~`!@#$%^&*()+=[]{}|;:,.<>?";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;

interface ScrambleTextProps {
  text: string;
  className?: string;
  charClassName?: (char: string, index: number) => string;
}

export default function ScrambleText({
  text,
  className,
  charClassName,
}: ScrambleTextProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [displayText, setDisplayText] = useState(text);

  const stopScramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(text);
  };

  const scramble = () => {
    let pos = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const scrambled = text
        .split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setDisplayText(scrambled);
      pos++;

      if (pos >= text.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <span
      onMouseEnter={scramble}
      onMouseLeave={scramble}
      className={cn("cursor-pointer", className)}
    >
      {displayText.split("").map((char, index) => (
        <span
          key={index}
          className={cn(charClassName ? charClassName(char, index) : "")}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
