const ubicacion_cliente = (sequelize, type)=>{
    return sequelize.define('ubicacion_clientes', {
        id_ubicacionCliente: { 
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        pais_ubicacionCliente:type.STRING,
        ciudad_ubicacionCliente: type.STRING,
        barrio_cliente:type.STRING,
        creacionUbicacionCliente:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        },
        actualizacionUbicacionCliente:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        }
    }, {
        timestamps: false,
    })
}

module.exports = ubicacion_cliente