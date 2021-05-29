DROP DATABASE IF EXISTS firebase_auth;
CREATE DATABASE firebase_auth;

\c firebase_auth;

DROP DATABASE IF EXISTS users;

CREATE TABLE users(
    usernum SERIAL PRIMARY KEY,
    id VARCHAR,
    email VARCHAR,
    username VARCHAR UNIQUE
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

CREATE TABLE info(
    player INT REFERENCES users(usernum),
    picture VARCHAR,
    nickname VARCHAR,
    height VARCHAR
    

);

-- INSERT into info(player,picture,nickname,height)
--     VALUES(1,'picture','jaiden','6.0');