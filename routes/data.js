var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
  res.render('data');
});

module.exports = router;