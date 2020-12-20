const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const scale = 12;

const rows = canvas.height / scale;
const columns = canvas.width / scale;

let game;
let snake;
let score = 0;
let speed = 70;
var players = [];

let prevItem = document.getElementById("restart-btn");
let newItem = document.createElement("span");
newItem.setAttribute("id", "score");
newItem.innerHTML = `${score * 100} points`;
prevItem.parentNode.insertBefore(newItem, prevItem.nextSibling); // insert after
// newItem.parentNode.insertBefore(newItem, prevItem); // insert before

// close modal
function closeModal(modal_id) {
  // if (modal_id === "scoreboard-modal") {
  //   console.log("exit");
  // }
  document.getElementById(modal_id).style.transform = "translateY(-100vh)";
  document.getElementById(modal_id).style.transitionTimingFunction = "ease";
  document.getElementById(modal_id).style.transition = "transform 0.5s";
  document.getElementById("shadow").style.zIndex = -1;
  document.getElementById("shadow").style.background = "transparent";
}

// modal cancel button
function cancelForm(e) {
  e.preventDefault();
  closeModal("gameover-modal");
  // document.getElementById("gameover-modal").style.visibility = "hidden";
}
document.getElementById("editBtn").addEventListener("click", cancelForm);

// modal submit button
const onSubmitForm = async (e) => {
  e.preventDefault();
  const nameEntry = document.getElementById("name-entry");

  const body = {
    player_name: `${nameEntry.value}`,
    player_score: `${score * 100}`,
  };

  try {
    const response = await fetch("/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    closeModal("gameover-modal");
    console.log(response);
    window.location = "/";
  } catch (error) {
    console.error(error.message);
  }
};
document.getElementById("name-form").addEventListener("submit", onSubmitForm);

document.getElementById("exit-Btn").addEventListener("click", function () {
  closeModal("scoreboard-modal");
});
const topScores = document.getElementById("top-scores");

try {
  const response = await fetch("/scores");
  const jsonData = await response.json();
  console.log(jsonData);
  players = jsonData;
  // topScores.innerText = jsonData;
  // topScores.innerHTML();
  let prevPlayer = document.getElementById("top-scores");
  for (let i = 0; i < jsonData.length; i++) {
    let newPlayer = document.createElement("div");
    newPlayer.setAttribute("class", "players");
    newPlayer.innerHTML = `<span id="player-name">${jsonData[i].player_name}</span>&nbsp;<span id="player_score">${jsonData[i].player_score}</span><hr />`;
    prevPlayer.parentNode.insertBefore(newPlayer, prevPlayer.nextSibling); // insert after
  }
} catch (err) {
  console.error(err.message);
}

// modal submit button
const handleScoreboard = () => {
  // e.preventDefault();

  document.getElementById("shadow").style.background = "black";
  document.getElementById("shadow").style.opacity = 0.5;
  document.getElementById("shadow").style.zIndex = 1;
  document.getElementById("scoreboard-modal").style.zIndex = "visible";
  document.getElementById("scoreboard-modal").style.visibility = "visible";
  document.getElementById("scoreboard-modal").style.transform = "translateY(0)";

  // console.log("open scoreboard");YYY

  // window.location = "/";

  // const body = {
  //   player_name: `${nameEntry.value}`,
  //   player_score: `${score * 100}`,
  // };

  // try {
  //   const response = await fetch("/scores", {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(body),
  //   });
  //   closeModal();
  //   console.log(response);
  //   window.location = "/";
  // } catch (error) {
  //   console.error(error.message);
  // }
};

document
  .getElementById("scoreboard")
  .addEventListener("click", handleScoreboard);

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
