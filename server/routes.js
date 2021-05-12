var controller = require('./controllers');
var router = require('express').Router();

router.get('/products', controller.products.get);
router.get('/questions', controller.questions.get);
router.get('/questions/:question_id/answers', controller.answers.get);

module.exports = router;