
# 🌳 Type3ree – Typing Speed Test

Type3ree is a clean and minimal typing speed test game built with **React + Vite**.
It focuses on improving typing accuracy and speed using a simple word-by-word system.

Designed with a **nature/forest theme** 🌿 and a tree mascot.

---

## 🎮 Features

* ⏱ 30-second typing test
* 📝 One-word-at-a-time typing system
* 🟢 Green border when typing correctly
* 🔴 Red border when typing incorrectly
* 📊 Final WPM (Words Per Minute) result
* 🔁 Play Again functionality
* 🎨 Clean green nature-themed UI

---

## 🧠 How It Works

* A shuffled list of learning-related words is generated.
* The player types one word at a time.
* The input box:

  * Turns **green** if the typed text matches the word.
  * Turns **red** if there is a mistake.
* When time is up:

  * The input disappears.
  * Final WPM is calculated and displayed.

### WPM Formula

```
WPM = (Correct Characters / 5) / Time in Minutes
```

* 5 characters = 1 word (standard typing metric)
* Test duration: 30 seconds

---

## 🛠 Tech Stack

**Frontend**

* React (Vite)
* JavaScript (ES6)
* HTML + CSS

**Tools**

* VS Code
* Node.js (LTS)
* npm
* Git & GitHub

No backend is used.
This is a fully frontend-based project.

---

## 📂 Project Structure

```
typing-speed-test/
│
├─ src/
│  ├─ components/
│  │  ├─ TypingTest.jsx
│  │  └─ Timer.jsx
│  │
│  ├─ data/
│  │  └─ sentences.js
│  │
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
│
├─ public/
└─ package.json
```

---

## 🚀 Installation & Setup

1. Clone the repository

```
git clone https://github.com/your-username/type3ree.git
```

2. Navigate into project folder

```
cd type3ree
```

3. Install dependencies

```
npm install
```

4. Run development server

```
npm run dev
```

---

## 📌 Future Improvements (Planned)

* Save best score using LocalStorage
* Difficulty levels (Easy / Medium / Hard)
* Sound effects
* Dark mode
* Typing accuracy percentage
* Word progress bar

---

## 👩‍💻 Author

Created as a mini portfolio project to practice:

* React state management
* Component structure
* Game logic
* UI styling

