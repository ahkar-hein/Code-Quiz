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
const final = document.getElementById("final");

// Variable for question index, score and timer.
let questionIndex = 0;
let score = 0;
let timeLeft = 80;
let timerInterval;
// create array and save highscores in localstorage by using getitem method
let highscores = JSON.parse(localStorage.getItem("highscores")) || [];

// This function works for update timer
function updateTimer() {
    timeLeft--;
    timerElement.textContent = timeLeft;
// this if statements works if the timer last than 10 sec, timer color change into red to remind the user.
    if (timeLeft < 10) {
        showtime.style.color = "Red";
    }
//  This if statements for when timer end endquiz function run.
    if (timeLeft <= 0) {
      // clear timer if time out
      clearInterval(timerInterval);
      quizcontainer.style.display = "none";
      endquiz.style.display = "block";
      // change "Time Out!" instead of "All Done!"
      final.innerHTML = "Time Out !"
      // execute showScore function
      showScore();
    }
}
// Startquiz function
function startQuiz() {
    // From line 85 to 88 is used for startscreen will be disapper and quizcontainer and 
    // timer will be apper when startQuiz function execute.
    startscreen.style.display = "none";
    quizcontainer.style.display = "inline-block";
    showtime.style.display ="block";
    // This code used to start a timer 
    timerInterval = setInterval(updateTimer, 1000);
    // execute diskplayquiz function
    displayquiz();
}

function displayquiz() {
    // Get the current question from the quiz data based on the question index
    const currentQuestion = quizData[questionIndex];
    // Set the question text content to the current question
    questions.textContent = currentQuestion.question;
    // Clear the choices container
    choices.innerHTML = "";
    // Loop through each choice in the current question's choices array
    currentQuestion.choices.forEach(function(choice) {
      const choiceButton = document.createElement("button");
      choiceButton.textContent = choice;
      choices.appendChild(choiceButton);

      choiceButton.addEventListener("click", function() {
        // execute the checkAnswer function with the selected choice and the correct answer
        checkAnswer(choice, currentQuestion.answer);
      });
    });
}
// CheckAnswer function with selectChoice and correctAnswer parameter 
function checkAnswer(selectedChoice, correctAnswer) {
  // if condition for user choice and correct answer are the same or not
    if (selectedChoice === correctAnswer) {
      // if same +20 socres and display correct
        score += 20;
        answer.innerHTML = "Correct";
        answer.classList.add("correct");
    } else {
      // if the answer is wrong, substract the 20 seconds from timeLeft
      timeLeft -= 20;
      answer.innerHTML = "Wrong";
      answer.classList.add("wrong");
      if (timeLeft < 0) {
        timeLeft = 0;
      }
    }
    setTimeout(() => {
      // Remove the "correct" and "wrong" classes from the answer element
        answer.classList.remove("correct", "wrong");
        answer.innerHTML = "";
        // increase the question index to move to the next question
        questionIndex++;
        // Check if there are more question
        if (questionIndex < quizData.length) {
          // show the question if there are more
          displayquiz();
        } else {
          // otherwise end the quiz by execute the endquiz function
            endQuiz();
        }
      }, 500);
}

  function endQuiz() {
    // Clear the timer
    clearInterval(timerInterval);
    quizcontainer.style.display = "none";
    endquiz.style.display = "block";
    // display score by execute showScore function
    showScore();
}
  
  function showScore() {
    // display score
    scoreElement.textContent = score;
}
function displayHighscores() {
  // clear content
    scoreList.innerHTML = "";
    // Loop each highscore
    for (let i = 0; i < highscores.length; i++) {
      // create list
        const entry = document.createElement("li");
        // display initial and score
        entry.textContent = highscores[i].initials + " - " + highscores[i].score;
        // append the list item
        scoreList.appendChild(entry);
    }
      // show the highscore container and hide the endquiz container
        highscoreContainer.style.display = "block";
        endquiz.style.display = "none";
}
  // This function for save highscore in localstorage.
  function saveHighscore() {
    // get initial values
        const initials = initialsInput.value.trim();
        // check initial value is not empty
    if (initials !== "") {
      // create object for initial and score
        const highscore = {
        initials: initials,
        score: score,
      };
      // add highscores into array
        highscores.push(highscore);
        // Sort the highscores array in descending order based on score
        highscores.sort((a, b) => b.score - a.score);
        // store the highscores array into localstorage as JSON string
        localStorage.setItem("highscores", JSON.stringify(highscores));
        // display highscores by execute displayHighscores function.
        displayHighscores();
    }
  }
  // function for clear the highscore
  function clearHighscore() {
    // clear the localstorage
    localStorage.clear();
    // clear the score list
    scoreList.innerHTML = "";
  }
  // function for viewhighscore
  function viewhighscore() {
    // hide the startscreen and execute the displayHighscore function
    startscreen.style.display = "none";
    displayHighscores();
  }

  function startagain() {
    // reload the page
    location.reload();
  }

// when click the start button, startQuiz function execute. 
startbutton.addEventListener("click", startQuiz);
// when click the submit button, saveHighscore function execute.
submitInitialButton.addEventListener("click", saveHighscore);
// when click the clear highscore button, clearHighscore function execute.
clear.addEventListener("click", clearHighscore);
// when click the viewHighscore button, viewhighscore function execute.
viewHighscore.addEventListener("click", viewhighscore);
// when click the start again button, startagain function execute.
startAgain.addEventListener("click", startagain)