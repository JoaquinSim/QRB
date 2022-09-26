const bicicleta = (sequelize, type)=>{
    return sequelize.define('bicicletas', {
        id_bicicleta: { 
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        marca_bicicleta:type.STRING,
        colorPrimario_bicicleta: type.STRING,
        colorSecundario_bicicleta: type.STRING,
        descripcion_bicicleta: type.STRING,
        estado_bicicleta: type.STRING,
        imagen_bicicleta: type.STRING,
        codigo_bicicleta: type.STRING, 
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