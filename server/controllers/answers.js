var models = require('../models');

module.exports = {
  get: function (req, res) {
    const { question_id } = req.params;
    models.answers.getAll(question_id, function(err, results) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  }
}