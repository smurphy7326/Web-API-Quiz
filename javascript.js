// Javascript
// Different Variable that we know are there

var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

// quiz state variables
var currentQuestionIndex = 0;
var gametime = 10 * 15;
var timerId;

//function to start the quiz
function startQuiz() {
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");

    //unhide questions section
    questionsEl.removeAttribute("class");

    //Start Timer Section
    timerId = setInterval(clockTick, 1000);

    //Show starting Time
    timerEl.textContent = gametime;

    getQuestion();
}

    function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex]; 

    // Converts title to question
    var titleEl = document.getElementById("question-title");
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
        gametime -=10;

        if (gametime < 0) {
            gametime = 0;
        }

        // New Timer on Page
        timerEl.textContent = gametime;
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

// Questions Section
    questionsEl.setAttribute("class", "hide");
}

//Timer countdown
function clockTick() {
    gametime--;
    timerEl.textContent = gametime;

//Final Score 
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textcontent = gametime;

// When the timer runs out
    if (gametime <=0) {
        quizEnd();
    }
}

function saveHighScore() {
    var initials = initialsEl.value.trim();

// Saved Stores to see 
if (initials !== "") {
    var highscores = 
        JSON.parse(window.localStorage.getItem("highscores")) || [];


// new score if to try again
    var newScore = {
        score: gametime,
        initials: initials
};

  // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    //this makes it go to that page for the scoring page
    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighScore();
    }
}

// submit initials
submitBtn.onclick = saveHighScore;

// start Quiz button
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;