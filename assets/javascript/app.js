// Variables

// Variables for Score.
var score = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;
var unansweredQuestions = 0;
var questionCount = 0;

// Timer Variables
var timeLeft = 30;
var intervalID;

// Trivia questions array.
var triviaQuestions = [
    { q: "What is the capital of Italy?", a: "Rome", b: "Madrid", c: "London", d: "Paris"},
    { q: "Which European country also has direct control of land on mainland South America?", a: "France", b: "Spain", c: "Portugal", d: "United Kingdom"}
];

// Variables for advancing question selector.
var triviaIndex = 0;
var questionIndex = "";
var answerIndex = [];

// Game State Variables
var gameRunning = false;
var questionPage = false;

// Functions

// Game Reset Function for initial game start and for resetting the game with the restart button.
function gameReset() {
    score = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    unansweredQuestions = 0;
    questionCount = 0;
    triviaIndex = 0;
    questionIndex = "";
    answerIndex = [];
    gameRunning = true;
    questionPage = true;
};

// Question selector to run on loading of the question page.
function questionSelector() {
    
    // Selecting questions and writing them into question field
    questionIndex = triviaQuestions[triviaIndex].q;
    console.log("Current Question: " + questionIndex);
    $("#question-text").html(questionIndex);

    // Selecting corresponding answers and writing them into answer fields.
    answerIndex = [triviaQuestions[triviaIndex].a, triviaQuestions[triviaIndex].b, triviaQuestions[triviaIndex].c, triviaQuestions[triviaIndex].d];
    console.log("Current Answers: " + answerIndex);
    for (i = 0; i < 4; i++) {
        $("#answerOptions-text").append(answerIndex[i] + "<br>");
    }

}

// Page timer function
// function pageTime() {
//     if (gameRunning = true) {
//         if (questionPage = true) {
//             setTimeout(toAnswerPage, 1000 * 5)
//         } else {
//             setTimeout(toQuestionPage, 1000 * 5)
//         }
//     }
// }

// Timer Function
function countdownTimer() {
    timeLeft--;
    $("#timer-text").text(timeLeft);
    console.log(timeLeft)
    if (timeLeft === 0) {
        gameChangePage();
    }
}

// Change Page Function 
function gameChangePage() {
    if (questionPage === false) {
        toQuestionPage();
        questionPage = true;
        console.log(questionPage);
    } 
    
    else {
        unansweredQuestions++;
        questionCount++;
        console.log("Unanswered Questions: " + unansweredQuestions);
        toAnswerPage();
        questionPage = false;
        console.log(questionPage);
    }
}

// Function to change to question page
function toQuestionPage() {
    questionSelector();
    timeLeft = 5;
    // pageTime();
    // countdownTimer();
    clearInterval(intervalID);
    intervalID = setInterval (countdownTimer, 1000);
}

function toAnswerPage() {
    triviaIndex++;
    timeLeft = 5;
    // pageTime();
    // countdownTimer();
    clearInterval(intervalID);
    intervalID = setInterval (countdownTimer, 1000);
}

// Game Processes

// Document Ready Function to run on page load.
$(document).ready(function(){

    gameReset();
    // questionSelector();
    toQuestionPage();
    // pageTime();
});
