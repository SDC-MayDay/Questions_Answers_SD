const db = require('../../db');

module.exports = {
    getAll: function (question_id, callback) {
      var queryString = 'SELECT a.question_id, a.id, a.body, a.date_written, a.answerer_name, a.reported, a.helpful, p.url \
      FROM answers AS a \
      INNER JOIN photos AS p ON (a.id = p.answer_id) where a.question_id=(?)';
      db.query(queryString, question_id, function(err, results) {
      callback(err, results);
    });
  }
};