const express = require('express');
const router = express.Router();

// Rota para acessar /profile
router.get('/', (req, res) => {
    res.render('profile'); 
});

module.exports = router;