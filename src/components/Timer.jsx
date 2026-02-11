import { useEffect, useState } from "react";

/**
 * Timer component counts down from `duration` seconds when `start` is true.
 * Calls `onTimeUp` callback when the timer reaches zero.
 * 
 * Props:
 * - start (boolean): Whether the timer should run.
 * - duration (number): Starting time in seconds.
 * - onTimeUp (function): Callback when time is up.
 */
export default function Timer({ start, duration, onTimeUp }) {
  // timeLeft state holds current seconds left
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    // If timer not started, do nothing
    if (!start) return;

    // If time is already zero, call onTimeUp immediately
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    // Set up interval to decrease timeLeft every second
    const intervalId = setInterval(() => {
      setTimeLeft((t) => {
        if (t === 1) {
          // When countdown reaches 1, clear interval and trigger onTimeUp
          clearInterval(intervalId);
          onTimeUp();
          return 0;
        }
        return t - 1; // decrease timeLeft by 1 second
      });
    }, 1000);

    // Cleanup interval on unmount or if dependencies change
    return () => clearInterval(intervalId);
  }, [start, timeLeft, onTimeUp]);

  // Render time left in seconds with some styling
  return (
    <div style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1B5E20" }}>
      Time Left: {timeLeft}s
    </div>
  );
}
