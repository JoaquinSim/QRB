const detalleGrupo = (sequelize, type)=>{
    return sequelize.define('detalleGrupos', {
        id_detalleGrupo: { 
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        nombreCompleto_cliente: type.STRING,

        //terminar datos

        username_cliente: type.STRING(99),
        creacionDetalleGrupo:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        },
        actualizacionDetalleGrupo:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        }
    }, {
        timestamps: false,
    })
}

module.exports = detalleGrupo