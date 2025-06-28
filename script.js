let questions = [];
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
    btn.onclick = () => checkAnswer(btn, option);
    optionsDiv.appendChild(btn);
  });

  document.getElementById("scoreboard").innerText = `Question ${currentQuestion + 1} of ${questions.length}`;
}

function checkAnswer(button, selected) {
  const correctAnswer = questions[currentQuestion].answer;
  const buttons = document.querySelectorAll("#options button");

  // Disable all buttons after one click
  buttons.forEach(btn => btn.disabled = true);

  // Position frog image beside clicked button
  const frog = document.getElementById("froggy");
  const rect = button.getBoundingClientRect();
  frog.style.top = `${rect.top + window.scrollY - 20}px`;
  frog.style.left = `${rect.left + window.scrollX - 60}px`;
  frog.classList.add("frog-jump");
  frog.style.display = "block";

  setTimeout(() => {
    frog.style.display = "none";
    frog.classList.remove("frog-jump");

    if (selected === correctAnswer) {
      button.classList.add("correct");
      score++;
    } else {
      button.classList.add("wrong");
      buttons.forEach(btn => {
        if (btn.innerText === correctAnswer) {
          btn.classList.add("correct");
        }
      });
    }

    setTimeout(nextQuestion, 800);
  }, 700);
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    document.getElementById("game-container").innerHTML = `<h1>🎉 Game Over 🎉</h1><p>Your score: ${score}/${questions.length}</p>`;
  }
}

fetch("questions.json")
  .then(response => response.json())
  .then(data => {
    questions = data;
    showQuestion();
  })
  .catch(error => console.error("Failed to load questions:", error));
