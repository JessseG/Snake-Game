const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json()); // req.body

// Routes

// submit a player score
app.post("/scores", async (req, res) => {
  try {
    // console.log(req.body);
    const name = req.body.player_name;
    const score = req.body.player_score;
    const newScore = await pool.query(
      "INSERT INTO scoreboard (player_name, player_score) VALUES($1, $2) RETURNING *",
      [name, score]
    );
    res.json(newScore.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// get all scores
app.get("/scores", async (req, res) => {
  try {
    const allScores = await pool.query("SELECT * FROM scoreboard");

    res.json(allScores.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(5000, () => {
  console.log("Server started at 5000");
});

// get one score
app.get("/scores/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const score = await pool.query(
      "SELECT * FROM scoreboard WHERE player_id = $1",
      [id]
    );
    res.json(score.rows[0]);
    console.log(req.params);
  } catch (error) {
    console.error(error.message);
  }
});
