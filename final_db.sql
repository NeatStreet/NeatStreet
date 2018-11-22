DROP TABLE IF EXISTS users;

CREATE TABLE users (
	email varchar(255) PRIMARY KEY,
	password varchar(255),
	type varchar(255),
 	zipcode varchar(255),
 	phone varchar(255)
 );

