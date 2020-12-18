var con = require('../connection');

var forumDAO = {
    getArticle : (param, callback) => {
        var sql = `select * from kimchi.board where article_no = ?`
        con.query(sql, param, function(err,result){
            if(err) return callback(err)
            callback(null, result[0])
        })
    },

    getArticleMeta : (param, callback) => {
        var sql = `select article_no, b.title as a_title, 
                            user_id, 
                            s.title as s_title, 
                            rating as rt, 
                            s.show_id as show_id
                    from kimchi.board b 
                        join kimchi.show_info s 
                            on b.show_id = s.show_id 
                    limit ?, 10`
        con.query(sql, param, function(err,result){
            if(err) return callback(err)
            callback(null, result)
        })
    },

    getComment : (param, callback) => {
        var sql = `select * from kimchi.comment where article_no = ?`
        con.query(sql, param, function(err,result){
            if(err) return callback(err)
            callback(null, result)
        })
    },

    insertComment : (param, callback) => {
        var sql = `insert into kimchi.comment(user_id, article_no, comment) values (?, ?, ?)`
        con.query(sql, param, function(err,result){
            if(err) return callback(err)
            callback(null, result)
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

    addLike : (param, callback) => {
        var sql = 'CALL AddLike(?, ?)'
        con.query(sql, param, function(err,result){
            if(err) return callback(err)
            callback(null, result)
        })
    },

    deleteLike : (param, callback) => {
        var sql = 'CALL DeleteLike(?, ?)'
        con.query(sql, param, function(err,result){
            if(err) return callback(err)
            callback(null, result)
        })
    },
    
    checkLike : (param, callback) => {
        var sql = 'select count(user_id) as result from kimchi.like where user_id=? and article_no = ?'
        con.query(sql, param, function(err,result){
            if(err) return callback(err)
            callback(null, result[0])
        })
    },
}
module.exports = forumDAO;