var express = require('express');
var router = express.Router();

router.get('/asyncHelper', function (req, res) {
    res.render('pages/asyncHelper');
});

router.get('/helper', function (req, res) {
    res.render('pages/helper');
});

module.exports = router;
