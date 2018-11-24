const express = require('express');
const bodyParser = require('body-parser')
const moment = require('moment')

const router = express.Router();

const db = require('../db');

router.get('/', (req, res) => {
    const { isbn, title } = req.query
    if (isbn) {
        db.client.query(
            `SELECT * From books WHERE isbn = '${isbn}'`,
            (err, result) => {
                res.json(result.rows)
            }
        )
    } else {
        db.client.query(
            `SELECT * From books WHERE UPPER(Title) LIKE '%${title.toUpperCase()}%'`,
            (err, result) => {
                res.json(result.rows)
            }
        );
    }
});

router.post('/', (req, res) => {
    const body = req.body
    const { isbn, title, authors } = body
    db.client.query(
        `INSERT INTO books (isbn, title, authors)
    VALUES(
      '${isbn}',
      '${title}',
      '{${authors.map(a => `"${a}"`).join(',')}}'
    )`,
        (err, result) => {
            if (err) throw err
            res.json({ added: true })
        }
    )
})

router.delete('/', (req, res) => {
    const { isbn } = req.body
    db.client.query(
        `DELETE FROM books WHERE isbn = ${isbn}`,
        (err, result) => {
            res.json({ deleted: true })
        }
    )
})

// book reservation
router.post('/reserve', (req, res) => {
    const { isbn, username } = req.body
    db.client.query(
        // edit bookreserve table, count the queue, return the queue
        `INSERT INTO bookreserve(isbn,username,requesttime) VALUES('${isbn}','${username}','${moment().format('YYYY-MM-DD hh:mm:ss')}')`,
        (err, result) => {
            if (err) throw err
            db.client.query(
                `SELECT isbn, count(*) as queue FROM bookreserve WHERE isbn = '${isbn}' GROUP BY isbn`,
                (err, result) => {
                    res.json({ position: result.rows[0].queue })
                }
            )
        }
    )
});

router.delete('/reserve', (req, res) => {
    const { isbn } = req.body
    db.client.query(
        `DELETE
        FROM bookreserve
        WHERE ctid IN (SELECT ctid FROM bookreserve WHERE bookreserve.isbn = '${isbn}' 
        ORDER BY requesttime LIMIT 1 );`,
        (err, result) => {
            db.client.query(
                `SELECT * FROM bookreserve`, (err, result) => {
                    if (err) throw err
                    res.json(result.rows)
                }
            )
        }
    )
})

router.get('/reserve', (req, res) => {
    console.log('On get reserve')
    const { isbn } = req.query
    console.log('isbn ='+isbn)
    db.client.query(
        `SELECT * FROM bookreserve WHERE isbn = '${isbn}' ORDER BY requesttime`, (err, result) => {
            if (err) throw err
            res.json(result.rows)
        }
    )
})

router.post('/borrow', (req, res) => {
    console.log('Staff proceeding borrow action, req', req.body)

    var isbn = req.body.isbn
    db.client.query(
        `SELECT username
        FROM bookreserve
        WHERE ctid IN (SELECT ctid FROM bookreserve WHERE bookreserve.isbn = '${isbn}' ORDER BY requesttime LIMIT 1 );`,
        (err,result)=> {
            var username = result.rows[0].username
            console.log('|-Deleting username',username,'isbn',isbn)
            db.client.query(
                `DELETE
                 FROM bookreserve
                 WHERE bookreserve.isbn = '${isbn}'
                 AND bookreserve.username = '${username}';`)
            db.client.query(
                `INSERT INTO borrowaction (isbn,username, checkin)VALUES('${isbn}','${username}','${moment().format('YYYY-MM-DD hh:mm:ss')}');`)
            console.log('|-Inserted username',username,'isbn',isbn)
            db.client.query(`SELECT username FROM bookreserve WHERE bookreserve.isbn = '${isbn}';`,
                (err, result) => {
                    console.log('|-Sending results',result.rows)
                    res.json(result.rows)
                }
            )
        })
})

router.delete('/borrow', (req, res) => {
    const { isbn } = req.body
    db.client.query(
        `DELETE FROM borrowaction WHERE isbn = '${isbn}'`,
        (err, result) => {
            res.json({ deleted: true })
        }
    )
})

router.get('/borrow', (req, res) => {
    db.client.query(
        `SELECT * FROM borrowaction`,
        (err, result) => {
            console.log(result.rows)
            res.json(result.rows)
        }
    )
})

router.post('/borrow/dashboard', (req, res) => {
    const { username } = req.body
    db.client.query(
        `SELECT users.name, books.title, borrowaction.checkin 
        FROM borrowaction 
        INNER JOIN users ON borrowaction.username = users.username
        INNER JOIN books ON borrowaction.isbn = books.isbn
        WHERE borrowaction.username = '${username}'`,
        (err, result) => {
            res.json(result.rows)
        }
    )
})

router.post('/reserve/dashboard', (req, res) => {
    const { username } = req.body
    db.client.query(
        `SELECT users.name, books.title, bookreserve.requesttime
        FROM bookreserve
        INNER JOIN users ON bookreserve.username = users.username
        INNER JOIN books ON bookreserve.isbn = books.isbn
        WHERE bookreserve.username = '${username}'`,
        (err, result) => {
            res.json(result.rows)
        }
    )
})

module.exports = router;
