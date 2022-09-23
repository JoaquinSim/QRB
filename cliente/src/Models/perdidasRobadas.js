const perdidaRobada = (sequelize, type)=>{
    return sequelize.define('perdidasRobadas', {
        id_perdidaRobada: { 
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        nombreCompleto_cliente: type.STRING,

        //terminar datos

        username_cliente: type.STRING(99),
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