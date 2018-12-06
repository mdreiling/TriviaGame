// Variables

var score = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;
var unansweredQuestions = 0;

var triviaQuestions = [
    { q: "What is the capital of Italy?", a: "Rome", b: "Madrid", c: "London", d: "Paris"},
    { q: "Which European country also has direct control of land on mainland South America?", a: "France", b: "Spain", c: "Portugal", d: "United Kingdom"}
];

var triviaIndex = 0;
var questionIndex = "";
var answerIndex = [];

// Functions

function gameReset() {
    score = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    unansweredQuestions = 0;
    triviaIndex = 0;
    questionIndex = "";
    answerIndex = [];
};

function questionSelector() {
    questionIndex = triviaQuestions[triviaIndex].q;
    console.log("Current Question: " + questionIndex);
    answerIndex = [triviaQuestions[triviaIndex].a, triviaQuestions[triviaIndex].b, triviaQuestions[triviaIndex].c, triviaQuestions[triviaIndex].d];
    console.log("Current Answers: " + answerIndex);

}


// Game Processes

// Document Ready Function to run on page load.
$(document).ready(function(){

    gameReset();
    questionSelector();
});
