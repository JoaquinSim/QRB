const grupos = (sequelize, type)=>{
    return sequelize.define('grupos', {
        id_grupo: { 
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        nombre_grupo:type.STRING,
        rutas_grupo:type.STRING,
        descripcion_grupo:type.STRING,
        foto_grupo:type.TEXT,
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