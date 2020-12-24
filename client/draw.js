const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const scale = 10;

const rows = canvas.height / scale;
const columns = canvas.width / scale;

var game;
let snake;
let score = 0;
var speed = 65; // inverted
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
document.getElementById("cancel-Btn").addEventListener("click", cancelForm);

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
    // console.log(response);
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

var jsonData;

const deleteScore = async (name) => {
  try {
    const deleteScore = await fetch(`/scores/${name}`, {
      method: "DELETE",
    });
    jsonData = jsonData.filter((player) => player.player_name !== name);
  } catch (err) {
    console.log(err.message);
  }
};

(async function loadScoreboard() {
  try {
    const response = await fetch("/scores");
    jsonData = await response.json();
    // console.log(jsonData);
    players = jsonData;
    // topScores.innerText = jsonData;
    // topScores.innerHTML();
    // let prevPlayer = document.getElementById("top-scores");
    jsonData.sort(
      (a, b) => parseInt(b.player_score) - parseInt(a.player_score)
    );
    for (let i = 0; i < 6; i++) {
      // let newPlayer = document.createElement("div");
      // newPlayer.setAttribute("class", "players");
      // let deleteBtn = document.createElement("img");
      // deleteBtn.setAttribute("id", `${jsonData[i].player_name}`);
      // deleteBtn.setAttribute("src", "./images/delete-icon.jpg");
      // deleteBtn.setAttribute("width", "20");
      // deleteBtn.setAttribute("height", "25");
      // newPlayer.innerHTML = `<hr /><span id="player-name">${jsonData[i].player_name}</span>&nbsp;<span id="player-score">${jsonData[i].player_score} points</span>${deleteBtn}`;
      // prevPlayer.parentNode.insertBefore(newPlayer, prevPlayer.nextSibling); // insert after
      let playerName = document.getElementById(`player-${i + 1}-name`);
      playerName.innerText = jsonData[i].player_name;
      let playerScore = document.getElementById(`player-${i + 1}-score`);
      playerScore.innerText = jsonData[i].player_score;
      document
        .getElementById(`player-${i + 1}-delete`)
        .addEventListener("click", function () {
          // console.log(e);
          deleteScore(jsonData[i].player_name);
        });
    }
  } catch (err) {
    console.error(err.message);
  }
})();

// var topPlayers = document.getElementById("top-scores");
// var player = topPlayers.getElementsByTagName("IMG");

// for (let k = 0; k < player.length; k++) {
//   console.log(player[k].id);
// }

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
  .getElementById("scoreboard-Btn")
  .addEventListener("click", function () {
    closeModal("gameover-modal");
    handleScoreboard();
  });

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
      // console.log("GAME OVER");
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
      if (score % 300 === 0) {
        // still not working
        updateSpeed();
      }
    }
  }

  function updateSpeed() {
    speed -= 20;
    resetter();
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
