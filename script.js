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
const highscoreList = document.querySelector("#highscore-container ul");
const goBackButton = document.getElementById("go-back");
const answer = document.getElementById("answer");

// Variable for question index, score and timer.
let questionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;