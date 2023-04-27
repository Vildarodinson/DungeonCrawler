const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let playerX = 50;
let playerY = 50;

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

let score = 0;

document.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowLeft':
      if (playerX - 10 >= 0) {
        playerX -= 10;
      }
      break;
    case 'ArrowRight':
      if (playerX + 110 <= canvas.width) {
        playerX += 10;
      }
      break;
    case 'ArrowUp':
      if (playerY - 10 >= 0) {
        playerY -= 10;
      }
      break;
    case 'ArrowDown':
      if (playerY + 110 <= canvas.height) {
        playerY += 10;
      }
      break;
  }
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'red';
  ctx.fillRect(playerX, playerY, 100, 100);

  for (let i = 0; i < enemies.length; i++) {
    enemies[i].draw();

    let enemy = enemies[i];

    if (playerX + 100 > enemy.x &&
        playerX < enemy.x + enemy.size &&
        playerY + 100 > enemy.y &&
        playerY < enemy.y + enemy.size) {
      alert('Game over!');
      location.reload();
    }

    if (playerX < 0 || playerX + 100 > canvas.width || playerY < 0 || playerY + 100 > canvas.height) {
      // Player hit the border, don't update the enemy's position
    } else {
      enemy.x -= enemy.speed;
      if (enemy.x < -enemy.size) {
        enemies.splice(i, 1);
        i--;

        score++;
        if (score > localStorage.getItem('highScore')) {
          localStorage.setItem('highScore', score);
        }
      }
    }
  }

  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(`Score: ${score}`, 10, 50);
  ctx.fillText(`High Score: ${localStorage.getItem('highScore')}`, 10, 90);

  requestAnimationFrame(gameLoop);
}

gameLoop();
