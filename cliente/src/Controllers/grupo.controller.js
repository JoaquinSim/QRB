const grupoCTL = {};
const path = require("path");
const orm = require("../ConfigDataBase/DataBase.orm");
const sql = require("../ConfigDataBase/DataBase.sql");

//mostrar
grupoCTL.mostrar = async (req, res) => {
  const id = req.user.id_cliente;
  const ids = req.params.id;
  const grupo = await sql.query("Select * from grupos where id_grupo = ?", [
    id,
  ]);
  const max = await sql.query("select max(id_grupo) from grupos");
  const tipc = await sql.query(
    "Select * from tiposciclismos where id_tipoCiclismo = ?",
    [ids]
  );
  const maxt = await sql.query(
    "select max(id_tipoCiclismo) from tiposciclismos"
  );
  const detalleGrupo = await sql.query(
    "Select * from detalleGrupos where id_detalleGrupo = ?",
    [ids]
  );
  const maxd = await sql.query(
    "select max(id_detalleGrupo) from detalleGrupos"
  );
  console.log(detalleGrupo);
  console.log(maxd);
  res.render("grupos/grupos_agregar", { grupo, max, tipc, maxt, detalleGrupo, maxd });
  console.log(tipc);
};

//agregar nuevos grupos
grupoCTL.enviar = async (req, res) => {
  const id = req.user.id_cliente;
  const {
    nombre_grupo,
    rutas_grupo,
    descripcion_grupo,
    id_grupo,
    integrantes_detalleGrupo,
    nombre_tipoCiclismo,
    id_tipoCiclismo,
    id_detalleGrupo
  } = req.body;
  const nuevoGrupo = {
    id_grupo: id_grupo,
    nombre_grupo,
    rutas_grupo,
    descripcion_grupo,
    id_cliente: id,
  };
  const nuevoTipoCiclismo = {
    id_tipoCiclismo: id_tipoCiclismo,
    nombre_tipoCiclismo,
    estado_tipoCiclismo: 1,
    detalleGrupoIdDetalleGrupo: id_grupo,
    id_cliente: id,
  };
  const nuevoDetalleGrupo = {
    id_detalleGrupo:id_detalleGrupo,
    integrantes_detalleGrupo,
    grupoIdGrupo: id_grupo,
    id_cliente: id,
  };
  console.log(nuevoDetalleGrupo);
  await orm.grupos.create(nuevoGrupo);
  await orm.detalleGrupos.create(nuevoDetalleGrupo);
  await orm.tiposCiclismo.create(nuevoTipoCiclismo);

  const foto_grupos = req.files.foto_grupo;
  const validacion = path.extname(foto_grupos.name);

  const extencion = [
    ".PNG",
    ".JPG",
    ".JPEG",
    ".GIF",
    ".TIF",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".tif",
  ];

  if (!extencion.includes(validacion)) {
    req.flash("success", "Imagen no compatible.");
  }

  if (!req.files) {
    req.flash("success", "Imagen no insertada.");
  }

  const ubicacion = __dirname + "/../public/IMG/grupos/" + foto_grupos.name;

  foto_grupos.mv(ubicacion, function (err) {
    if (err) {
      return req.flash("message", err);
    }
    console.log("Imagen de grupo ingresada");
    sql.query("UPDATE grupos SET foto_grupo = ? WHERE id_grupo = ?", [
      foto_grupos.name,
      id_grupo,
      console.log(id_grupo),
    ]);
  });

  req.flash("success", "Exito al guardar");
  res.redirect("/grupos/listar/" + id);
};

//Mostrar el listado de grupos
grupoCTL.listar = async (req, res) => {
  const lista = await sql.query("select * from grupos");
  res.render("grupos/grupos_listar", { lista });
};

grupoCTL.traer = async (req, res) => {
  const id = req.params.id;
  const lista = await sql.query("select * from grupos where id_grupo=?", [id]);
  const listaDetalleGrupo = await sql.query(
    "select * from detalleGrupos where grupoIdGrupo=?",
    [id]
  );
  const tipc = await sql.query(
    "Select * from tiposciclismos where id_tipoCiclismo = ?",
    [id]
  );
  res.render("grupos/grupos_editar", { lista, listaDetalleGrupo, tipc });
};

grupoCTL.actualizar = async (req, res) => {
  const id = req.user.id_cliente;
  const {
    nombre_grupo,
    rutas_grupo,
    descripcion_grupo,
    id_grupo,
    integrantes_detalleGrupo,
    nombre_tipoCiclismo,
  } = req.body;
  const actGrupo = {
    nombre_grupo,
    rutas_grupo,
    descripcion_grupo,
    id_cliente: id,
  };
  const actTipoCiclismo = {
    nombre_tipoCiclismo,
    estado_tipoCiclismo: 1,
    detalleGrupoIdDetalleGrupo: id_grupo,
    id_cliente: id,
  };
  const actDetalleGrupo = {
    integrantes_detalleGrupo,
    grupoIdGrupo: id_grupo,
    id_cliente: id,
  };
  await orm.grupos
    .findOne({ where: { id_grupo: id_grupo } })
    .then((actualizacion) => {
      actualizacion.update(actGrupo);
    });
  await orm.detalleGrupos
    .findOne({ where: { grupoIdGrupo: id_grupo } })
    .then((actualizacion) => {
      actualizacion.update(actDetalleGrupo);
    });
    await orm.tiposCiclismo
    .findOne({ where: { detalleGrupoIdDetalleGrupo: id_grupo } })
    .then((actualizacion) => {
      actualizacion.update(actTipoCiclismo);
    });
  req.flash("success", "Exito al guardar");
  res.redirect("/grupos/listar/" + id );
};
grupoCTL.eliminar = async (req, res) => {
  const id = req.user.id_cliente;
  const ids = req.params.id;
  await orm.grupos.destroy({ where: { id_grupo: ids } });
  await orm.detalleGrupos.destroy({ where: { id_detalleGrupo: ids} });
  await orm.tiposCiclismo.destroy({ where: { id_tipoCiclismo: ids } });
  req.flash("success", "Se Elimino Correctamente");
  res.redirect("/grupos/listar/" + id);
};

module.exports = grupoCTL;
