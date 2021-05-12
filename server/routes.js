var controller = require('./controllers');
var router = require('express').Router();

router.get('/questions/:productId', controller.questions.get);
router.get('/questions/:questionId/answers', controller.answers.get);

router.post('/questions', controller.questions.post);
router.post('/questions/:questionId/answers', controller.answers.post);

router.put('/questions/:questionId/helpful', controller.questions.updateHelpful);
router.put('/answers/:answerId/helpful', controller.answers.updateHelpful);
router.put('/questions/:questionId/report', controller.questions.updateReport);
router.put('/answers/:answerId/report', controller.answers.updateReport);

module.exports = router;