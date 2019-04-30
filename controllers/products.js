const express = require('express');
const models = require('../models');
const passport = require('../middlewares/authentication');

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }),  
  (req, res) => {
    models.Products.findAll({
      where: {
       Scannable : false,
      },
      order: [['updatedAt', 'DESC']],
    }).then((allProducts) => {
      res.status(200).send(allProducts);
    })
});

router.get('/:barcode', passport.authenticate('jwt', { session: false}), (req, res) => {
  models.Barcode.findOne({
    where: {
      Barcodeid: req.params.barcode
    }, 
    include: [{
      model: models.Products
    }]
  }).then(product => {
      res.status(200).send(product);
  })
});

router.put('/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
 
    models.Products.update({
      available: req.body.available,
    },
    {
      where: {
        id: req.params.id,
      },
  
      returning: true,
    }).then(product => {
     res.status(200).send('Product updated');
    }); 
});


module.exports = router;
