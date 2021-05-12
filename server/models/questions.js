const db = require('../../db');

module.exports = {
    getAll: function (callback) {
      var queryString = 'SELECT q.product_id, q.id, p.name, q.body, q.date_written, q.asker_name, q.reported, q.helpful \
      FROM questions AS q \
      INNER JOIN products AS p ON (q.product_id = p.id)';
      db.query(queryString, function(err, results) {
      callback(err, results);
    });
  }
};

// a.body, a.date_written, a.answerer_name, a.reported, a.helpful
// INNER JOIN answers AS a ON (q.id = a.question_id)
