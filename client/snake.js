function Snake() {
  this.x = 0;
  this.y = 0;
  this.dx = scale * 1;
  this.dy = 0;
  this.snakeLength = -1;
  this.tail = [];
  this.crossingX = false;
  this.crossingY = false;
  this.gameova = false;

  // updates snake coordinates
  this.update = function () {
    for (let i = 0; i < this.tail.length - 1; i++) {
      // console.log(this.tail.length);
      this.tail[i] = this.tail[i + 1];
    }

    // adds coordinates of each snake part to tail array
    this.tail[this.snakeLength] = {
      x: this.x + scale / 2,
      y: this.y + scale / 2,
    };

    if (
      canvas.width / 2 - scale * 2 < this.x + this.dx &&
      this.x < canvas.width / 2 + scale &&
      canvas.height / 2 - scale * 2 < this.y &&
      this.y < canvas.height / 2 + scale
    ) {
      // console.log("x: " + this.x + " y: " + this.y);
      this.gameova = true;
    } else {
      this.x += this.dx;
      this.y += this.dy;

      if (this.x >= canvas.width) {
        this.x = 0;
      }
      if (this.x < 0) {
        this.x = canvas.width;
      }
      if (this.y >= canvas.height) {
        this.y = 0;
      }
      if (this.y < 0) {
        this.y = canvas.height;
      }
    }
  };

  // detects game over scenarios
  this.gameOver = function () {
    // from left
    if (
      canvas.width / 2 - scale * 3 < this.x &&
      this.dx > 0 &&
      this.x < canvas.width / 2 + scale &&
      canvas.height / 2 - scale * 2 < this.y &&
      this.y < canvas.height / 2 + scale
    ) {
      console.log("x: " + this.x + " y: " + this.y);
      return true;
    }
    // from right
    if (
      canvas.width / 2 - scale * 3 < this.x &&
      this.x < canvas.width / 2 + scale * 2 &&
      this.dx < 0 && // from right
      canvas.height / 2 - scale * 2 < this.y &&
      this.y < canvas.height / 2 + scale
    ) {
      console.log("x: " + this.x + " y: " + this.y);
      return true;
    }
    // from top
    if (
      canvas.width / 2 - scale * 2 < this.x &&
      this.x < canvas.width / 2 + scale &&
      canvas.height / 2 - scale * 3 < this.y &&
      this.y < canvas.height / 2 + scale &&
      this.dy > 0
    ) {
      console.log("x: " + this.x + " y: " + this.y);
      return true;
    }
    // from bottom
    if (
      canvas.width / 2 - scale * 2 < this.x &&
      this.x < canvas.width / 2 + scale &&
      canvas.height / 2 - scale * 3 < this.y &&
      this.y < canvas.height / 2 + scale * 2 &&
      this.dy < 0
    ) {
      console.log("x: " + this.x + " y: " + this.y);
      return true;
    }

    for (let i = 0; i < this.tail.length; i++) {
      // FIX this condition
      if (
        this.x + scale / 2 == this.tail[i].x &&
        this.y + scale / 2 == this.tail[i].y
      ) {
        this.gameova = true;
        return true;
      }
    }
    return false;
  };

  // draws snake with new coordinates
  this.drawSnake = function () {
    for (let i = 0; i < this.tail.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = "aqua";
      ctx.arc(this.tail[i].x, this.tail[i].y, scale / 3, 0, Math.PI * 2);
      ctx.fill();

      if (this.tail[i - 2] != null) {
        if (!(Math.abs(this.tail[i].x - this.tail[i - 1].x) > scale * 28)) {
          if (
            !(
              (this.tail[i].y + this.tail[i - 1].y) / 2 <
                canvas.height * 0.53 &&
              canvas.height * 0.47 < (this.tail[i].y + this.tail[i - 1].y) / 2
            )
          ) {
            // extra ball
            ctx.arc(
              (this.tail[i].x + this.tail[i - 1].x) / 2,
              (this.tail[i].y + this.tail[i - 1].y) / 2,
              scale / 3,
              0,
              Math.PI * 2
            );
            ctx.fillStyle = "aqua";
            ctx.fill();
          }
        }
      }
    }

    for (let i = 0; i < this.tail.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = "aqua";
      ctx.arc(this.tail[i].x, this.tail[i].y, scale / 3, 0, Math.PI * 2);
      ctx.fill();

      if (this.tail[i - 2] != null) {
        if (!(Math.abs(this.tail[i].y - this.tail[i - 1].y) > scale * 28)) {
          if (
            !(
              (this.tail[i].x + this.tail[i - 1].x) / 2 < canvas.width * 0.53 &&
              canvas.width * 0.47 < (this.tail[i].x + this.tail[i - 1].x) / 2
            )
          ) {
            // extra ball
            ctx.arc(
              (this.tail[i].x + this.tail[i - 1].x) / 2,
              (this.tail[i].y + this.tail[i - 1].y) / 2,
              scale / 3,
              0,
              Math.PI * 2
            );
            ctx.fillStyle = "aqua";
            ctx.fill();
          }
        }
      }
    }

    let i = 0;
    ctx.beginPath();
    ctx.fillStyle = "aqua";
    ctx.arc(
      this.x + scale / 2,
      this.y + scale / 2,
      scale / 1.8,
      0,
      Math.PI * 2
    );

    ctx.fill();
    ctx.lineWidth = 1;
    ctx.stroke();
    // ctx.fillRect(this.x, this.y, scale, scale);
  };

  // change direction
  this.changeDirection = function (direction) {
    if (this.tail.length > 0) {
      if (direction == "Up" && !(this.dy > 0)) {
        this.dx = 0;
        this.dy = scale / -1;
      } else if (direction == "Down" && !(this.dy < 0)) {
        this.dx = 0;
        this.dy = scale / 1;
      } else if (direction == "Right" && !(this.dx < 0)) {
        this.dx = scale / 1;
        this.dy = 0;
      } else if (direction == "Left" && !(this.dx > 0)) {
        this.dx = scale / -1;
        this.dy = 0;
      }
    } //
    else if (this.tail.length == 0) {
      if (direction == "Up") {
        this.dx = 0;
        this.dy = scale / -1;
      } else if (direction == "Down") {
        this.dx = 0;
        this.dy = scale / 1;
      } else if (direction == "Right") {
        this.dx = scale / 1;
        this.dy = 0;
      } else if (direction == "Left") {
        this.dx = scale / -1;
        this.dy = 0;
      }
    }
  };

  this.eat = function (fruit) {
    if (this.x === fruit.x && this.y === fruit.y) {
      return true;
    }
    return false;
  };
}
