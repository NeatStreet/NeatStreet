DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS borrowaction;
DROP TABLE IF EXISTS bookreserve;

CREATE TABLE books (
 	isbn varchar(255)PRIMARY KEY,                                                             
 	title varchar(255),
 	authors text[],                                                                                                                                                                              
 	cover varchar(255),
 	location varchar(255)
 );

CREATE TABLE users (
	username varchar(255) PRIMARY KEY,
	type varchar(255),                                                                                                                                                                                  
 	name varchar(255),                                                             
 	password varchar(255)
 );

CREATE TABLE borrowaction (
	isbn varchar(255) PRIMARY KEY,
	username varchar(255),
 	checkin timestamp                                                                                                                                                                         
 );

CREATE TABLE bookreserve (
	bookreserveid SERIAL PRIMARY KEY,
	isbn varchar(255),
	username varchar(255),
	requesttime timestamp
);

CREATE TABLE techsuite (
	roomnumber varchar(255) PRIMARY KEY,
	size int
);

CREATE TABLE reserveaction (
	roomnumber varchar(255) PRIMARY KEY,
	username varchar(255),
 	checkin timestamp                                                                                                                                                                         
 );

CREATE TABLE techreserve(
	techreserveid SERIAL PRIMARY KEY,
	roomnumber varchar(255),
	username varchar(255),
	requesttime timestamp
);

INSERT INTO books(isbn,title,authors,cover,location) VALUES('9781597226769','The Great Gatsby','{"F. Scott Fitzgerald"}','https://upload.wikimedia.org/wikipedia/en/f/f7/TheGreatGatsby_1925jacket.jpeg', 'third-A-1');
INSERT INTO books(isbn,title,authors,cover,location) VALUES('9780201821369','Languages and Machines','{"Thomas A. Sudkamp"}','http://t2.gstatic.com/images?q=tbn:ANd9GcS2COgRUmvPnqEu_XVsXZkWuFFqyCbgRSHqZEctzOKPz6_CmyeQ', 'third-A-2');
INSERT INTO books(isbn,title,authors,cover,location) VALUES('9781451686647','The Passenger','{"Lisa Lutz"}','http://t1.gstatic.com/images?q=tbn:ANd9GcQaOzMU4gxUKNZ1oBjGme1eMk2W-9b1bGta-jC4hu-R0fNvWcHF', 'third-B-12');
INSERT INTO books(isbn,title,authors,cover,location) VALUES('9780262531962','Introduction to Algorithms','{"Charles E. Leiserson", "Clifford Stein", "Ronald Rivest","Thomas H. Cormen"}','http://t0.gstatic.com/images?q=tbn:ANd9GcTJpF8h8d0d4fsKvLAnZofFKnKDnEch681m4TOg6QoU96uHcxOJ','third-A-11');
INSERT INTO books(isbn,title,authors,cover,location) VALUES('9788679912435','The C Programming Language','{"Brian Kernighan", "Dennis Ritchie"}','http://t2.gstatic.com/images?q=tbn:ANd9GcT53XW5XJ62eWOwLTyDPiDFalQn0qo9XUlcol92UKci5jJRIHRG','third-A-12');
INSERT INTO books(isbn,title,authors,cover,location) VALUES('9787505397194','The Pragmatic Programmer: From Journeyman to Master','{"Andy Hunt", "Dave Thomas"}','http://t0.gstatic.com/images?q=tbn:ANd9GcT7AqHvHuzNjt1HkgnNsD3gcMUkXd2L_hJB4PGwSD7sC8T7s95z','third-A-13');
INSERT INTO books(isbn,title,authors,cover,location) VALUES('9784756145437','The Art of Computer Programming, Volumes 1-3 Boxed Set','{"Donald Ervin Knuth"}','http://t3.gstatic.com/images?q=tbn:ANd9GcTpzof-48yhJB6J-bj5ggLhU0WAtDhmUkWEX0c-ZdlxwKPNGvza','third-A-14');
INSERT INTO books(isbn,title,authors,cover,location) VALUES('9780321700704','Design Patterns: Elements of Reusable Object-Oriented Software','{"Erich Gamma" ,"John Vlissides, Ralph Johnson" ,"Richard Helm"}','http://t1.gstatic.com/images?q=tbn:ANd9GcQXPvz_wKKzK4Ixww0SlEJ_xF9bU8bsWMEU0BJOf2W4_eJ1eYa-','third-A-15');
INSERT INTO books(isbn,title,authors,cover,location) VALUES('9781285701080','Introduction to the Theory of Computation','{"Michael Sipser"}','http://t2.gstatic.com/images?q=tbn:ANd9GcQsGFz89HEUCmBLJ-jhTOjHb10y_-K4VBS6GL-KTbPzUDTt_E4k','third-B-1');
INSERT INTO books(isbn,title,authors,cover,location) VALUES('9780735638723','Code: The Hidden Language of Computer Hardware and Software','{"Charles Petzold"}','http://t2.gstatic.com/images?q=tbn:ANd9GcQz8JJ0rrcqZpX58CvVewvn_HA7U6mcNa-8lSRZg-furUCL2GuI','third-B-2');
INSERT INTO books(isbn,title,authors,cover,location) VALUES('9780201835953','The Mythical Man-Month: Essays on Software Engineering','{"Frederick P. Brooks Jr."}','http://t0.gstatic.com/images?q=tbn:ANd9GcTsD0XrI7NKQ7_Vh4eNh75ENN3gG_B_rxjRIcKWCUv2YkBPzNJH','third-B-3');
INSERT INTO books(isbn,title,authors,cover,location) VALUES('9781537600314','Artificial Intelligence: A Modern Approach','{"Peter Norvig", "Stuart J. Russell"}','http://t2.gstatic.com/images?q=tbn:ANd9GcSMvrvw-Y9C010ghXfLJFgTZsA4TB8evFIpAvDrxFULQ2OGp3MP','third-B-4');

INSERT INTO users(type,name,username,password) VALUES('Student','Ryan Gosling', 'rgosling@wpi.edu','123456');
INSERT INTO users(type,name,username,password) VALUES('Teacher','Lane Harrison','lane@cs.wpi.edu','654321');
INSERT INTO users(type,name,username,password) VALUES('Staff','Anna Gold','akgold@wpi.edu','000000');
INSERT INTO users(type,name,username,password) VALUES('Student','Yang Xu','yxu4@wpi.edu','000000');


INSERT INTO borrowaction(isbn,username,checkin) VALUES('9784756145437','rgosling@wpi.edu','2017-6-19 10:23:54');
INSERT INTO borrowaction(isbn,username,checkin) VALUES('9781537600314','rgosling@wpi.edu','2017-8-1 13:23:54');
INSERT INTO borrowaction(isbn,username,checkin) VALUES('9780321700704','lane@cs.wpi.edu','2017-7-19 15:28:38');

INSERT INTO bookreserve(isbn,username,requesttime) VALUES('9788679912435','rgosling@wpi.edu','2017-6-18 10:23:54');
INSERT INTO bookreserve(isbn,username,requesttime) VALUES('9780201835953','rgosling@wpi.edu','2017-8-1 13:23:54');
INSERT INTO bookreserve(isbn,username,requesttime) VALUES('9780201835953','lane@cs.wpi.edu','2017-7-31 9:19:01');

INSERT INTO techsuite(roomnumber, size) VALUES ('201',5);
INSERT INTO techsuite(roomnumber, size) VALUES ('110',5);
INSERT INTO techsuite(roomnumber, size) VALUES ('112',2);
INSERT INTO techsuite(roomnumber, size) VALUES ('210',10);
INSERT INTO techsuite(roomnumber, size) VALUES ('103',7);

INSERT INTO reserveaction(roomnumber, username, checkin) VALUES ('201','zluo2@wpi.edu','2017-6-19 10:23:54');
INSERT INTO reserveaction(roomnumber, username, checkin) VALUES ('110','yxu4@wpi.edu','2017-8-1 13:23:54');
INSERT INTO reserveaction(roomnumber, username, checkin) VALUES ('210','lane@cs.wpi.edu','2017-7-31 9:19:01');

INSERT INTO techreserve(roomnumber, username, requesttime) VALUES ('201','zluo2@wpi.edu','2017-6-15 10:23:54');
INSERT INTO techreserve(roomnumber, username, requesttime) VALUES ('201','yxu4@wpi.edu','2017-6-29 10:23:54');
INSERT INTO techreserve(roomnumber, username, requesttime) VALUES ('201','lane@cs.wpi.edu','2017-7-19 10:23:54');



-- Count the number of reservations before the current user;
SELECT isbn, count(*) as NUM FROM bookreserve WHERE isbn = '9780201835953' GROUP BY isbn;


-- INSERT INTO books(isbn) VALUES ('this is a test');
-- UPDATE books SET location = 'third-C-1' WHERE bookid = 1; 
-- DELETE FROM books WHERE isbn = '9780201835953';

-- SELECT * FROM books;

-- SELECT * FROM users;

-- SELECT * FROM borrowaction;

-- SELECT * FROM bookreserve;

--Display the reserved books based on ISBN
SELECT bookreserve.username, books.title, bookreserve.isbn, bookreserve.requesttime
FROM bookreserve
INNER JOIN books ON books.isbn=bookreserve.isbn
WHERE bookreserve.isbn = '9780201835953'
ORDER BY requesttime;
-- Table before delete
--      username     |                         title                          |     isbn      |     requesttime     
-- ------------------+--------------------------------------------------------+---------------+---------------------
--  lane@cs.wpi.edu  | The Mythical Man-Month: Essays on Software Engineering | 9780201835953 | 2017-07-31 09:19:01
--  zphyo            | The Mythical Man-Month: Essays on Software Engineering | 9780201835953 | 2017-07-31 10:19:01
--  rgosling@wpi.edu | The Mythical Man-Month: Essays on Software Engineering | 9780201835953 | 2017-08-01 13:23:54

-- Only delete the first line of the reserve table
DELETE
FROM bookreserve
WHERE ctid IN (SELECT ctid FROM bookreserve WHERE bookreserve.isbn = '9780201835953' ORDER BY requesttime LIMIT 1 );
-- Table after delete (You need to select again to see the result)
SELECT bookreserve.username, books.title, bookreserve.isbn, bookreserve.requesttime
FROM bookreserve
INNER JOIN books ON books.isbn=bookreserve.isbn
WHERE bookreserve.isbn = '9780201835953'
ORDER BY requesttime;
--      username     |                         title                          |     isbn      |     requesttime     
-- ------------------+--------------------------------------------------------+---------------+---------------------
--  zphyo            | The Mythical Man-Month: Essays on Software Engineering | 9780201835953 | 2017-07-31 10:19:01
--  rgosling@wpi.edu | The Mythical Man-Month: Essays on Software Engineering | 9780201835953 | 2017-08-01 13:23:54


-- Add to the somethin to borrowaction
-- You can store the data from bookreserve and insert them or doing it together with the following query

INSERT INTO borrowaction (isbn,username, checkin)
SELECT isbn, username, NOW()
FROM bookreserve
WHERE ctid IN (SELECT ctid FROM bookreserve WHERE bookreserve.isbn = '9780201835953' ORDER BY requesttime LIMIT 1 );
--Table after insert
SELECT * FROM borrowaction;
--      isbn      |     username     |          checkin           
-- ---------------+------------------+----------------------------
--  9784756145437 | rgosling@wpi.edu | 2017-06-19 10:23:54
--  9781537600314 | rgosling@wpi.edu | 2017-08-01 13:23:54
--  9780321700704 | lane@cs.wpi.edu  | 2017-07-19 15:28:38
--  9780201835953 | lane@cs.wpi.edu  | 2017-10-10 22:48:05.753432

--checkout is no longer needed since we are deleting the borrowaction after returning and the isbn will become unique.
--Delete from borrowaction by ISBN
DELETE FROM borrowaction WHERE isbn = '9780201835953';



