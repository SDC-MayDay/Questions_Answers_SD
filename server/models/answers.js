const db = require('../../db');

module.exports = {
    getAll: (questionId, callback) => {
      let allAnswers = {
        question_id: questionId,
        answers: []
      }
      var queryAnswers =
      `SELECT a.question_id, a.id, a.body, a.date_written, a.answerer_name, a.reported, a.helpful \
      FROM answers AS a \
      INNER JOIN questions AS q ON (q.id = a.question_id) where a.question_id=${questionId}`;
      db.query(queryAnswers, (err, answerResults) => {
        if (err) {
          return callback(err);
        }

        for (let i = 0; i < answerResults.length; i++) {
          let reported = false;
          if (answerResults[i].reported === 1) {
            reported = true;
          }

          allAnswers['answers'].push({
            answer_id: answerResults[i].id,
            body: answerResults[i].body,
            date: answerResults[i].date_written,
            answerer_name: answerResults[i].answerer_name,
            reported: reported,
            helpful: answerResults[i].helpful,
            photos: []
          })

          let photoList = {id: null, url: null};
          let queryPhotos = `SELECT p.id, p.url FROM photos AS p INNER JOIN answers AS a ON (a.id = p.answer_id) WHERE p.answer_id=${answerResults[i].id}`;
          db.query(queryPhotos, (err, photoResults) => {
            if (err) {
              return callback(err);
            }

            if (photoResults.length > 0) {
              for (let j = 0; j < photoResults.length; j++) {
                photoList = {id: photoResults[j].id, url: photoResults[j].url};
                allAnswers['answers'][i]['photos'].push(photoList);
              }
            }
          });
        }
        callback(null, allAnswers);
      });
  },

  postAnswer: (answer, callback) => {
    const queryString = `INSERT INTO Answers (question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES (${answer.question_id}, "${answer.body}", curdate(), "${answer.name}", "${answer.email}", 0, 0)`;

    db.query(queryString, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  },

  incrementHelpful: (answerId, callback) => {
    const queryString = `UPDATE answers SET helpful = helpful+1 WHERE id=${answerId}`;

    db.query(queryString, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  },

  changeReport: (answerId, callback) => {
    const queryString = `UPDATE answers SET reported = 1 WHERE id=${answerId}`;

    db.query(queryString, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  }
};
