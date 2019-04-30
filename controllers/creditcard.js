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

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
	models.Credit_card.create({
		number: req.body.number,
		UserId: req.user.id
	})
	.then(()=> {
		res.status(200).send('Credit card info registered!');
	})
	.catch(() => {
		res.status(500).send('Failed to registered credit card info');
	})
})

module.exports = router;