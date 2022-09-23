const grupos = (sequelize, type)=>{
    return sequelize.define('grupos', {
        id_grupo: { 
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        nombreCompleto_cliente: type.STRING,

        //terminar datos

        username_cliente: type.STRING(99),
        creacionGrupo:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        },
        actualizacionGrupo:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        }
    }, {
        timestamps: false,
    })
}

module.exports = grupos