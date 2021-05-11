var mysql = require('mysql');

var connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'qanda'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Database connected!');
});

module.exports = connection;