CREATE DATABASE snake2

CREATE TABLE scoreboard(
    player_id SERIAL PRIMARY KEY,
    player_name VARCHAR (255) NOT NULL,
    player_score INTEGER NOT NULL CHECK (player_score > 0)
);