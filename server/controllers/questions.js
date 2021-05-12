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
        res.status(201).send('Question added');
      }
    });
  }
}