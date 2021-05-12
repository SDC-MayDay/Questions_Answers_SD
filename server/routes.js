var controller = require('./controllers');
var router = require('express').Router();

router.get('/questions/:productId', controller.questions.get);
router.get('/questions/:questionId/answers', controller.answers.get);

router.post('/questions', controller.questions.post);
router.post('/questions/:questionId/answers', controller.answers.post);

router.put('/questions/:questionId/helpful', controller.questions.updateHelpful);
// router.put('/questions/:question_id/report', controller.questions.putReport);
router.put('/answers/:answerId/helpful', controller.answers.updateHelpful);
// router.put('/answers/:answer_id/report', controller.answers.putReport);

module.exports = router;