const detalleGrupo = (sequelize, type)=>{
    return sequelize.define('detalleGrupos', {
        id_detalleGrupo: { 
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        integrantes_detalleGrupo:type.STRING,

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