const Sequelize = require('sequelize')
const mysql = require('mysql2/promise')

const dbname = process.env.DB_SCHEMAS || 'qrb'

mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || '3306',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || ''
}).then(Connection =>{
    Connection.query(`CREATE DATABASE IF NOT EXISTS ${dbname}`).then((res)=>{
        console.info('Base de datos creada o encontrada')
    })
})

const clientesModelo = require('../Models/cliente')

const sequelize = new Sequelize(
    'qrb',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 10,
            min: 0,
            require: 30000,
            idle: 10000
        }
    }
)

sequelize.authenticate().then(()=>{
    console.log('Conectado!!');
})
.catch(err=>{
    console.log('Error al conectarse');
})

sequelize.sync({force: false})
.then(()=>{
    console.log('Tablas sincronizadas');
})

const cliente = clientesModelo(sequelize, Sequelize)//sincronia, migracion sin ser migracion

module.exports = {
    cliente
}





