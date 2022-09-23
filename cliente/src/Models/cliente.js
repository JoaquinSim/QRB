const cliente = (sequelize, type)=>{
    return sequelize.define('clientes', {
        id_cliente: { 
            type: type.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },  
        nombreCompleto_cliente: type.STRING,

            //COMPLETAR DATOS

        username_cliente: type.STRING(99),
        creacionCliente:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        },
        actualizacionCliente:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        }
    }, {
        timestamps: false,
    })
}

module.exports = cliente