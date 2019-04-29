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
/*router.get('/new', 
  passport.redirectIfNotLoggedIn('/login'),  
  (req, res) => {
    res.render('drafts/new');
});

 router.post('/', 
  passport.redirectIfNotLoggedIn('/login'), 
  (req, res) => {
    req.user.createDraftChapter({
      slug: getSlug(req.body.title.toLowerCase()),
      title: req.body.title.toLowerCase(),
      text: req.body.text,
      genre: req.body.genre,
    }).then((draft) => {
      res.redirect(`/drafts/${req.user.username}/${draft.slug}`);
    }).catch(() => {
      res.render('drafts/new');
    });
});  */

/*router.get('/:username/:slug', 
  passport.redirectIfNotLoggedIn('/login'), 
  redirect.ifNotAuthorized('/'),
  (req, res) => {
    models.DraftChapters.findOne({
      where: {
        slug: req.params.slug,
      },
      include: [{
        model: models.Users,
        where: {
          username: req.params.username,
        },
      }],
    }).then((draft) => {
      (draft ? res.render('drafts/single', { draft, user: draft.User }) : res.redirect('/drafts'));
    });
});

router.get('/:username/:slug/edit', 
  passport.redirectIfNotLoggedIn('/login'), 
  redirect.ifNotAuthorized('/'), 
  (req, res) => {
    models.DraftChapters.findOne({
      where: {
        slug: req.params.slug,
      },
      include: [{
        model: models.Users,
        where: {
          username: req.params.username,
        },
      }],
    }).then((draft) =>
      (draft ? res.render('drafts/edit', { draft }) : res.redirect('/drafts'))
    );
});

router.put('/:username/:slug', 
  passport.redirectIfNotLoggedIn('/login'), 
  redirect.ifNotAuthorized('/'), 
  (req, res) => {
    models.DraftChapters.update({
      title: req.body.title.toLowerCase(),
      slug: getSlug(req.body.title.toLowerCase()),
      text: req.body.text,
    },
    {
      where: {
        slug: req.params.slug,
      },
      include: [{
        model: models.Users,
        where: {
          username: req.params.username,
        },
      }],
      returning: true,
    }).then(([numRows, rows]) => {
      const draft = rows[0];
      res.redirect(`/drafts/${req.user.username}/${draft.slug}`);
    }); 
});

router.delete('/:username/:slug', 
  passport.redirectIfNotLoggedIn('/login'), 
  redirect.ifNotAuthorized('/'), 
  (req, res) => {
    models.DraftChapters.destroy({
      where: {
        slug: req.params.slug,
      },
      include: [{
        model: models.Users,
        where: {
          username: req.params.username,
        },
      }],
    }).then(() => {
      res.redirect('/drafts');
    });
});   */

module.exports = router;
