const pg = require('pg');

const SQLconnection =
  'postgres://ehnepibw:IUAGevlvyuI3MQuwTZ8erUxYx1QwL8Vo@pellefant.db.elephantsql.com:5432/ehnepibw';
const client = new pg.Client(SQLconnection);
client.connect();

module.exports = {
  client
};
