DROP DATABASE IF EXISTS firebase_auth;
CREATE DATABASE firebase_auth;

\c firebase_auth;

-- DROP TABLE IF EXISTS users;

CREATE TABLE users(
    usernum SERIAL PRIMARY KEY,
    id VARCHAR UNIQUE,
    email VARCHAR,
    username VARCHAR UNIQUE,
    profile_url VARCHAR,
    player_description VARCHAR 
);

CREATE TABLE skills(
    player INT REFERENCES users(usernum),
    shooting INT,
    handle INT,
    perimiter_defence INT,
    interior_defence INT,
    rebounding INT,
    steals INT,
    blocks INT,
    iq INT,
    leadership INT
);

CREATE TABLE community_skills(
    player INT REFERENCES users(usernum),
    shooting INT,
    handle INT,
    perimiter_defence INT,
    interior_defence INT,
    rebounding INT,
    steals INT,
    blocks INT,
    iq INT,
    leadership INT,
    times_evaluated INT
);
-- Drop TABLE if EXISTS info;
CREATE TABLE info(
    player INT REFERENCES users(usernum),
    nickname VARCHAR,
    height Float
    

);

-- INSERT into info(player,picture,nickname,height)
--     VALUES(1,'https://firebasestorage.googleapis.com/v0/b/chzv2-bcffe.appspot.com/o/images%2F18739087_10154922759203778_2786552983602310199_o.jpg?alt=media&token=b05db62a-5b3a-496a-bdb1-be2a6f038973',
--     'jaiden','6.0');

-- INSERT into info(player, nickname, height)
--     VALUES(1,'Jaiden16',6.0)