var express = require('express');
const showDAO = require('../model/DAO/showDAO');
var router = express.Router()

router.use(express.static('public'))

router.get('/:showId', (req, res, next) => {
    showDAO.getShowInfo(parseInt(req.params.showId), (err, showInfo)=>{
        if(err) return next(err) 
        console.log(showInfo)
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
        }
        console.log(showData)
        res.render('detail', showData)
    })
});

String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
}

module.exports = router