import { useState } from "react";

/**
 * Hook to manage hover and copy state for items (contacts or socials)
 */
export function useHoverWave() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 1200);
  };

  const onHoverStart = (label: string) => setHovered(label);
  const onHoverEnd = () => setHovered(null);

  return { hovered, copied, handleCopy, onHoverStart, onHoverEnd };
}