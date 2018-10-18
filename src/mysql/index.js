const mysql = require('mysql')
const {database} = require('../config')

const pool  = mysql.createPool({
  host     : database.HOST,
  user     : database.USERNAME,
  password : database.PASSWORD,
  database : database.DATABASE
});

global.query =(sql, values)=> {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection)=> {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}

global.createTable = ( sql )=> query( sql, [] )

const Article = require('./article')
const ArticleType = require('./articleType')
const Type = require('./type')
const Admin = require('./admin')

module.exports = {
    Article,
    Type,
    Admin,
    ArticleType,
}
