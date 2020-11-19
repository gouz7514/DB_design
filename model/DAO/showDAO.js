var con = require('../connection');

var showDAO = {
    getShowInfo : (param, callback) => {
        var sql = 'select * from kimchi.show_info where show_id = ?'
        con.query(sql, param, function(err,result){
            if(err) return callback(err)
            callback(null, result[0])
        })
    },

    getShowActor : (param, callback) => {
        var sql = `select * from kimchi.actor
                    where actor_id = (select actor_id 
                                        form kimchi.show_actor sa 
                                        where sa.show_id = ?)`
        con.query(sql, param, function(err,result){
            if(err) return callback(err)
            callback(null, result)
        })
    },

    getShowDirector : (param, callback) => {
        var sql = `select * from kimchi.director
                    where director_id = (select director_id 
                                        form kimchi.show_director sd 
                                        where sd.show_id = ?)`
        con.query(sql, param, function(err,result){
            if(err) return callback(err)
            callback(null, result)
        })
    },

}

module.exports = showDAO;