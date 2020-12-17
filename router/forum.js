var express = require('express')
var router = express.Router()

const forumDAO = require('../model/DAO/forumDAO');
var path = require('path')
var fs = require('fs-extra')
var multer = require('multer')

const crypto = require('crypto');

router.use(express.static('public'))


router.get('/', function (req, res, next) {
    console.log(req.query)
    forumDAO.getArticleMeta(parseInt(req.query.page), (err, articleMeta)=>{
        if(err) return next(err) 
        console.log(articleMeta)
        res.render('forum', {article : articleMeta})
    })
});

router.get('/write', function (req, res) {
    res.render('forum_write')
});

router.post('/write', (req, res, next) => {
    console.log(req.body)
    res.render('forum')
});

router.get('/view', function (req, res) {
    console.log(req.query)
    forumDAO.getArticle(parseInt(req.query.article), (err, articleData)=>{
        console.log(articleData)
        res.render('forum_detail', {data : articleData})
    })
});

router.post('/comment', function (req, res) {
    console.log(req.query)
})

router.post('/write/upload', function (req, res, next) {
    console.log(req.body)
    res.render('forum_write')
});

module.exports = router

