let currentQuestion = 0;
let lives = 5;
let score = 0;
let frogPosition = 0;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const livesDisplay = document.getElementById("lives");
const questionNumberDisplay = document.getElementById("question-number");
const frog = document.getElementById("frog");
const gameOverDisplay = document.getElementById("game-over");

let questions = [];

fetch("questions.json")
  .then(res => res.json())
  .then(data => {
    questions = data;
    showQuestion();
  });

function showQuestion() {
  if (currentQuestion >= questions.length) {
    endGame("🎉 You've completed the quiz safely!");
    return;
  }
  questionText.textContent = questions[currentQuestion].question;
  optionsContainer.innerHTML = "";
  questions[currentQuestion].options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option-button";
    button.textContent = option;
    button.onclick = () => selectAnswer(index);
    optionsContainer.appendChild(button);
  });
  questionNumberDisplay.textContent = currentQuestion + 1;
}

function selectAnswer(index) {
  const correct = questions[currentQuestion].answer;
  if (index === correct) {
    score++;
    frogPosition += 20;
    frog.style.left = frogPosition + "px";
  } else {
    lives--;
    livesDisplay.textContent = lives;
    if (lives === 0) {
      endGame("💀 Game Over! The frog didn't make it.");
      return;
    }
  }
  currentQuestion++;
  showQuestion();
}

function endGame(message) {
  gameOverDisplay.textContent = message;
  gameOverDisplay.classList.remove("hidden");
  optionsContainer.innerHTML = "";
  questionText.textContent = "";
}
