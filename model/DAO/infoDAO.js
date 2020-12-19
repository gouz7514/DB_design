var con = require('../connection');

var infoDAO = {
    getShowBrief : (callback) => {
        var sql = 'select show_id, title, poster from kimchi.show_info order by data_added desc limit 8'
        con.query(sql, function(err,result){
            if(err) return callback(err)
            callback(null, result)
        })
    },

    getShowBrief20 : (callback) => {
        var sql = 'select show_id, title, poster from kimchi.show_info order by data_added desc limit 20'
        con.query(sql, function(err,result){
            if(err) return callback(err)
            callback(null, result)
        })
    },

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

    getActorInfo : (param, callback) => {
        var sql = `select * from kimchi.actor where actor_id = ?`
        con.query(sql, param, function(err,result){
            if(err) return callback(err)
            callback(null, result[0])
        })
    },

    getDirectorInfo : (param, callback) => {
        var sql = `select * from kimchi.director where director_id = ?`
        con.query(sql, param, function(err,result){
            if(err) return callback(err)
            callback(null, result[0])
        })
    },

    searchWithString : (param, callback) => {
        param = '%' + param + '%'
        console.log('Searching title contain : ' + param)
        var sql = 'CALL SearchWithTitle(?)'
        con.query(sql, param, function(err,result){
            if(err) return callback(err)
            callback(null, result)
        })
    },

    searchWithShowID : (param, callback) => {
        var sql = 'select * from kimchi.board where show_id = ?'
        con.query(sql, param, function(err,result){
            if(err) return callback(err)
            callback(null, result)
        })
    },

    searchShowIDwithTitle : (param, callback) => {
        param = '%' + param + '%'
        var sql = 'select show_id from kimchi.show_info where title like ?'
        con.query(sql, param, function(err,result){
            if(err) return callback(err)
            callback(null, result[0])
        })
    },

}

module.exports = infoDAO;