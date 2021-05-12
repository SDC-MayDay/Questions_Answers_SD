const db = require('../../db');

module.exports = {
  getAll: (productId, callback) => {
    const allQuestions = {
      product_id: productId,
      product_name: '',
      questions: []
    }

    const queryQuestions = `SELECT q.product_id, p.name, q.id, q.body, q.date_written, q.asker_name, q.reported, q.helpful \
    FROM questions AS q \
    INNER JOIN products AS p ON (q.product_id = p.id) WHERE p.id=${productId}`;

    db.query(queryQuestions, (err, questionResults) => {

      allQuestions['product_name'] = questionResults[0].name;
      for (let i = 0; i < questionResults.length; i++) {
        allQuestions['questions'].push({
          question_id: questionResults[i].id,
          question_body: questionResults[i].body,
          question_date: questionResults[i].date_written,
          asker_name: questionResults[i].asker_name,
          question_reported: questionResults[i].reported,
          question_helpful: questionResults[i].helpful,
          answers: {}
        });

        const queryAnswers = `SELECT a.question_id, a.id, a.body, a.date_written, a.answerer_name, a.reported, a.helpful \
        FROM answers AS a \
        INNER JOIN questions AS q ON (q.id = a.question_id) WHERE q.id=${questionResults[i].id}`

        db.query(queryAnswers, (err, answerResults) => {
          console.log(answerResults);
          let answerLength = Object.keys(answerResults).length;
          if (answerLength > 0) {
            for (let j = 0; j < answerResults.length; j++) {
              if (allQuestions['questions']['answers'][answerResults[j].id] === undefined) {
                allQuestions['questions']['answers'][answerResults[j].id] = {
                  id: answerResults[j].id,
                  body: answerResults[j].body,
                  date: answerResults[j].date_written,
                  answerer_name: answerResults[j].answerer_name,
                  reported: answerResults[j].reported,
                  helpful: answerResults[j].helpful,
                  photos: []
                }
             }
            }
          }
        });
      }
      callback(null, allQuestions);
    });
  },

  postQuestion: (question, callback) => {
    const queryString = `INSERT INTO questions (product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES (${question.product_id}, ${question.body}, NOW(), ${question.name}, ${question.email}, 0, 0)`;

    db.query(queryString, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  }
};

// a.body, a.date_written, a.answerer_name, a.reported, a.helpful
// INNER JOIN answers AS a ON (q.id = a.question_id)
