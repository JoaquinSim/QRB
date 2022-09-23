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
//Traer los modelos
const clientesModelo = require('../Models/cliente')
const ubicacionClientesModelo = require('../Models/ubicacion_cliente')
const detalleClienteModelo = require('../Models/detalle_cliente')
const  bicicletaModelo = require('../Models/bicicletas')
const perdidaRobadaModelo = require('../Models/perdidasRobadas')
const rinModelo = require('../Models/rin')
const gruposModelo = require('../Models/gruposCiclismo')
const detalleGruposModelo = require('../Models/detalleGrupo')
const tipoCiclismoModelo = require('../Models/tiposCiclismo')
const comentariosModelo = require('../Models/comentario')



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


//Clientes
const cliente = clientesModelo(sequelize, Sequelize)//sincronia, migracion sin ser migracion
const ubicacion_cliente = ubicacionClientesModelo(sequelize, Sequelize)
const detalle_cliente = detalleClienteModelo(sequelize, Sequelize)

//Bicicletas
const bicicleta = bicicletaModelo(sequelize, Sequelize)
const perdidaRobada = perdidaRobadaModelo(sequelize, Sequelize)
const rin = rinModelo(sequelize, Sequelize)

//Grupos
 const grupos = gruposModelo(sequelize, Sequelize)
 const detalleGrupos = detalleGruposModelo(sequelize, Sequelize)
const tiposCiclismo = tipoCiclismoModelo(sequelize, Sequelize)

//Comentarios
const comentario = comentariosModelo(sequelize, Sequelize) 


module.exports = {
    cliente,
    ubicacion_cliente,
    detalle_cliente,
    bicicleta,
    perdidaRobada,
    rin,
    grupos,
    detalleGrupos,
    tiposCiclismo,
    comentario
}





