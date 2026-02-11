import { useState, useEffect, useRef } from "react";
import Timer from "./Timer";
import { wordsList } from "../data/sentences";


// Typing test showing one word at a time
export default function TypingTest() {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [correctCharCount, setCorrectCharCount] = useState(0);
  const inputRef = useRef(null);

  // Initialize random word list (shuffle and pick e.g. 20 words)
  useEffect(() => {
    function shuffle(arr) {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }

    const shuffled = shuffle(wordsList);
    setWords(shuffled.slice(0, 70)); // take first 70 words
  }, []);

  // Auto focus input when test starts
  useEffect(() => {
    if (started && inputRef.current) {
      inputRef.current.focus();
    }
  }, [started]);

  // Handle input change
  function handleChange(e) {
    if (timeUp) return;

    const val = e.target.value;
    if (!started) setStarted(true);
    setInput(val);

    const currentWord = words[currentIndex];

    // If input matches current word exactly, go to next
    if (val.trim() === currentWord) {
      // count chars of the word + 1 space except last word
      setCorrectCharCount(c =>
        c + currentWord.length + (currentIndex === words.length - 1 ? 0 : 1)
      );
      setCurrentIndex(i => i + 1);
      setInput("");
    }
  }

  function handleTimeUp() {
    setTimeUp(true);
  }

  function handleRestart() {
    setCurrentIndex(0);
    setInput("");
    setStarted(false);
    setTimeUp(false);
    setCorrectCharCount(0);
    if (inputRef.current) inputRef.current.focus();
  }

  // Input border color: green if input matches start of current word, red otherwise
  function borderColor() {
    if (!started || timeUp) return "#ccc";

    const currentWord = words[currentIndex] || "";
    if (currentWord.startsWith(input)) {
      return "green";
    }
    return "red";
  }

  // Calculate WPM on finish
  const wpm = Math.round((correctCharCount / 5) / (30 / 60));

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: 40,
        maxWidth: 400,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h3 style={{ color: "#1B5E20" }}>
        {timeUp
          ? "Time's up!"
          : words[currentIndex]
          ? `Type this word :`
          : "Loading words..."}
      </h3>

      {!timeUp && words[currentIndex] && (
        <div
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: 20,
            color: "#2E7D32",
          }}
        >
          {words[currentIndex]}
        </div>
      )}

      <Timer start={started && !timeUp} duration={30} onTimeUp={handleTimeUp} />

      {!timeUp && words[currentIndex] && (
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Type here..."
          autoComplete="off"
          spellCheck={false}
          style={{
            marginTop: 20,
            width: "80%",
            padding: "10px 15px",
            fontSize: "1.5rem",
            borderRadius: 8,
            border: `3px solid ${borderColor()}`,
            outline: "none",
            textAlign: "center",
          }}
        />
      )}

      {timeUp && (
        <div style={{ marginTop: 30 }}>
          <p style={{ fontSize: "1.5rem", color: "#1B5E20" }}>
            Your typing test is complete..
          </p>
          <p style={{ fontSize: "1.5rem", color: "#1B5E20" }}>
            Your WPM : <strong>{wpm}</strong>
          </p>
          <button
            onClick={handleRestart}
            style={{
              marginTop: 20,
              padding: "12px 24px",
              fontSize: "1rem",
              borderRadius: "8px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
