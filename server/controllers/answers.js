var models = require('../models');

module.exports = {
  get: (req, res) => {
    const { questionId } = req.params;
    models.answers.getAll(questionId, (err, results) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        return res.status(200).send(results);
      }
    });
  },


  post: (req, res) => {
    const answer = req.body;
    models.answers.postAnswer(answer, (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send('Answer created successfully!');
      }
    });
  },

  updateHelpful: (req, res) => {
    const { answerId } = req.params;
    models.answers.incrementHelpful(answerId, (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(204).send('Answer Helpfulness Updated!');
      }
    });
  },

  updateReport: (req, res) => {
    const { answerId } = req.params;
    console.log(answerId);
    models.answers.changeReport(answerId, (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(204).send('Answer Reported!');
      }
    });
  }
}