var path = require('path');
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../db/fortnite.sqlite')
  },
  useNullAsDefault: true
});

module.exports = knex;
