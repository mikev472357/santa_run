var character = document.getElementById("character");
var block = document.getElementById("block");
var scoreDisplay = document.getElementById("score");
var instructionsModal = document.getElementById("instructionsModal");
var closeModalButton = document.getElementById("closeModalButton");
var checkDead;

var score = 0;
var highScore = 0;

// Show instructions modal on page load
window.onload = function () {
  instructionsModal.style.display = "block";
  console.log("Instructions modal displayed");
};

// Close instructions modal and start the game
function closeInstructions() {
  instructionsModal.style.display = "none";
  startGame();
}

// Handle the click event on the "Close Instructions" button
closeModalButton.addEventListener("click", function () {
  instructionsModal.style.display = "none";
  startGame(); // Start the game when closing the modal
});

// Your existing game logic
function startGame() {
  console.log("Start game function called");

  // Store the previous score as a number
  highScore = parseInt(localStorage.getItem("highScore")) || 0;
  console.log("High Score:", highScore);

  // Reset game state
  resetGame();
  console.log("Game state reset");

  if (!checkDead) {
    console.log("Game started");

    // Start the game loop
    checkDead = setInterval(function () {
      var characterTop = parseInt(
        window.getComputedStyle(character).getPropertyValue("top")
      );
      var blockLeft = parseInt(
        window.getComputedStyle(block).getPropertyValue("left")
      );

      if (blockLeft < 20 && blockLeft > 0 && characterTop >= 130) {
        block.style.animation = "none";
        block.style.display = "none";
        alert(
          "You have failed to deliver presents to all the children for Christmas"
        );

        // Restart the game after the alert
        resetGame();
      }

      // Update the score when the character passes the block
      if (blockLeft < 0 && blockLeft > -20) {
        score++;
        scoreDisplay.textContent = "Score: " + score;
      }
    }, 10);

    // Rest of your game logic...
  }
}

// Reset the game state
function resetGame() {
  clearInterval(checkDead);
  checkDead = null;
  setTimeout(function () {
    scoreDisplay.textContent =
      "Score: " + score + " | High Score: " + highScore; // Display the scores
  }, 0);
  console.log("Displayed High Score:", highScore);
  score = 0;
  character.style.top = "150px";
  character.classList.remove("animate");
  block.style.left = "480px";
  block.style.animation = "block 1s infinite linear";
  block.style.display = "block";
  startGameLoop();

  // Save the previous score immediately upon resetting the game
  saveHighScore();
  console.log("High Score saved:", highScore);
}

// Function to start the game loop
function startGameLoop() {
  checkDead = setInterval(function () {
    var characterTop = parseInt(
      window.getComputedStyle(character).getPropertyValue("top")
    );
    var blockLeft = parseInt(
      window.getComputedStyle(block).getPropertyValue("left")
    );

    if (blockLeft < 20 && blockLeft > 0 && characterTop >= 130) {
      if (score > highScore) {
        highScore = score;
      }
      block.style.animation = "none";
      block.style.display = "none";
      alert(
        "You have failed to deliver presents to all the children for Christmas"
      );

      // Restart the game after the alert
      resetGame();
    } else if (blockLeft < 0 && blockLeft > -20) {
      score += 2;
      scoreDisplay.textContent =
        "Score: " + score + " | High Score: " + highScore;
    } else if (blockLeft < -1000000000000000) {
      alert(
        "Congratulations! You have successfully delivered presents to all the children for Christmas"
      );

      // Restart the game after the alert
      resetGame();
    }
  }, 10);
}

function jump() {
  if (character.classList != "animate") {
    character.classList.add("animate");
  }
  setTimeout(function () {
    character.classList.remove("animate");
  }, 500);
}

// Handle clicks on the body
function handleClick() {
  jump();
}

// Save the high score to local storage
function saveHighScore() {
  localStorage.setItem("highScore", highScore);
}

// Add a listener to save the high score when the window is closed or refreshed
window.addEventListener("beforeunload", saveHighScore);
