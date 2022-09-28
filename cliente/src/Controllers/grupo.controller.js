const grupoCTL = {};
const path = require("path");
const orm = require("../ConfigDataBase/DataBase.orm");
const sql = require("../ConfigDataBase/DataBase.sql");

//mostrar
grupoCTL.mostrar = async (req, res) => {
  const id = req.user.id_cliente
  const tienda = await sql.query('Select * from grupos where id_grupo = ?', [id])
  const max = await sql.query('select max(id_grupo) from grupos')
  res.render("grupos/grupos_agregar", { tienda, max});
};

//agregar nuevos grupos
grupoCTL.enviar = async (req, res) => {
  const id = req.user.id_cliente;
  const { nombre_grupo, rutas_grupo, descripcion_grupo, id_grupo, integrantes_detalleGrupo, nombre_tipoCiclismo } = req.body;
  const nuevoGrupo = {
    id_grupo: id_grupo,
    nombre_grupo,
    rutas_grupo,
    descripcion_grupo,
    id_cliente: id,
  };
  const nuevoDetalleGrupo = {
    integrantes_detalleGrupo, 
    grupoIdGrupo: id_grupo
  };
  const nuevoTipoCiclismo = {
    nombre_tipoCiclismo,
    id_cliente: id
  };
  console.log(id_grupo);
  await orm.grupos.create(nuevoGrupo);
  await orm.detalleGrupos.create(nuevoDetalleGrupo)
  await orm.tiposCiclismo.create(nuevoTipoCiclismo)

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
  res.render("grupos/grupos_listar", { lista  });
};

grupoCTL.traer = async (req, res) => {
  const id = req.params.id;

  const detalle = await sql.query("SELECT * FROM detalleGrupos WHERE grupoIdGrupo  =?", [id]);

  res.render("grupos/grupos_editar", {  detalle});
};

grupoCTL.actualizar = async (req, res) => {
  const id = req.user.id_cliente;
  const ids = req.params.id;
  const { nombre_grupo, id_grupo } = req.body;
  const nuevoGrupo = {
    nombre_grupo,
  };
  await orm.grupos
    .findOne({ where: { id_grupo: id_grupo } })
    .then((actualizacion) => {
      actualizacion.update(nuevoGrupo);
    });
  req.flash("success", "Exito al guardar");
  res.redirect("/grupos/listar/" + id);
};

module.exports = grupoCTL;
