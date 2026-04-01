import { useState, useEffect, useRef } from "react";

const roles = [
  "IT Student",
  "Aspiring Software Engineer",
  "Frontend Explorer",
  "Tech Explorer",
];

export function ShufflingRoles() {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState(roles[0]);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&<>[]{}/*-+";
  
  const prevWordRef = useRef(roles[0]);

  useEffect(() => {
    const targetText = roles[index];
    const prevText = prevWordRef.current;
    
    const maxLength = Math.max(targetText.length, prevText.length);
    let iteration = 0;
    let interval: any;

    interval = setInterval(() => {
      setDisplayText(
        Array.from({ length: maxLength })
          .map((_, i) => {
            if (i < Math.floor(iteration)) {
              return targetText[i] || ""; 
            }
            
            if (i < Math.floor(iteration + 4)) {
              return chars[Math.floor(Math.random() * chars.length)];
            }

            return prevText[i] || "";
          })
          .join("")
      );

      if (iteration >= maxLength) {
        clearInterval(interval);
        prevWordRef.current = targetText;
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % roles.length);
        }, 3000);
      }

      iteration += 0.5;
    }, 30);

    return () => clearInterval(interval);
  }, [index]);

  return (
  <div className="flex items-center text-[--color-text-secondary] font-mono min-h-[1.5em] w-full max-w-full">
    <span className="inline-block truncate">
      {displayText}
    </span>
    <span className="ml-2 flex-shrink-0 w-1.5 sm:w-2 h-[1em] bg-[--color-primary] animate-pulse" />
  </div>
);
}