var express = require('express')
var router = express.Router()

const forumDAO = require('../model/DAO/forumDAO');
const infoDAO = require('../model/DAO/infoDAO');
var path = require('path')
var fs = require('fs-extra')
var multer = require('multer')

const crypto = require('crypto');
const { isUndefined } = require('util');

router.use(express.static('public'))

function replaceAll(str, searchStr, replaceStr) {

    return str.split(searchStr).join(replaceStr);
 }
 


router.get('/', function (req, res, next) {
    console.log(req.query)
    page = parseInt(req.query.page) - 1
    if(page <= 0)
        page = 0
    forumDAO.getArticleMeta(page, (err, articleMeta)=>{
        if(err) return next(err) 
        console.log(articleMeta)
        res.render('forum', {article : articleMeta})
    })
});

router.get('/write', function (req, res) {
    res.render('forum_write')
});

// router.get('/write/modify', function (req, res) {
//     res.render('forum_write')
// });

router.post('/write/upload', function (req, res, next) {
    
    infoDAO.searchShowIDwithTitle(req.body.show_name, (err, showid) => {
        if(err) return next(err) 
        console.log(showid)
        if(showid === undefined){
            res.writeHead(401, {"Content-Type" : "text/html; charset=utf-8"})
                    res.end(`<script>
                                alert("영화/방송의 제목을 확인하세요")
                                location.href = '/forum/write'
                            </script>`)
        }else{
            body = replaceAll(req.body.body, '\n', '<br>')
            param = [showid.show_id, req.body.user_id, req.body.title, body, parseInt(req.body.rating)]
            console.log(param)
            forumDAO.writeArticle(param,  (err, result) => {
                if(err) return next(err) 
                res.redirect('/forum?page=1')
            })
        }
    })
});

// router.post('/write/delete', function (req, res, next) {
//     console.log(req.body)
//     res.render('forum')
// });

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

router.post('/search', function (req, res, next) {
    console.log('SEARCHING with : '+ req.body.target)
    infoDAO.searchWithString(req.body.target, (err, searchResult) => {
        if(err) return next(err) 
        console.log('SEARCH RESULT : ',searchResult)
        res.render('forum', {article : searchResult[0]})
    })
});




module.exports = router

