var models = require('../models');

module.exports = {
  get: (req, res) => {
    const { questionId } = req.params;
    models.answers.getAll(questionId, function(err, results) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  }
}