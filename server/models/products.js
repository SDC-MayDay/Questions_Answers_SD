const db = require('../../db');

module.exports = {
    getAll: function (callback) {
      var queryString = 'SELECT * FROM products';
      db.query(queryString, function(err, results) {
      callback(err, results);
    });
  }
};