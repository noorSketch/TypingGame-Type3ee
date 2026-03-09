import { useEffect, useState } from "react";

/*
  Timer Component
  - Runs once when isRunning becomes true
  - Counts down from duration
  - Does NOT reset on every re-render
*/

export default function Timer({ isRunning, duration, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!isRunning) return; // only start when game begins

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();      // notify parent when finished
          return 0;
        }
        return prev - 1;   // reduce time normally
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);  // ⚠️ ONLY depend on isRunning

  return (
    <div style={{ fontSize: "1.5rem", fontWeight: 600 }}>
      ⏳ Time Left: {timeLeft}s
    </div>
  );
}
