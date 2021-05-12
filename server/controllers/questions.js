var models = require('../models');

module.exports = {
  get: (req, res) => {
    const { productId } = req.params;
    models.questions.getAll(productId, function(err, results) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  },

  post: (req, res) => {
    const question = req.body;
    models.questions.postQuestion(question, (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send('Question created successfully!');
      }
    });
  },

  updateHelpful: (req, res) => {
    const { questionId } = req.params;
    models.questions.incrementHelpful(questionId, (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
         res.status(204).send('Question Helpfulness Updated!');
      }
    });
  },

  // putReport: (req, res) => {
  //   models.questions.incrementReport() => {
  //     if (err) {

  //     } else {
  //       res.status(204).send('Incremented Question Report!');
  //     }
  //   }
  // }
}