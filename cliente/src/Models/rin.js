const rin = (sequelize, type)=>{
    return sequelize.define('rines', {
        id_rin: { 
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        nombre_rin:type.STRING,
        estado_rin:type.STRING,
        //idUsuario_rin:type.STRING,
        creacionRin:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        },
        actualizacionRin:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        }
    }, {
        timestamps: false,
    })
}

module.exports = rin