// Get canvas element and context
const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

let playerX = 50;
let playerY = 50;

// Define a function that generates a random number within a range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let enemies = [];
const ENEMY_SIZE = 50;

function createEnemy() {
  let size = getRandomInt(30, 70);
  let enemy = new Enemy(canvas.width, Math.random() * canvas.height, 5, ENEMY_SIZE);
  enemies.push(enemy);
}

setInterval(createEnemy, 2000);

document.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowLeft':
      playerX -= 10;
      break;
    case 'ArrowRight':
      playerX += 10;
      break;
    case 'ArrowUp':
      playerY -= 10;
      break;
    case 'ArrowDown':
      playerY += 10;
      break;
  }
});

// Start game loop
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update game state
  // ...

  // Draw game objects
  ctx.fillStyle = 'red';
  ctx.fillRect(playerX, playerY, 100, 100);

  for (let i = 0; i < enemies.length; i++) {
    enemies[i].draw();
  }

  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];

    // Check for collision
    if (playerX + 100 > enemy.x &&
      playerX < enemy.x + enemy.size &&
      playerY + 100 > enemy.y &&
      playerY < enemy.y + enemy.size) {
      // Collision detected! End the game.
      alert('Game over!');
      // Reload the page to start a new game
      location.reload();
      }

    // Update enemy position
    enemy.x -= enemy.speed;
    if (enemy.x < -enemy.size) {
      // Enemy has gone off screen, remove it from the array
      enemies.splice(i, 1);
      i--;
    }
  }

  // Schedule the next frame
  requestAnimationFrame(gameLoop);
}

gameLoop();