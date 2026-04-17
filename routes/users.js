var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/signup');
});

router.get('/:userid', (req, res) => {
  res.render('users', { userid: req.params.userid });
});

module.exports = router;