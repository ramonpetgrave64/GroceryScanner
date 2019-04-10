const express = require('express');
const router = express.Router();


router.use('/alt', require('./alt'));
router.use('/', require('./home'));
router.use('/login', require('./login'));
router.use('/signup', require('./signup'));
router.use('/payments', require('./payments'));
router.use('/products', require('./products'));
router.use('/credit', require('./creditcard'));

module.exports = router;
