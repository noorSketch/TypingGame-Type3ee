import { useState, useEffect, useRef } from "react";
import Timer from "./Timer";
import { wordsList } from "../data/sentences";

export default function TypingTest() {

  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [timeUp, setTimeUp] = useState(false);
  const [score, setScore] = useState(0);

  const [countdown, setCountdown] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);

  const [flashWrong, setFlashWrong] = useState(false);
  const [forceRed, setForceRed] = useState(false);

  const inputRef = useRef(null);

  // Shuffle words
  function shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  useEffect(() => {
    const shuffled = shuffle(wordsList);
    setWords(shuffled.slice(0, 70));
  }, []);

  // Countdown before start
  useEffect(() => {
    if (countdown <= 0) {
      setGameStarted(true);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(c => c - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  // Auto focus
  useEffect(() => {
    if (gameStarted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameStarted]);

  function handleChange(e) {
    if (!gameStarted || timeUp) return;

    const val = e.target.value;
    const currentWord = words[currentIndex];
    if (!currentWord) return;

    // FIRST LETTER WRONG
    if (val.length === 1 && val !== currentWord[0]) {
      setFlashWrong(true);
      setForceRed(true);

      setTimeout(() => {
        setFlashWrong(false);
        setForceRed(false);
      }, 300);

      setCurrentIndex(i => i + 1);
      setInput("");
      return;
    }

    setInput(val);

    // FULL WORD CORRECT
    if (val === currentWord) {
      setScore(s => s + 1);
      setCurrentIndex(i => i + 1);
      setInput("");
    }
  }

  function handleTimeUp() {
    setTimeUp(true);
  }


  function handleRestart() {
  const shuffled = shuffle(wordsList);
  setWords(shuffled.slice(0, 70));

  setCurrentIndex(0);
  setInput("");
  setScore(0);
  setTimeUp(false);

  setCountdown(3);
  setGameStarted(false);
}


  // Background color logic
  function inputBackground() {
    if (forceRed) return "#ffcccc";

    if (!input) return "white";

    const currentWord = words[currentIndex] || "";

    if (input.length > 1) {
      if (currentWord.startsWith(input)) {
        return "#c8f7c5"; // green
      } else {
        return "#ffcccc"; // red
      }
    }

    return "white";
  }

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>

      {/* COUNTDOWN */}
      {!gameStarted && !timeUp && (
        <div style={{ fontSize: "3rem", fontWeight: 600 }}>
          {countdown}
        </div>
      )}

      {/* GAME */}
      {gameStarted && !timeUp && (
        <>
          <h2>{words[currentIndex]}</h2>



          <Timer
            key={gameStarted ? "running" : "stopped"} 
            isRunning={gameStarted}
            duration={30}
            onTimeUp={handleTimeUp}
          />



          <input
            ref={inputRef}
            value={input}
            onChange={handleChange}
            placeholder="Type here..."
            className={flashWrong ? "wrong-flash wiggle" : ""}
            style={{
              padding: "10px",
              fontSize: "1.5rem",
              borderRadius: "8px",
              border: "2px solid #1B5E20",
              backgroundColor: inputBackground(),
              textAlign: "center"
            }}
          />
        </>
      )}

      {/* RESULT */}
      {timeUp && (
        <>
          <h2>⏰ Time's up!</h2>
          <p style={{ fontSize: "1.5rem" }}>
            🎉 Your Final Score: <strong>{score}</strong> 🏆
          </p>
          <button onClick={handleRestart}>
            🔥 Play Again
          </button>
        </>
      )}

    </div>
  );
}
