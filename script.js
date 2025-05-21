const game = document.getElementById('game');
const bird = document.getElementById('bird');
const scoreDisplay = document.getElementById('score-display');
const gameOverSection = document.getElementById('game-over');
const finalScoreInput = document.getElementById('final-score');
const statusInput = document.getElementById('status-input');

let birdLeft = 180;
let birdSpeed = 20;
let isGameOver = false;
let score = 0;
let scoreInterval;
let obstacleInterval;

// Move bird left/right
document.addEventListener('keydown', (e) => {
  if (isGameOver) return;
  if (e.key === 'ArrowLeft' && birdLeft > 0) {
    birdLeft -= birdSpeed;
    bird.style.left = birdLeft + 'px';
  } else if (e.key === 'ArrowRight' && birdLeft < 360) {
    birdLeft += birdSpeed;
    bird.style.left = birdLeft + 'px';
  }
});

// Create obstacles
function createObstacle() {
  if (isGameOver) return;

  const obstacle = document.createElement('div');
  obstacle.classList.add('obstacle');
  let obstacleLeft = Math.floor(Math.random() * 360);
  let obstacleTop = 0;
  obstacle.style.left = obstacleLeft + 'px';
  game.appendChild(obstacle);

  function moveObstacle() {
    if (isGameOver) return;
    obstacleTop += 4;
    obstacle.style.top = obstacleTop + 'px';

    if (obstacleTop > 600) {
      obstacle.remove();
    }

    // Collision detection
    if (
      obstacleTop + 40 >= 560 &&
      birdLeft < obstacleLeft + 40 &&
      birdLeft + 40 > obstacleLeft
    ) {
      endGame();
    } else {
      requestAnimationFrame(moveObstacle);
    }
  }

  requestAnimationFrame(moveObstacle);
}

// Start game
function startGame() {
  isGameOver = false;
  score = 0;
  birdLeft = 180;
  bird.style.left = birdLeft + 'px';
  scoreDisplay.textContent = "Score: 0";
  gameOverSection.hidden = true;

  obstacleInterval = setInterval(() => {
    if (!isGameOver) createObstacle();
  }, 1000);

  scoreInterval = setInterval(() => {
    if (!isGameOver) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
    }
  }, 500);
}

// Game over
function endGame() {
  isGameOver = true;
  clearInterval(obstacleInterval);
  clearInterval(scoreInterval);

  alert("Game Over! You hit an obstacle.");
  alert("Try Again?");

  gameOverSection.hidden = false;
  statusInput.value = "Game Over! You hit an obstacle.";
  finalScoreInput.value = score;

  document.querySelectorAll('.obstacle').forEach(el => el.remove());
}

startGame();