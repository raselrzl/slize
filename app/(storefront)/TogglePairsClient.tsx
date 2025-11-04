// TogglePairsClient.tsx
"use client";
import { useState, useEffect } from "react";

interface TogglePairsClientProps {
  firstPair: React.ReactNode;
  secondPair: React.ReactNode;
}

export default function TogglePairsClient({
  firstPair,
  secondPair,
}: TogglePairsClientProps) {
  const [showFirstPair, setShowFirstPair] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirstPair((prev) => !prev);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return <>{showFirstPair ? firstPair : secondPair}</>;
}
