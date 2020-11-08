var con = require('../connection');

var userDAO = {
    getUserSalt : (id, callback) => {
        var sql = 'select `salt` from `kimchi`.`user` where id = ?'
        con.query(sql, id, function(err, result){
            if(err) return callback(err)
            callback(null, result[0])
        })
    },

    userSelectOne : (id, callback) => {
        // nott implemented
        var sql = 'select * from `kimchi`.`user` where id = ? and password = ?'
        con.query(sql, id, function(err, result){
            if(err) return callback(err)
            callback(null, result[0])
        })
    },

    userAdd : function(param, callback){
        var sql = 'insert into `kimchi`.`user` set ?'
        con.query(sql, param, function(err, result){
            if(err) return callback(err)
            callback(null, result)
        })
    },

}

module.exports = userDAO;