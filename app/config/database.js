const mysql = require('mysql2')

// const pool = mysql.createConnection({
//     host:process.env.DB_HOST,
//     port:process.env.DB_PORT,
//     user:process.env.DB_USERNAME,
//     password:process.env.DB_PASSWORD,
//     database:process.env.DB_DATABASE,
// })
const pool = mysql.createConnection({
    host:'127.0.0.1',
    port:'3306',
    user:'user',
    password:'123',
    database:'MYSQL',
})
pool.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("database connected");
    }
})
module.exports = pool;