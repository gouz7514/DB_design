var express = require('express');
const infoDAO = require('../model/DAO/infoDAO');
var router = express.Router()

router.use(express.static('public'))

router.get('/', (req, res, next) => {
    infoDAO.getShowBrief20((err, showInfo)=>{
        if(err) return next(err) 
          res.render('show', {info : showInfo}) 
      })
})

router.get('/:showId', (req, res, next) => {
    infoDAO.getShowInfo(parseInt(req.params.showId), (err, showInfo)=>{
        if(err) return next(err) 
        //console.log(showInfo)
        infoDAO.getShowActor(parseInt(req.params.showId), (err, actorInfo)=>{
            if(err) return next(err) 
            infoDAO.getShowDirector(parseInt(req.params.showId), (err, directorInfo)=>{
                if(err) return next(err) 
                //console.log(actorInfo[0], directorInfo[0])

                showData = {
                    show_id : showInfo.show_id,
                    title : showInfo.title,
                    country : showInfo.country,
                    data_added : showInfo.data_added,
                    release_year : showInfo.release_year,
                    duration : showInfo.duration,
                    type : showInfo.type,
                    poster : showInfo.poster,
                    description : showInfo.description.replaceAll('$$$', '<br>'),
                    actor : actorInfo,
                    director : directorInfo,
                }
                //console.log(showData)
                res.render('detail', showData)
            })
        })

    })
});

String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
}

module.exports = router