const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;

// process.env.PORT
// process.env.NODE_ENV => production OR undefined

// Middleware
app.use(cors());
app.use(express.json()); // req.body

// app.use(express.static(path.join(__dirname, "client/build")));
// app.use(express.static("client/build")); // same

if (process.env.NODE_ENV === "production") {
  // server static content
  // npm run build
  app.use(express.static(path.join(__dirname, "client")));
}

// console.log(__dirname);
// console.log(path.join(__dirname, "client/build"));

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

// delete a score by name
app.delete("/scores/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const deleteTask = await pool.query(
      "DELETE FROM scoreboard WHERE player_name = $1",
      [name]
    );
    res.json("Playre score was deleted");
  } catch (error) {
    console.log(error.message);
  }
});

// catch-All method
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
