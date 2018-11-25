DROP TABLE IF EXISTS clothes;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  username varchar(255),
	email varchar(255),
	password varchar(255),
	type varchar(255),
 	zipcode varchar(255),
 	phone varchar(255)
 );

CREATE TABLE clothes (
 owner varchar(255),
 client varchar(255) DEFAULT '',
 name varchar(255) PRIMARY KEY,
 category varchar(255),
 size varchar(255),
 location varchar(255),
 posted varchar(255) DEFAULT 'true',
 date   varchar(255),
 time   timestamp,
 image  varchar(255)
);
