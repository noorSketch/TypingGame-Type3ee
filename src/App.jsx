import React, { useState } from "react";
import treeImage from "./assets/tree2.png";
import TypingTest from "./components/TypingTest";

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#E8F5E9",
      }}
    >
      {!started ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "clamp(450px, 32vw, 520px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <img
              src={treeImage}
              alt="Type3ree Mascot"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />

            <button
              onClick={() => setStarted(true)}
              className="pulse-btn"
              style={{ width: "100%" }}
            >
              Click here to play
            </button>
          </div>
        </div>
      ) : (
        <TypingTest />
      )}
    </div>
  );
}
