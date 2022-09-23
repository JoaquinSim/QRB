const mysql = require('mysql')
const {promisify} = require('util')
const {database} = require('../keys')
const pool = mysql.createPool(database)
pool.getConnection((err, connection) =>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('se cerro la conexión a la base de datos');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('La base de datos tiene muchas conexiones')
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('La conexion a la base de datos no realizada')
        }
    }
    if(connection){
        connection.release();
        console.log('Base de datos Conectada');
        return
    } 
})

pool.query = promisify(pool.query)

module.exports = pool