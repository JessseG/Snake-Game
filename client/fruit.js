function Fruit() {
  this.x;
  this.y;
  this.color = 0;
  this.toggle = false;

  this.pickLocation = function () {
    this.x = (Math.floor(Math.random() * columns - 1) + 1) * scale;
    this.y = (Math.floor(Math.random() * rows - 1) + 1) * scale;
    // console.log("x: " + this.x + " y: " + this.y);
    if (
      canvas.width / 2 - scale * 2 < this.x &&
      this.x < canvas.width / 2 + scale &&
      canvas.height / 2 - scale * 2 < this.y &&
      this.y < canvas.height / 2 + scale
    ) {
      this.pickLocation();
    }
    this.toggle = !this.toggle;
    this.color %= 7;
    // console.log(this.color);
  };

  // ctx.fillRect(
  //   canvas.width / 2 - scale,
  //   canvas.height / 2 - scale,
  //   scale * 2,
  //   scale * 2
  // );

  this.drawFruit = function () {
    ctx.beginPath();

    switch (this.color) {
      case 0:
        ctx.fillStyle = "crimson";
        break;
      case 1:
        ctx.fillStyle = "limegreen";
        break;
      case 2:
        ctx.fillStyle = "royalblue";
        break;
      case 3:
        ctx.fillStyle = "darkorchid";
        break;
      case 4:
        ctx.fillStyle = "yellow";
        break;
      case 5:
        ctx.fillStyle = "fuchsia";
        break;
      case 6:
        ctx.fillStyle = "blue";
        break;
    }

    // // stroke colors Levels 50+
    // if (this.toggle) {
    //   ctx.fillStyle = "orangered";
    // } else if (!this.toggle) {
    //   ctx.fillStyle = "green";
    // }

    // this.toggle = !this.toggle;
    // ctx.fillRect(this.x, this.y, scale, scale);
    ctx.arc(
      this.x + scale / 2,
      this.y + scale / 2,
      scale / 1.8,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.lineWidth = 0.8;
    ctx.stroke();
  };
}
