const pg = require('pg');

const SQLconnection =
  'postgres://xkvvjoiw:O6_92MrJi1A2YxAtGWFCO2PrqU3oJdGn@stampy.db.elephantsql.com:5432/xkvvjoiw';
const client = new pg.Client(SQLconnection);
client.connect();

allBooks();
allBookReservations();

function allBooks() {
  client.query('SELECT * From books', (err, result) => {
    // console.log('ISBN, Title, Authors');
    // result.rows.forEach(row =>
    //   console.log(`${row.isbn}, ${row.title}, ${row.authors}`)
    // );
  });
}

function allBookReservations(){
  client.query('SELECT * From bookreserve', (err, result) => {
    // console.log('ISBN, username, requesttime');
    // result.rows.forEach(row =>
    //   console.log(`${row.isbn}, ${row.username}, ${row.requesttime}`)
    // );
  });
}

module.exports = {
  client,
  allBooks
};
