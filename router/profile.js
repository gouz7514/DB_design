var express = require('express');
const infoDAO = require('../model/DAO/infoDAO');
var router = express.Router()

router.use(express.static('public'))


router.get('/actor_:id', function (req, res, next) {
    infoDAO.getActorInfo(parseInt(req.params.id), (err, actorInfo)=>{
        if(err) return next(err) 
        profileInfo = {
            name : actorInfo.name,
            birth : actorInfo.birth,
            death : actorInfo.death,
            description : actorInfo.description.replaceAll(' ',"&nbsp;")
        }
        console.log(profileInfo)
        res.render('profile', {profileInfo : actorInfo})
    })
});

router.get('/director_:id', function (req, res, next) {
    infoDAO.getActorInfo(parseInt(req.params.id), (err, directorInfo)=>{
        if(err) return next(err) 
        res.render('profile', {profileInfo : directorInfo})
    })
});

module.exports = router

String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
}
