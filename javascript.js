// Javascript
// Different Variable that we know are there

var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEL = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

// Quiz variables
var currentQuestionIndex = 0;
var time = questions.length * 10;
var timerId;

//function to start the quiz
function startQuiz() {
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");

    //unhide questions section
    questionsEl.removeAttribute("class");

    //Start Timer Section
    timerID = setInterval(clockTick, 1000);

    //Show starting Time
    timerEl.textContent = time;

    getQuestion();
}

    function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex]; 

    // Converts title to question
    var titleEl = document.getElementById("question-title")
    titleEl.textContent = currentQuestion.title;

    //Clear out old questions so they are not asked again
    choicesEl.innerHTML = "";

    // Create a loop
    currentQuestion.choices.forEach(function(choice, i) {
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute ("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    choiceNode.onclick = questionClick;

    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
    // if the user guessed wrong...
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -=10;

        if (time < 0) {
            time = 0;
        }

        // New Timer on Page
        timerEl.textContent = time;
        feedbackEl.textContent = "This is Incorrect";
        feedbackEl.style.fontSize = "150%";
    } else {
        feedbackEl.textContent = "This is Correct";
        feedbackEl.style.fontSize = "150%";
    }

    // Flashing the correct answer
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);

    // Next Question after the flash
    currentQuestionIndex++;

    //Time Checker to make sure the time does not run out
    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

// End Quiz and stop timer
function quizEnd() {
    clearInterval(timerId);

//End screen page
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");

//Final Score 
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textcontent = time;

// Questions Section
    questionsEl.setAttribute("class", "hide");
}

//Timer countdown
function clockTick() {
    time--;
    timerEl.textContent = time;

// When the timer runs out
    if (time <=0) {
        quizEnd();
    }
}

function saveHighScore() {
    var initials = initialsEl.value.trim();


if (initials !== "") {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];


// new score if to try again
    var newScore = {
        score: time,
        initials: initials
};

//save to the webpage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    //this makes it go to that page for the scoring page
    window.location.href = "score.html";
  }
}

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighScore();
    }
}

// submit initials
submitBtn.onclick = saveHighscore;

// start Quiz button
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;