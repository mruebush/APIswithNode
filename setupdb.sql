DROP DATABASE IF EXISTS profiles;
CREATE DATABASE profiles;

\c profiles;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  age INTEGER
);

INSERT INTO users (name, age)
  VALUES ('Bill', '34');
INSERT INTO users (name, age)
  VALUES ('Boom', '12');
INSERT INTO users (name, age)
  VALUES ('Bob', '56');