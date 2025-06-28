
const questions = [
  {
    text: "What is the capital of Malaysia?",
    options: ["Kuala Lumpur", "Johor Bahru", "Penang", "Melaka"],
    answer: "Kuala Lumpur"
  },
  {
    text: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4"
  }
];

let currentQuestion = 0;
let score = 0;

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").innerText = q.text;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => checkAnswer(option);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (selected === questions[currentQuestion].answer) {
    alert("Correct!");
    score++;
  } else {
    alert("Wrong!");
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    document.getElementById("game-container").innerHTML = `<h1>Game Over</h1><p>Your score: ${score}/${questions.length}</p>`;
  }
}

window.onload = showQuestion;
