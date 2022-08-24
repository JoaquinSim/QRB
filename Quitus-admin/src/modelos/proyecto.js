const proyecto = (sequelize, type) =>{
    return sequelize.define('proyecto',{
        idProyecto:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nombre: type.STRING(99),
        Descripcion: type.STRING(99),
        creacionProyecto:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionProyecto:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    },{
        timeStamp:false,
    })
}   

module.exports = proyecto