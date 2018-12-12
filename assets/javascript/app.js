// Variables
// ========================================================

// Variables for Score.
var correctAnswers = 0;
var incorrectAnswers = 0;
var unansweredQuestions = 0;
var questionCount = 0;
var correct = false;

// Timer Variables
var timeLeft = 30;
var intervalID;

// Trivia questions array.
var triviaQuestions = [
    { q: "What is the capital of Italy?", 
        answers: [
            {a: "Madrid", c: "incorrect"}, 
            {a: "Rome", c: "correct"}, 
            {a: "London", c: "incorrect"}, 
            {a: "Paris", c: "incorrect"}]},

    { q: "What is the lowest point on land in the world?", 
        answers: [
            {a: "Death Valley", c: "incorrect"}, 
            {a: "Qattara Depression", c: "incorrect"}, 
            {a: "Dead Sea", c: "correct"}, 
            {a: "Lagunda del Carbon", c: "incorrect"}]},

    { q: "Nine of the top ten highest peaks in the world are in the same mountain range. Which mountain range are they located in?", 
        answers: [
            {a: "Himalayas", c: "correct"}, 
            {a: "Rockies", c: "incorrect"}, 
            {a: "Alps", c: "incorrect"}, 
            {a: "Karakoram", c: "incorrect"}]},

    { q: "Which European country also has direct control of land on mainland South America?", 
        answers: [
            {a: "Spain", c: "incorrect"}, 
            {a: "Portugal", c: "incorrect"}, 
            {a: "France", c: "correct"}, 
            {a: "Netherlands", c: "incorrect"}]},

    { q: "Which country has the closest GDP to Virginia's 383 Billion USD?", 
        answers: [
            {a: "United Arab Emirates", c: "correct"}, 
            {a: "Turkey", c: "incorrect"}, 
            {a: "Sweden", c: "incorrect"}, 
            {a: "Colombia", c: "incorrect"}]},

    { q: "Which country out of the following is the oldest?", 
        answers: [
            {a: "Germany", c: "incorrect"}, 
            {a: "United States", c: "correct"}, 
            {a: "Italy", c: "incorrect"}, 
            {a: "Australia", c: "incorrect"}]},

    { q: "Canada has the longest coastline in the world. Who has the second longest?", 
        answers: [
            {a: "Russia", c: "incorrect"}, 
            {a: "United States", c: "incorrect"}, 
            {a: "Australia", c: "incorrect"}, 
            {a: "Norway", c: "correct"}]},
        
    { q: "Russia and China both have the most borders in the world. How many borders does each country have?", 
        answers: [
            {a: "10", c: "incorrect"}, 
            {a: "12", c: "incorrect"}, 
            {a: "14", c: "correct"}, 
            {a: "15", c: "incorrect"}]},

    { q: "What is the smallest border between two countries?", 
        answers: [
            {a: "Egypt-Palestine", c: "incorrect"}, 
            {a: "Botswana-Zambia", c: "correct"}, 
            {a: "Croatia-Montenegro", c: "incorrect"}, 
            {a: "Armenia-Iran", c: "incorrect"}]},

    { q: "What is the correct spelling of this former Soviet Republic located in Central Asia?", 
        answers: [
            {a: "Kyrygyzstan", c: "incorrect"}, 
            {a: "Kirgyzstan", c: "incorrect"}, 
            {a: "Kyrgyzstan", c: "correct"}, 
            {a: "Kirgikistan", c: "incorrect"}]}
];

var imagesForAnswers = [
    "assets/images/Question01.png", 
    "assets/images/Question02.png", 
    "assets/images/Question03.png", 
    "assets/images/Question04.png", 
    "assets/images/Question05.png", 
    "assets/images/Question06.png", 
    "assets/images/Question07.png", 
    "assets/images/Question08.png", 
    "assets/images/Question09.png", 
    "assets/images/Question10.png"
];

// Variables for advancing question and answer selector.
var triviaIndex = 0;
var questionIndex = "";
var answerIndex = [];
var currentAnswer = "";


// Game State Variables
var gameRunning = false;
var questionPage = false;


// Functions
// ==========================================================

// Start game function.
$("#startButton").on("click", function() {
    gameReset();
})

// Game Reset Function for initial game start and for resetting the game with the restart button.
function gameReset() {
    $("#question-image, #answer-image").hide();
    $(".answerOptions, #question-text").empty();
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
    toQuestionPage();
};

// Question selector to run on loading of the question page.
function questionSelector() {
    
    // Clearing fields from previous page.
    $(".answerOptions, #question-text").empty();

    // Hiding the Welcome/Answer Image and showing the Question text.
    $("#question-image, #answer-image").hide();
    $("#question-text").show();

    // Selecting questions and writing them into question field
    questionIndex = triviaQuestions[triviaIndex].q;

    // console.log("Current Question: " + questionIndex);
    $("#question-text").html("<p>" + questionIndex + "</p>");

    // Selecting corresponding answers and writing them into answer fields.
    answerIndex = [triviaQuestions[triviaIndex].answers[0].a, triviaQuestions[triviaIndex].answers[1].a, triviaQuestions[triviaIndex].answers[2].a, triviaQuestions[triviaIndex].answers[3].a];
    answerCheck = [triviaQuestions[triviaIndex].answers[0].c, triviaQuestions[triviaIndex].answers[1].c, triviaQuestions[triviaIndex].answers[2].c, triviaQuestions[triviaIndex].answers[3].c];
    // console.log("Current Options: " + answerIndex);
    for (i = 0; i < 4; i++) {
        // $(".answerOptions-text").append(answerIndex[i] + "<br>");
        var answerButton = $("<button>");
        answerButton.addClass("answerButton");
        answerButton.attr("answer-value", answerCheck[i]);
        answerButton.text(answerIndex[i]);
        $(".answerOptions").append(answerButton);
    }
    currentAnswer = answerCheck.indexOf("correct");
    // console.log("Index of current answer: " + currentAnswer);
    currentAnswer = answerIndex[currentAnswer];
    // console.log("Text of correct answer: " + currentAnswer);

}

// Timer Function
function countdownTimer() {
    timeLeft--;

    if (questionPage === true) {
        $("#timer-text").html("Time Remaining: " + timeLeft);
    } else {
        $("#timer-text").html("Time Until Next Question: " + timeLeft);
    }
    // console.log(timeLeft)
    if (timeLeft === 0) {
        gameChangePage();
    }
}

// Change Page Function 
function gameChangePage() {
    
    if (questionCount === 10) {
        toEndPage();
    }
    
    else if (questionPage === false) {
        toQuestionPage();
        questionPage = true;
        // console.log(questionPage);
    }  
    
    else {
        unansweredQuestions++;
        console.log("Unanswered Questions: " + unansweredQuestions);
        toAnswerPage();
        questionPage = false;
        // console.log(questionPage);
    }
}

// Function to change to question page
function toQuestionPage() {
    questionSelector();
    timeLeft = 30;
    $("#timer-text").html("Time Remaining: " + timeLeft);
    correct = "";
    clearInterval(intervalID);
    intervalID = setInterval (countdownTimer, 1000);
}

// Function to change to answer page
function toAnswerPage() {
    triviaIndex++;
    timeLeft = 5;
    $("#timer-text").html("Time Until Next Question: " + timeLeft);
    $(".answerOptions, #question-text").empty();
    $("#question-text").hide();
    $("#answer-image").html("<img src=" + imagesForAnswers[questionCount] + " style=' height: 450px; width: 900px;'>");
    $("#answer-image").show();
    if (correct === true) {
        $(".answerOptions").append("Correct! " + currentAnswer + " was the correct answer.")
    } else if (correct === false) {
        $(".answerOptions").append("You are incorrect. " + currentAnswer + " was the correct answer.")
    } else {
        $(".answerOptions").append("You did not make a guess. " + currentAnswer + " was the correct answer.")
    }
    questionCount++;
    console.log("Previous question: #" + questionCount);
    clearInterval(intervalID);
    intervalID = setInterval (countdownTimer, 1000);
}

// Function to change to end page
function toEndPage () {
    clearInterval(intervalID);
    $(".answerOptions, #question-text, #timer-text").empty();
    $(".answerOptions").html("<h4>Your final results:</h4> <p>Correct Answers: " + correctAnswers + "</p><p>Incorrect Answers: " + incorrectAnswers + "</p><p>Unanswered Questions: " + unansweredQuestions)
    var restartButton = $("<button>")
    restartButton.addClass("restartButton")
    restartButton.text("Click here to restart the quiz!")
    $(".answerOptions").append(restartButton);
    $(document).on("click", ".restartButton", function() {
        gameReset();
    });

}


// Game Processes
// ==========================================================

// Document Ready Function to run on page load.
$(document).ready(function(){

    // Click function for answer questions
    $(document).on("click", ".answerButton", function() {
        // console.log($(this).attr("answer-value"));
        var answerGiven = ($(this).attr("answer-value"));
        console.log(answerGiven);

        if (answerGiven === "correct") {
            correctAnswers++;
            correct = true;
            console.log("Correct Answers " + correctAnswers);
            toAnswerPage();
            questionPage = false;
        } 
        
        else {
            incorrectAnswers++;
            correct = false;
            console.log("Incorrect Answers " + incorrectAnswers);
            toAnswerPage();
            questionPage = false;
        }
    })
});
