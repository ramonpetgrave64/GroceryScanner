const express = require('express');
const models = require('../models');
const passport = require('../middlewares/authentication');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeKeySecret);

const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  let amount = req.body.total;

  stripe.customers.create({
    email: req.body.email,
    card: req.body.cardtoken
  })
  .then(customer =>{
    stripe.charges.create({
      amount,
      description: "Sample Charge",
      currency: "usd",
      customer: customer.id
    })
    .then(charge => { 
      res.status(200).send(charge.paid);
    })
    .catch(err => {
      res.status(500).send({error: "Purchase Failed"});
    });
  })
  .catch(err => {
      res.status(500).send({error: "Purchase Failed"});
  });
  
});

module.exports = router;