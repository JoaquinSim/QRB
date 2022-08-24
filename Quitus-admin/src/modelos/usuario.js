const usuario = (sequelize, type) =>{
    return sequelize.define('usuarios',{
        idUsuario:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: type.STRING(99),
        password: type.STRING(99),
        creacionUsuario:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionUsuario:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    },{
        timeStamp:false,
    })
}   

module.exports = usuario