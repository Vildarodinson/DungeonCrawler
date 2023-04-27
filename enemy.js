class Enemy {
    constructor(x, y, speed, size) {
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.size = size;
    }

    // Draw the enemy on the canvas
    draw() {
      ctx.fillStyle = 'blue';
      ctx.fillRect(this.x, this.y, this.size, this.size);
    }
  }