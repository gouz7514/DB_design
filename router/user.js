var express = require('express')
var router = express.Router()

var userDAO = require('../model/DAO/userDAO');

var path = require('path')
var fs = require('fs-extra')
var multer = require('multer')

const crypto = require('crypto');

router.use(express.static('public'))

router.get('/login', (req, res) => {
    res.render('login')
});

router.post('/login', (req, res, next) => {
    inputID = req.body.userid
    inputPW = req.body.pw
    keep = req.body.keep

    userDAO.getUserSalt(inputID, (err, salt) => {
        if(err) return next(err)
        hashPW = crypto.createHash("sha512").update(req.body.pw + salt.salt).digest("hex");
        userDAO.userSelectOne([inputID, hashPW], (err, result) => {
            console.log("find user...")
            console.log(inputID, salt, hashPW)
            if(err) return next(err)
            if(result && req.body.keep){
                // Session not implemented yet
                req.session.user = result
                res.redirect('/')
            }if(result && !req.body.keep){
                req.session.user = result
                res.redirect('/')
            }else{
                res.writeHead(401, {"Content-Type" : "text/html; charset=utf-8"})
                res.end(`<script>
                            alert("존재하지 않는 계정입니다.")
                            location.href = '/user/login'
                        </script>`)
            }
        })
    })


    // userDAO.userSelectOne([req.body.id, ], function(err, result){
    //     if(err) return next(err)      
        
    //     if(result && req.body.keep){

        
    //     }else if(result && !req.body.keep){
    //         // 로그인 성공시
    //         req.session.user = result
    //         res.redirect('/')
    //     }else{
    //         res.writeHead(401, {"Content-Type" : "text/html; charset=utf-8"})
    //         res.end(`<script>
    //                     alert("존재하지 않는 계정입니다.")
    //                     location.href = '/user/login'
    //                 </script>`)
    //     }
    // })
});

router.get('/sign_up', function(req, res, next) {
    res.render("sign_up");
});

router.post("/sign_up", function(req,res,next){
    console.log(req.body)
    salt = Math.round((new Date().valueOf() * Math.random())) + "";
    inputPassword = req.body.password;
    hashPassword = crypto.createHash("sha512").update(inputPassword+salt).digest("hex");

    var newUserInfo ={
        id : req.body.userid,
        password : hashPassword,
        nickname : req.body.nickname,
        name : req.body.name,
        email : req.body.email,
        salt : salt
    } 
    console.log(newUserInfo)
    userDAO.userAdd(newUserInfo, (err, result) => {
        if(err) return next(err)
        res.redirect('/user/login')
    })
});

module.exports = router

