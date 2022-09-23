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
        fechaNacimiento_cliente:type.DATE,
        foto_cliente: type.TEXT,
        celular_cliente: type.INTEGER,
        estado_cliente:type.BOOLEAN,
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