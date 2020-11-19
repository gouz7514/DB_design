var express = require('express')
var router = express.Router()

var userDAO = require('../model/DAO/userDAO');

// var path = require('path')
// var fs = require('fs-extra')
// var multer = require('multer')
// const { v4: uuid } = require('uuid');
// var cookieParser = require('cookie-parser')
// var session = require('express-session')

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
            // if(result && req.body.keep){

            //     req.session.user = result

            //     console.log("result.id = " + result.id)
            //     userDAO.removeToken(result.id, function(err){
            //         console.log("old token removed")
            //         if(err) return next(err)
            //         var newToken = uuid()
            //         var params = {
            //             token : newToken,
            //             user_id : result.id,
            //             max_date : nowAddOneDay()
            //         }
            //         userDAO.makeToken(params, function(err){
            //             console.log("new token created")
            //             if(err) return next(err)
            //             res.cookie('token', newToken, {
            //                 maxAge : 1000 * 60 * 60 * 24,
            //                 //httpOnly : true,
            //                 //  secure : true  ssl만 응답해준다.
            //             })
            //             console.log("set new token to cookie")
            //             res.redirect('/')
            //         })
            //     })
            //}if(result && !req.body.keep){
            if(result){
                req.session.user = result
                console.log(req.session.user)
                res.redirect('/')
            }else{
                res.writeHead(401, {"Content-Type" : "text/html; charset=utf-8"})
                res.end(`<script>
                            alert("ID와 비밀번호를 확인해주세요.")
                            location.href = '/user/login'
                        </script>`)
            }
        })
    })
});

router.get('/detail', (req, res, next) => {
    userDAO.userDetail(req.query.id, (err, result) => {
        if(err) return next(err)
        res.render('userDetail',{userDetail : result})
    })
});

router.get('/logout', function(req, res, next){
    req.session.destroy();
    //res.clearCookie('token')
    res.redirect('/');
})

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

router.get('/delete', function(req, res, next){
    userDAO.userDelete(req.query.no, function(err, result){
        if(err) return next(err)
        res.redirect('/user/list')
    })
})

router.post('/modify', function(req, res, next){
    var param = [req.body, req.query.id]
    userDAO.userModify(param, function(err, result){
        if(err) return next(err)
        res.redirect('/user/detail?no='+req.query.no)
    })
})


module.exports = router

nowAddOneDay = () => {
    return new Date(new Date().getTime() + (1000*60*60*24))
}
   