let questions = [];
let currentQuestion = 0;
let score = 0;
let lives = 5;

const frog = document.getElementById("frog");
const resultImg = document.getElementById("result-img");

function showQuestion() {
  if (currentQuestion >= questions.length) {
    endGame();
    return;
  }

  const q = questions[currentQuestion];
  document.getElementById("question").innerText = q.text;
  document.getElementById("scoreboard").innerText = `Score: ${score}`;
  document.getElementById("lives").innerText = `Lives: ${lives}`;

  q.options.forEach((opt, i) => {
    const btn = document.getElementById(`btn${i}`);
    btn.innerText = opt;
    btn.disabled = false;
    btn.onclick = () => selectAnswer(btn, opt);
  });
}

function selectAnswer(button, selected) {
  const correct = questions[currentQuestion].answer;
  const rect = button.getBoundingClientRect();

  // Move frog to clicked button
  frog.style.left = `${rect.left + rect.width / 2 - 40}px`;

  // Disable all buttons
  for (let i = 0; i < 4; i++) document.getElementById(`btn${i}`).disabled = true;

  // Show result
  if (selected === correct) {
    score++;
    resultImg.src = "true.gif";
  } else {
    lives--;
    resultImg.src = "wrong.gif";
  }
  resultImg.style.display = "block";

  setTimeout(() => {
    resultImg.style.display = "none";
    currentQuestion++;
    if (lives > 0) {
      showQuestion();
    } else {
      endGame();
    }
  }, 1000);
}

function endGame() {
  document.getElementById("question").innerText = "Game Over!";
  document.getElementById("scoreboard").innerText = `Final Score: ${score}`;
  document.getElementById("lives").innerText = "";
  document.getElementById("options").style.display = "none";
  frog.style.display = "none";
}

fetch("questions.json")
  .then(response => response.json())
  .then(data => {
    questions = data;
    showQuestion();
  });
