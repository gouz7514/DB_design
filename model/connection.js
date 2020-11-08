const mysql = require ( 'mysql'); 
 
const connection = mysql.createConnection ({ 
    host : "localhost",
    port : 3306,
    user : "dbdesign",
    password : "P@ssw0rd",
    database : "kimchi",
}); 

module.exports = connection;