var models = require('../models');

module.exports = {
  get: function (req, res) {
    models.questions.getAll(function(err, results) {
      if (err) {
        console.log(err);
      } else {
        res.json(results);
      }
    });
  }
}