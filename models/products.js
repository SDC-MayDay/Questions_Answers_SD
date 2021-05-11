const db = require('../db');

module.exports = {
    getAll: function (callback) {
      var queryString = 'SELECT * FROM products WHERE id < 20';
      db.query(queryString, function(err, results) {
      callback(err, results);
    });
  }
};