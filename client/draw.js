const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const scale = 10;

const rows = canvas.height / scale;
const columns = canvas.width / scale;

let game;
let snake;
let score = 0;
let speed = 90;

let prevItem = document.getElementById("restart-btn");
let newItem = document.createElement("span");
newItem.setAttribute("id", "scoreboard");
newItem.innerHTML = `${score * 100} points`;
prevItem.parentNode.insertBefore(newItem, prevItem.nextSibling); // insert after
// newItem.parentNode.insertBefore(newItem, prevItem); // insert before

// close modal
function closeModal() {
  document.getElementById("gameover-modal").style.transform =
    "translateY(-100vh)";
  document.getElementById("gameover-modal").style.transitionTimingFunction =
    "ease";
  document.getElementById("gameover-modal").style.transition = "transform 0.5s";
  document.getElementById("shadow").style.zIndex = -1;
  document.getElementById("shadow").style.background = "transparent";
}

// modal cancel button
function cancelForm(e) {
  e.preventDefault();
  closeModal();
  // document.getElementById("gameover-modal").style.visibility = "hidden";
}
document.getElementById("editBtn").addEventListener("click", cancelForm);

// modal submit button
const onSubmitForm = (e) => {
  e.preventDefault();
  const nameEntry = document.getElementById("name-entry");

  const body = {
    player_name: `${nameEntry.value}`,
    player_score: `${score * 100}`,
  };

  try {
    const response = fetch("http://localhost:5000/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    closeModal();
    console.log(response);
    // window.location = "/client/index.html";
  } catch (error) {
    console.error(error.message);
  }
};
document.getElementById("name-form").addEventListener("submit", onSubmitForm);

function setup() {
  snake = new Snake();
  fruit = new Fruit();

  fruit.pickLocation();

  function refresh() {
    if (!snake.gameOver()) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    fruit.drawFruit();

    snake.update(); // gameova could cause a problem

    snake.drawSnake();

    ctx.fillStyle = "orange";
    ctx.fillRect(
      canvas.width / 2 - scale,
      canvas.height / 2 - scale,
      scale * 2,
      scale * 2
    );

    if (snake.gameova) {
      clearInterval(game);
      console.log("GAME OVER");
      document.getElementById("shadow").style.background = "black";
      document.getElementById("shadow").style.opacity = 0.5;
      document.getElementById("shadow").style.zIndex = 1;
      let finalScore = document.getElementById("final-score");
      finalScore.innerText = `${score * 100} points`;
      document.getElementById("gameover-modal").style.zIndex = "visible";
      document.getElementById("gameover-modal").style.visibility = "visible";
      document.getElementById("gameover-modal").style.transform =
        "translateY(0)";
    }

    if (snake.eat(fruit)) {
      snake.snakeLength++;
      score++;
      newItem.innerHTML = `${score * 100} points`;
      // console.log(score);
      fruit.color++;
      fruit.pickLocation();
      fruit.drawFruit();
      //
      if (score >= 1000 && score < 2000) {
        // still not working
        updateSpeed();
      }
    }
  }

  function updateSpeed() {
    speed -= 70;
  }

  function resetter() {
    clearInterval(game);
    // updateSpeed();
    game = setInterval(refresh, speed); // prev: 120, 80, 90
  }

  resetter();
}
setup();

window.addEventListener("keydown", (e) => {
  const direction = e.key.replace("Arrow", "");
  snake.changeDirection(direction);
});

let restart = document.getElementById("restart-btn");
restart.addEventListener("click", location.reload.bind(location));
