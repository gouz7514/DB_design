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
        var sql = 'select * from `kimchi`.`user` where id = ? and password = ?'
        con.query(sql, id, function(err, result){
            if(err) return callback(err)
            callback(null, result[0])
        })
    },

    userDetail : (id, callback) => {
        var sql = 'select * from `kimchi`.`user` where id = ?'
        con.query(sql, id, function(err, result){
            if(err) return callback(err)
            callback(null, result[0])
        })
    },

    userDelete : (no, callback) => {
        var sql = 'delete from `kimchi`.`user` where id = ?'
        con.query(sql, no, (err, result) => {
            if(err) return callback(err)
            callback(null, result) 
        })
    },
    
    userModify : (param, callback) => { 
        var sql = 'update `kimchi`.`user` set ? where id = ?'
        con.query(sql, param, (err, result) => {
            if(err) return callback(err)
            callback(null, result) 
        })
    },

    userAdd : function(param, callback){
        var sql = 'insert into `kimchi`.`user` set ?'
        con.query(sql, param, function(err, result){
            if(err) return callback(err)
            callback(null, result)
        })
    },

    makeToken : (param, callback) => {
        var sql = 'select count(*) as count from kimchi.tokens where user_id = ?'
        con.query(sql, param.user_id, (err,result)=>{
            if(err) return callback(err)
            if(result[0].count < 1){
                var sql = 'insert into tokens set ?'
                con.query(sql, param, (err, result) => {
                    if(err) return callback(err)
                    callback(null, result) 
                })
            }else{
                return callback(new Error("이미 발급된 토큰이 있습니다"))
            }
        })
        
    },
    checkToken : (token, callback) => {
        var sql = `select u.* from kimchi.tokens t, kimchi.user u
                    where t.user_id = u.userid and
                    t.token = ? and 
                    t.max_date >= now()`
        con.query(sql, token, function(err,result){
            if(err) return callback(err)
            callback(null, result[0])
        })
    },

    removeToken : (param, callback) => {
        console.log("Remove token : "+param)
        var sql = 'delete from kimchi.tokens where user_id = ? or max_date < now()'
        con.query(sql, param, function(err,result){
            if(err) return callback(err)
            callback(null, result)
        })
    }

}

module.exports = userDAO;