var con = require('../connection');

var infoDAO = {
    getShowInfo : (param, callback) => {
        var sql = 'select * from kimchi.show_info where show_id = ?'
        con.query(sql, param, function(err,result){
            if(err) return callback(err)
            callback(null, result[0])
        })
    },

    getShowActor : (param, callback) => {
        var sql = `select a.actor_id, name, birth, death, a.description
                    from kimchi.show_actor sa join kimchi.actor a  
                    on sa.actor_id = a.actor_id
                    where sa.show_id = ?`
        con.query(sql, param, function(err,result){
            if(err) return callback(err)
            callback(null, result)
        })
    },

    getShowDirector : (param, callback) => {
        var sql = `select d.director_id, name, birth, death, d.description
                    from kimchi.show_director sd join kimchi.director d
                    on sd.director_id = d.director_id
                    where sd.show_id = ?`
        con.query(sql, param, function(err,result){
            if(err) return callback(err)
            callback(null, result)
        })
    },

}

module.exports = infoDAO;