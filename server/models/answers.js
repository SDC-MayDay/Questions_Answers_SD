const db = require('../../db');

module.exports = {
    getAll: function (questionId, callback) {
      const allAnswers = {
        question_id: questionId,
        answers: []
      }
      var queryAnswers =
      `SELECT a.question_id, a.id, a.body, a.date_written, a.answerer_name, a.reported, a.helpful \
      FROM answers AS a \
      INNER JOIN questions AS q ON (q.id = a.question_id) where a.question_id=${questionId}`;
      db.query(queryAnswers, (err, answerResults) => {
        for (let i = 0; i < answerResults.length; i++) {
          allAnswers['answers'].push({
            answer_id: answerResults[i].id,
            body: answerResults[i].body,
            date: answerResults[i].date_written,
            answerer_name: answerResults[i].answerer_name,
            reported: answerResults[i].reported,
            helpful: answerResults[i].helpful,
            photos: []
          })

          var queryPhotos = `SELECT p.url FROM photos AS p INNER JOIN answers AS a ON (a.id = p.answer_id) WHERE a.id = p.answer_id`;
          db.query(queryPhotos, (err, photoResults) => {
            for (let j = 0; j < photoResults; j++) {
              allAnswers['answers'][i]['photos'].push({
                id: photoResults[j].id,
                url: photoResults[j].url
              })
            }
          })
        }
        callback(err, allAnswers);
    });
  }
};