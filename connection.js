var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'oluwatobiloba1998OLADELE?',
    database: 'restaurant'
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})
module.exports = connection;