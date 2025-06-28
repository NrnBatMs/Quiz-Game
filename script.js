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

  // Disable all buttons
  buttons.forEach(btn => btn.disabled = true);

  // Get or create frog image
  let frog = document.getElementById("froggy");
  if (!frog) {
    frog = document.createElement("img");
    frog.id = "froggy";
    frog.src = "froggy.gif";
    frog.style.position = "absolute";
    frog.style.width = "50px";
    frog.style.zIndex = "10";
    document.body.appendChild(frog);
  }

  // Position frog at selected button
  const rect = button.getBoundingClientRect();
  frog.style.top = `${rect.top + window.scrollY - 20}px`;
  frog.style.left = `${rect.left + window.scrollX - 60}px`;
  frog.style.display = "block";

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

  document.getElementById("scoreboard").innerText = `Score: ${score}`;
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
