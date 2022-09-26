const detalle_cliente = (sequelize, type)=>{
    return sequelize.define('detalle_clientes', {
        id_detalleCliente: { 
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        idCliente_detalleCliente:type.INTEGER,
        idTipoCiclismo_detalleCliente:type.INTEGER,
        creacionDetalleCliente:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        },
        actualizacionDetalleCliente:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        }
    }, {
        timestamps: false,
    })
}

module.exports = detalle_cliente