const tipoCiclismo = (sequelize, type)=>{
    return sequelize.define('tiposCiclismos', {
        id_tipoCiclismo: { 
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        nombre_tipoCiclismo:type.STRING,
        estado_tipoCiclismo:type.BOOLEAN,
        creaciontipoCiclismo:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        },
        actualizaciontipoCiclismo:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        }
    }, {
        timestamps: false,
    })
}

module.exports = tipoCiclismo