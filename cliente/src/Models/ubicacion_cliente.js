const ubicacion_cliente = (sequelize, type)=>{
    return sequelize.define('ubicacion_clientes', {
        id_ubicacionCliente: { 
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        nombreCompleto_cliente: type.STRING,

        //terminar datos

        username_cliente: type.STRING(99),
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