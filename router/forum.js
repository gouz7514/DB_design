var express = require('express')
var router = express.Router()

var userDAO = require('../model/DAO/userDAO');

var path = require('path')
var fs = require('fs-extra')
var multer = require('multer')

const crypto = require('crypto');

router.use(express.static('public'))


router.get('/', function (req, res) {
    res.render('forum')
});

router.get('/write', function (req, res) {
    res.render('forum_write')
});

router.post('/write/upload', function (req, res, next) {
    console.log(req.body)
    res.render('forum_write')
});


module.exports = router

