var controller = require('./controllers');
var router = require('express').Router();

router.get('/products', controller.products.get);

module.exports = router;