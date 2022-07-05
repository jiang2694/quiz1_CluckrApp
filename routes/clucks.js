const express = require('express');
const knex = require('../db/client');

const router = express.Router();


router.get('/', (req, res) => {
  knex('clucks')
  .orderBy('createdAt', 'desc')
  .then((clucks) => {
    res.render('clucks/index', { clucks:clucks});
  })
})

router.get('/new', (req, res) => {
  if(req.cookies.username) {
  res.render('clucks/new', { clucks: false });
  } else {
    res.redirect('/sign_in')
  }
});

router.post('/', (req, res) => {
  knex('clucks')
  .insert({
    username: req.body.name,
    imageUrl: req.body.imageUrl,
    content: req.body.content,
  })
  .returning('*')
  .then((clucks) => {
    const cluck = clucks[0];
    res.redirect('/clucks')
  })
})


module.exports = router;