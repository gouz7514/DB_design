var express = require('express')
var router = express.Router()

var userDAO = require('../model/DAO/userDAO');

var path = require('path')
var fs = require('fs-extra')
var multer = require('multer')

const crypto = require('crypto');

router.use(express.static('public'))

router.get('/login', function (req, res) {
    res.render('login')
});

router.get('/sign_up', function(req, res, next) {
    res.render("sign_up");
});

router.post("/sign_up", async function(req,res,next){
    body = req.body;

    inputPassword = body.password;
    hashPassword = crypto.createHash("sha512").update(inputPassword).digest("hex");

    let result = userDAO.user.userAdd({
        name: body.userName,
        email: body.userEmail,
        password: hashPassword,
        salt: salt
    })

    res.redirect("/sign_up");
});

module.exports = router

