const express = require('express');
const router = express.Router();


router.use('/alt', require('./alt'));
router.use('/', require('./home'));
router.use('/login', require('./login'));
router.use('/signup', require('./signup'));
router.use('/', require('/payments'));

module.exports = router;
