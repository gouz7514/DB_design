var con = require('../connection');

var userDAO = {
    userAdd : function(id, callback){
        // nott implemented
        var sql = 'select * from users where id = ? and pw = ?'
        con.query(sql, id, function(err, result){
            if(err) return callback(err)
            callback(null, result[0])
        })
    },

}

module.exports = userDAO;