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

  // Mark correct and wrong
  if (selected === correctAnswer) {
    button.classList.add("correct");
    score++;

    // Optional frog GIF beside correct button
    const frogImg = document.createElement("img");
    frogImg.src = "frog.gif"; // replace with your frog image URL
    frogImg.style.width = "35px";
    frogImg.style.marginLeft = "10px";
    button.appendChild(frogImg);

  } else {
    button.classList.add("wrong");
    buttons.forEach(btn => {
      if (btn.innerText === correctAnswer) {
        btn.classList.add("correct");
      }
    });
  }

  // Show next quest
