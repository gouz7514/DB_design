var express = require('express');
const infoDAO = require('../model/DAO/infoDAO');
var router = express.Router()

router.use(express.static('public'))


router.get('/actor_:id', function (req, res) {
    console.log(req.params.id)
    res.render('profile')
});

router.get('/director_:id', function (req, res) {
    console.log(req.params.id)
    res.render('profile')
});

module.exports = router

