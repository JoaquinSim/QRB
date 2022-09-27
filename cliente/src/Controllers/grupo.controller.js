const grupoCTL = {};
const orm = require("../ConfigDataBase/DataBase.orm");
const sql = require("../ConfigDataBase/DataBase.sql");

//mostrar
grupoCTL.mostrar = (req, res) => {
  res.render("grupos/grupos_agregar");
};

//Mostrar el listado de grupos
grupoCTL.listar = async (req, res) => {
  const lista = await sql.query("select * from grupos");
  res.render("grupos/grupos_listar", { lista });
};

//agregar nuevos grupos
grupoCTL.enviar = async (req, res) => {
  const id = req.user.id_cliente
  const { nombre_grupo } = req.body;
  const nuevoGrupo = {
    nombre_grupo,
    id_cliente: id
  };
  await orm.grupos.create(nuevoGrupo).then(() => {
    req.flash("success", "Exito al guardar");
    res.redirect("/grupos/listar/" + id);
  });
};
grupoCTL.traer = async (req, res) => {
    const id = req.params.id;
    const lista = await sql.query("select * from grupos where id_grupo=?", [
      id,
    ]);
    res.render("grupos/grupos_editar", { lista });
};


grupoCTL.actualizar = async(req,res) =>{
    const id = req.user.id_cliente
    const ids = req.params.id
    const {nombre_grupo, id_grupo} = req.body
    const nuevoGrupo = {
        nombre_grupo, 
    }
    await orm.grupos.findOne({where:{id_grupo:id_grupo}})
    .then(actualizacion=>{
        actualizacion.update(nuevoGrupo)
    })
    req.flash("success","Exito al guardar")
     res.redirect('/grupos/listar/'+ id);
}

module.exports = grupoCTL;
