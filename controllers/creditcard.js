const express = require('express');
const models = require('../models');
const passport = require('../middlewares/authentication');

const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
	models.Credit_card.findAll({
		where: {
			UserId: req.user.id
		}
	})
	.then(creditInfo => {
		res.status(200).send(creditInfo);
	})
	.catch(err => {
		res.status(500).send(err);
	})
});


module.exports = router;