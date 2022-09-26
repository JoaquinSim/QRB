const cliente = (sequelize, type)=>{
    return sequelize.define('clientes', {
        id_cliente: { 
            type: type.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },  
        nombreCompleto_cliente: type.STRING,
        clave_cliente: type.STRING,
        correo_cliente: type.STRING,
        cedula_cliente: type.STRING(10),
        username_cliente: type.STRING(99),
        fechaNacimiento_cliente:type.STRING,
        foto_cliente: type.STRING,
        celular_cliente: type.STRING,
        estado_cliente:type.STRING,
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