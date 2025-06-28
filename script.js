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

  // Get button position for placing GIF
  const rect = button.getBoundingClientRect();

  // Create Froggy GIF element
  const froggy = document.createElement("img");
  froggy.src = "images/froggy.gif"; // make sure your image path is correct
  froggy.style.width = "50px";
  froggy.style.position = "absolute";
  froggy.style.left = rect.left + "px";
  froggy.style.top = rect.top + "px";
  froggy.classList.add("frog-jump");
  document.body.appendChild(froggy);

  // After frog jumps (700ms), show result image
  setTimeout(() => {
    froggy.remove();

    const resultImg = document.createElement("img");
    resultImg.style.width = "60px";
    resultImg.style.position = "absolute";
    resultImg.style.left = rect.left + "px";
    resultImg.style.top = rect.top + "px";

    if (selected === correctAnswer) {
      button.classList.add("correct");
      score++;
      resultImg.src = "images/true.gif"; // your true GIF
    } else {
      button.classList.add("wrong");
      resultImg.src = "images/wrong.gif"; // your wrong GIF

      // Highlight the correct answer button too
      buttons.forEach(btn => {
        if (btn.innerText === correctAnswer) {
          btn.classList.add("correct");
        }
      });
    }

    document.body.appendChild(resultImg);

    // Remove result image after 1s
    setTimeout(() => resultImg.remove(), 1000);

  }, 700); // Wait for frog jump

  // Move to next question after 1.7 seconds
  setTimeout(nextQuestion, 1700);
}

  // Show next quest
