//pseudocode
// Create object for Quiz Question.
// Get reference from HTML by using document.getElementbyID.
// Start Quiz Function
// Display Quiz Function
// Timer
// substract timer for wrong answer
// Check Answer
// Save Highscore localstorage

// This quizData array consist of question and answer of the quiz.
const quizData = [
    {
        question: "HTML stands for -",
        choices: ["HighText Machine Language", "HyperText and links Markup Language", "HyperText Markup Language", "None of these"],
        answer: "HyperText Markup Language"
    },
    {
        question: "The correct sequence of HTML tags for starting a webpage is -",
        choices: ["Head, Title, HTML, body", "HTML, Body, Title, Head", "HTML, Head, Title, Body", "HTML, Head, Title, Body"],
        answer: "HTML, Head, Title, Body"
    },
    {
        question: "Which of the following element is responsible for making the text bold in HTML?",
        choices: ["<pre>", "<a>", "<b>", "<br>"],
        answer: "<b>"
    },
    {
        question: "Which of the following tag is used for inserting the largest heading in HTML?",
        choices: ["<h3>", "<h1>", "<h5>", "<h6>"],
        answer: "<h1>"
    },
    {
        question: "How to create an unordered list (a list with the list items in bullets) in HTML?",
        choices: ["<ul>", "<ol>", "<li>", "<i>"],
        answer: "<ul>"
    },
]

// Get reference from HTML by using document.getElementbyID.
const startscreen = document.getElementById("start-screen");
const startbutton = document.getElementById("start");
const quizcontainer = document.getElementById("quiz-container");
const questions = document.getElementById("question");
const choices = document.getElementById("choice");
const endquiz = document.getElementById("end-quiz");
const highscore = document.getElementById("your-highscore");
const btninitial = document.getElementById("submit-initial");
const timerElement = document.getElementById("time");
const showtime = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const submitInitialButton = document.getElementById("submit-initial");
const initialsInput = document.getElementById("initials");
const highscoreContainer = document.getElementById("highscore-container");
const highscoreList = document.querySelector("highscore-container");
const scoreList = document.getElementById("score-list");
const startAgain = document.getElementById("start-again");
const answer = document.getElementById("answer");
const clear = document.getElementById("clear");
const viewHighscore = document.getElementById("view-highscore");

// Variable for question index, score and timer.
let questionIndex = 0;
let score = 0;
let timeLeft = 80;
let timerInterval;
let highscores = JSON.parse(localStorage.getItem("highscores")) || [];

function updateTimer() {
    timeLeft--;
    timerElement.textContent = timeLeft;
  
    if (timeLeft <= 0) {
      endQuiz();
    }
}

function startQuiz() {
    startscreen.style.display = "none";
    startbutton.style.display = "none";
    quizcontainer.style.display = "block";
    showtime.style.display ="block";
    timerInterval = setInterval(updateTimer, 1000);
    displayquiz();
}

function displayquiz() {
    const currentQuestion = quizData[questionIndex];
    questions.textContent = currentQuestion.question;
  
    choices.innerHTML = "";
  
    currentQuestion.choices.forEach(function(choice) {
      const choiceButton = document.createElement("button");
      choiceButton.textContent = choice;
      choices.appendChild(choiceButton);
  
      choiceButton.addEventListener("click", function() {
        checkAnswer(choice, currentQuestion.answer);
      });
    });
}

function checkAnswer(selectedChoice, correctAnswer) {
    if (selectedChoice === correctAnswer) {
        score += 20;
        answer.innerHTML = "Correct";
        answer.classList.add("correct");
    } else {
      timeLeft -= 20;
      answer.innerHTML = "Wrong";
      answer.classList.add("wrong");
      if (timeLeft < 0) {
        timeLeft = 0;
      }
    }
    setTimeout(() => {
        answer.classList.remove("correct", "wrong");
        answer.innerHTML = "";
        questionIndex++;
        if (questionIndex < quizData.length) {
          displayquiz();
        } else {
            endQuiz();
        }
      }, 1000);
}

  function endQuiz() {
    clearInterval(timerInterval);
    quizcontainer.style.display = "none";
    endquiz.style.display = "inline";
    showScore();
}
  
  function showScore() {
    scoreElement.textContent = score;
}
function displayHighscores() {
    scoreList.innerHTML = "";
  
    for (let i = 0; i < highscores.length; i++) {
        const entry = document.createElement("li");
        entry.textContent = highscores[i].initials + " - " + highscores[i].score;
        scoreList.appendChild(entry);
    }
        highscoreContainer.style.display = "block";
        endquiz.style.display = "none";
}

  function saveHighscore() {
        const initials = initialsInput.value.trim();
    if (initials !== "") {
        const highscore = {
        initials: initials,
        score: score,
      };
        highscores.push(highscore);
        highscores.sort((a, b) => b.score - a.score);
        localStorage.setItem("highscores", JSON.stringify(highscores));
        displayHighscores();
    }
  }
  function clearHighscore() {
    localStorage.clear();
    scoreList.style.display = "none";
  }
  function viewhighscore() {
    startscreen.style.display = "none";
    displayHighscores();
  }
  function startagain() {
    location.reload();
  }

startbutton.addEventListener("click", startQuiz);
submitInitialButton.addEventListener("click", saveHighscore);
clear.addEventListener("click", clearHighscore);
viewHighscore.addEventListener("click", viewhighscore);
startAgain.addEventListener("click", startagain)