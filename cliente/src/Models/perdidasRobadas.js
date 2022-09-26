const perdidaRobada = (sequelize, type)=>{
    return sequelize.define('perdidasRobadas', {
        id_perdidaRobada: { 
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        fecha_perdida_perdidaRobada:type.STRING,
        lugarPerdida_perdidaRobada:type.STRING,
        ubicacion_perdidaRobada:type.STRING,

        creacionperdidaRobada:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        },
        actualizacionperdidaRobada:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        }
    }, {
        timestamps: false,
    })
}

module.exports = perdidaRobada