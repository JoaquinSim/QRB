const bicicleta = (sequelize, type)=>{
    return sequelize.define('bicicletas', {
        id_bicicleta: { 
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        nombreCompleto_cliente: type.STRING,

        //terminar datos

        username_cliente: type.STRING(99),
        creacionBicicleta:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        },
        actualizacionBicicleta:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        }
    }, {
        timestamps: false,
    })
}

module.exports = bicicleta