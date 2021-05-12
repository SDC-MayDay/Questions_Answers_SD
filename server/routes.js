var controller = require('./controllers');
var router = require('express').Router();

router.get('/questions/:productId', controller.questions.get);
router.get('/questions/:questionId/answers', controller.answers.get);

router.post('/questions', controller.questions.post);

module.exports = router;