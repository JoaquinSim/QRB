const perdidaRobada = (sequelize, type)=>{
    return sequelize.define('perdidasRobadas', {
       /* id_perdidaRobada: { 
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, */
        fecha_perdida_perdidaRobada:type.DATE,
        lugarPerdida_perdidaRobada:type.STRING,
        ubicacion_perdidaRobada:type.STRING,
        /*
        idBicicleta_perdidaRobada:type.INTEGER,
        idCliente_perdidaRobada:type.INTEGER,
        */
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