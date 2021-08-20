//Scoring Aspect
function printHighScores() {
var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

// How to get the scores in proper order
highscores.sort(function(a, b) {
    return b.score - a.score;
});

// Come back to this and make sure it is correct 
highscores.forEach(function(score) {
    var liTag = document.createElement("li");
    liTag.textContent = score.initials + " - " + score.score;

// show it on the page
    var olEl = document.getElementById("highscores");
    olEl.appendChild(liTag);
    });
}

function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}

document.getElementById("clear").onclick = clearHighscores;

//run function when the page loads
printHighScores();