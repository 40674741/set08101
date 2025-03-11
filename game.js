let randomNumber;
let attemptsLeft;
let gameOver = false;
let bestRecord = localStorage.getItem('bestRecord') ? parseInt(localStorage.getItem('bestRecord')) : null;

function startGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attemptsLeft = 10;
    gameOver = false;
    document.getElementById("message").textContent = "";
    document.getElementById("attempts").textContent = "Attempts left: " + attemptsLeft;
    document.getElementById("guess").disabled = false;
    document.getElementById("submit").style.display = "inline-block";
    document.getElementById("restart").classList.add("hidden");

    // Display best record if it exists
    if (bestRecord !== null) {
        document.getElementById("record").textContent = `Best Record: ${bestRecord} guesses`;
    } else {
        document.getElementById("record").textContent = `Best Record: --`;
    }
}

function checkGuess() {
    if (gameOver) return;

    let userGuess = parseInt(document.getElementById("guess").value);
    let message = document.getElementById("message");
    let attemptsText = document.getElementById("attempts");

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        message.textContent = "Please enter a valid number between 1 and 100.";
        message.style.color = "red";
        return;
    }

    if (attemptsLeft > 0) {
        attemptsLeft--;
        attemptsText.textContent = "Attempts left: " + attemptsLeft;
    }

    if (userGuess < randomNumber) {
        message.textContent = "Too low! Try again.";
        message.style.color = "blue";
    } else if (userGuess > randomNumber) {
        message.textContent = "Too high! Try again.";
        message.style.color = "orange";
    } else {
        message.textContent = "Correct! You guessed it!";
        message.style.color = "green";
        updateRecord(10 - attemptsLeft); // Save score when user wins
        endGame();
        return;
    }

    if (attemptsLeft === 0) {
        message.textContent = "Game Over! The correct number was " + randomNumber + ".";
        message.style.color = "red";
        endGame();
    }
}

function updateRecord(currentScore) {
    if (bestRecord === null || currentScore < bestRecord) {
        bestRecord = currentScore;
        localStorage.setItem('bestRecord', bestRecord);
        document.getElementById("record").textContent = `Best Record: ${bestRecord} guesses`;
        alert(`New record! You guessed it in ${currentScore} tries!`);
    }
}

function endGame() {
    gameOver = true;
    document.getElementById("guess").disabled = true;
    document.getElementById("submit").style.display = "none"; // Hide the submit button
    document.getElementById("restart").classList.remove("hidden");
}

function restartGame() {
    startGame();
    document.getElementById("guess").value = "";
}

// Start the game when the page loads
document.addEventListener("DOMContentLoaded", startGame);
