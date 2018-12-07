// Variables
// ========================================================

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
    { q: "What is the capital of Italy?", answers: [{a: "Rome", c: "correct"}, {a: "Madrid", c: "incorrect"}, {a: "London", c: "incorrect"}, {a: "Paris", c: "incorrect"}]},
    { q: "Which European country also has direct control of land on mainland South America?", answers: [{a: "Spain", c: "incorrect"}, {a: "Portugal", c: "incorrect"}, {a: "France", c: "correct"}, {a: "Netherlands", c: "incorrect"}]}
];

// Variables for advancing question selector.
var triviaIndex = 0;
var questionIndex = "";
var answerIndex = [];

// Game State Variables
var gameRunning = false;
var questionPage = false;


// Functions
// ==========================================================

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
    $(".answerOptions").empty();
    questionIndex = triviaQuestions[triviaIndex].q;
    console.log("Current Question: " + questionIndex);
    $("#question-text").html(questionIndex);

    // Selecting corresponding answers and writing them into answer fields.
    answerIndex = [triviaQuestions[triviaIndex].answers[0].a, triviaQuestions[triviaIndex].answers[1].a, triviaQuestions[triviaIndex].answers[2].a, triviaQuestions[triviaIndex].answers[3].a];
    answerCheck = [triviaQuestions[triviaIndex].answers[0].c, triviaQuestions[triviaIndex].answers[1].c, triviaQuestions[triviaIndex].answers[2].c, triviaQuestions[triviaIndex].answers[3].c];
    console.log("Current Options: " + answerIndex);
    for (i = 0; i < 4; i++) {
        // $(".answerOptions-text").append(answerIndex[i] + "<br>");
        var answerButton = $("<button>");
        answerButton.addClass("answerButton");
        answerButton.attr("answer-value", answerCheck[i]);
        answerButton.text(answerIndex[i]);
        $(".answerOptions").append(answerButton);
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
    // console.log(timeLeft)
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
    timeLeft = 30;
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
// ==========================================================

// Document Ready Function to run on page load.
$(document).ready(function(){

    $(document).on("click", ".answerButton", function() {
        // console.log($(this).attr("answer-value"));
        var answerGiven = ($(this).attr("answer-value"));
        console.log(answerGiven);

        if (answerGiven === "correct") {
            correctAnswers++;
            console.log("Correct Answers " + correctAnswers);
            toAnswerPage();
            questionPage = false;
        } 
        
        else {
            incorrectAnswers++;
            console.log("Incorrect Answers " + incorrectAnswers);
            toAnswerPage();
            questionPage = false;
        }
    })

    gameReset();
    // questionSelector();
    toQuestionPage();
    // pageTime();
});
