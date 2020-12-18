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

router.get('/view', function (req, res, next) {
    console.log(req.query)
    forumDAO.getArticle(parseInt(req.query.article), (err, articleData)=>{
        if(err) return next(err) 
        console.log(articleData)
        forumDAO.getComment(parseInt(req.query.article), (err, comment)=>{
            if(err) return next(err) 
            console.log(comment)
            res.render('forum_detail', {data : articleData, comment : comment})         
        })
    })
});

router.post('/comment', function (req, res, next) {
    param = [req.body.user_id, parseInt(req.body.article_no), req.body.comment]
    forumDAO.insertComment(param, (err, result)=>{
        if(err) return next(err) 
        console.log(result)
        res.redirect('/forum/view'+'?article='+req.body.article_no)
    })
})

router.post('/upvote', function (req, res, next) {
    param = [req.body.user_id, parseInt(req.body.article_no)]
    forumDAO.checkLike(param, (err, result)=>{
        if(err) return next(err) 
        if(result.result == 0){
            forumDAO.addLike(param, (err, result)=>{
                if(err) return next(err) 
                console.log(result)
            })
        } else{
            forumDAO.deleteLike(param, (err, result)=>{
                if(err) return next(err)
                console.log(result) 
            })
        }
        res.redirect('/forum/view'+'?article='+req.body.article_no)
    })
})

router.post('/write/upload', function (req, res, next) {
    console.log(req.body)
    res.render('forum_write')
});

module.exports = router

