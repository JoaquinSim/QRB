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
        estado_bicicleta: type.BOOLEAN,
        imagen_bicicleta: type.TEXT,
        codigo_bicicleta:type.STRING,
        /*
        id_comentario:type.INTEGER,
        id_rin:type.INTEGER,
        id_cliente:type.INTEGER,
        */ 
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