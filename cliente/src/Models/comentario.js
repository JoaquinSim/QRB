const comentario = (sequelize, type)=>{
    return sequelize.define('comentarios', {
        id_comentario: { 
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 

        creacionComentario:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        },
        actualizacionComentario:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull:false
        }
    }, {
        timestamps: false,
    })
}

module.exports = comentario