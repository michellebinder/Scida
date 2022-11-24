CREATE DATABASE test_db;
USE test_db;
CREATE TABLE account(
   lecturer_id          INTEGER  NOT NULL
  ,first_name         VARCHAR(30) NOT NULL
  ,last_name          VARCHAR(30) NOT NULL
  ,email              VARCHAR(30) NOT NULL
  ,account_role       VARCHAR(20) NOT NULL
);
