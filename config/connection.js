// Dependencies
var Sequelize = require("sequelize");

// Creates mySQL connection using Sequelize, the empty string in the third argument spot is our password.
var sequelize = new Sequelize("", "root", "password", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

// Exports the connection for other files to use
module.exports = sequelize;



// var mySQL=require("mysql");

// var connection=mySQL.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"password",
//     port:3306,
//     database: "example_db"
// })

// connection.connect(function(err){
//     if (err){
//         console.error("error connecting: " + err.stack);
//         return;
//     }
//     console.log("connected as id " + connection.threadId)
// })



// module.exports=connection;