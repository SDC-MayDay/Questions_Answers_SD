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

  // putHelpful: (req, res) => {

  //   models.questions.incrementHelpful() => {
  //     if (err) {

  //     } else {
  //        res.status(204).send('Incremented Question Helpfulness!');
  //     }
  //   }
  // },

  // putReport: (req, res) => {
  //   models.questions.incrementReport() => {
  //     if (err) {

  //     } else {
  //       res.status(204).send('Incremented Question Report!');
  //     }
  //   }
  // }
}