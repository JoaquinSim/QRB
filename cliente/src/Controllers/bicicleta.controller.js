const bicicletaCTL = {};
const path = require("path");
const orm = require("../ConfigDataBase/DataBase.orm");
const sql = require("../ConfigDataBase/DataBase.sql");

//mostrar
bicicletaCTL.agregarBicicleta = async (req, res) => {
  const id = req.user.id_cliente;
  const ids = req.params.id
  const bicicleta = await sql.query("Select * from bicicletas where id_bicicleta = ?", [
    id,
  ]);
  const max = await sql.query("select max(id_bicicleta) from bicicletas");
  const tipc = await sql.query(
    "Select * from perdidasrobadas where id_perdidaRobada = ?",
    [ids]
  );
  const maxt = await sql.query(
    "select max(id_perdidaRobada) from perdidasrobadas"
  );
  const rin = await sql.query(
    "Select * from rines where id_rin = ?",
    [ids]
  );
  const maxd = await sql.query(
    "select max(id_rin) from rines"
  );
  console.log(rin);
  console.log(maxd);
  res.render("bicicleta/bicicleta_agregar", { bicicleta, max, tipc, maxt, rin, maxd});
  console.log(tipc);
};

//agregar nuevos bicicletas
bicicletaCTL.enviar = async (req, res) => {
  const id = req.user.id_cliente;
  const {
    marca_bicicleta,
    colorPrimario_bicicleta,
    colorSecundario_bicicleta,
    id_bicicleta,
    descripcion_bicicleta,
    estado_bicicleta,
    codigo_bicicleta,
    id_perdidaRobada,
    id_rin,
    nombre_rin,
    fecha_perdida_perdidaRobada,
    lugarPerdida_perdidaRobada,
  } = req.body;
  const nuevaBicicleta = {
    marca_bicicleta,
    colorPrimario_bicicleta,
    colorSecundario_bicicleta,
    id_bicicleta:id_bicicleta,
    descripcion_bicicleta,
    estado_bicicleta,
    codigo_bicicleta,
    id_cliente: id,
  };
  const nuevoPerdidaRobada = {
    id_perdidaRobada: id_perdidaRobada,
    fecha_perdida_perdidaRobada,
    lugarPerdida_perdidaRobada,
    bicicletaIdBicicleta: id_bicicleta,
    id_cliente: id,
  };
  const nuevoRin = {
    id_rin:id_rin,
    nombre_rin,
    bicicletaIdBicicleta:id_bicicleta,
    id_cliente:id
  };
  console.log(nuevoPerdidaRobada);
  await orm.bicicleta.create(nuevaBicicleta);
  await orm.perdidaRobada.create(nuevoPerdidaRobada);
  await orm.rin.create(nuevoRin);

  const foto_bicicleta = req.files.imagen_bicicleta;
  const validacion = path.extname(foto_bicicleta.name);

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

  const ubicacion = __dirname + "/../public/IMG/bicicleta/" + foto_bicicleta.name;

  foto_bicicleta.mv(ubicacion, function (err) {
    if (err) {
      return req.flash("message", err);
    }
    console.log("Imagen de bicicleta ingresada");
    sql.query("UPDATE bicicletas SET imagen_bicicleta = ? WHERE id_bicicleta = ?", [
      foto_bicicleta.name,
      id_bicicleta,
      console.log(id_bicicleta),
    ]);
  });

  req.flash("success", "Exito al guardar");
  res.redirect("/bicicleta/listar/" + id);
};

//Mostrar el listado de grupos
bicicletaCTL.listar = async (req, res) => {
  const lista = await sql.query("select * from bicicletas");
  res.render("bicicleta/bicicleta_listar", { lista });
};

bicicletaCTL.traer = async (req, res) => {
  const id = req.params.id;
  const lista = await sql.query("select * from bicicletas where id_bicicleta=?", [id]);
  const listaDetalleGrupo = await sql.query(
    "select * from perdidasrobadas where bicicletaIdBicicleta=?",
    [id]
  );
  const tipc = await sql.query(
    "Select * from rines where bicicletaIdBicicleta = ?",
    [id]
  );
  res.render("bicicleta/bicicleta_editar", { lista, listaDetalleGrupo, tipc });
};

bicicletaCTL.actualizar = async (req, res) => {
  const id = req.user.id_cliente;
  const {
    marca_bicicleta,
    colorPrimario_bicicleta,
    colorSecundario_bicicleta,
    id_bicicleta,
    descripcion_bicicleta,
    estado_bicicleta,
    codigo_bicicleta,
    id_perdidaRobada,
    id_rin,
    nombre_rin,
    fecha_perdida_perdidaRobada,
    lugarPerdida_perdidaRobada,
  } = req.body;
  const actBicicleta= {
    marca_bicicleta,
    colorPrimario_bicicleta,
    colorSecundario_bicicleta,
    id_bicicleta:id_bicicleta,
    descripcion_bicicleta,
    estado_bicicleta,
    codigo_bicicleta,
    id_cliente: id,
  };
  const actperdidaRobo = {
    id_perdidaRobada: id_perdidaRobada,
    fecha_perdida_perdidaRobada,
    lugarPerdida_perdidaRobada,
    bicicletaIdBicicleta: id_bicicleta,
    id_cliente: id,
  };
  const actRin = {
    id_rin:id_rin,
    nombre_rin,
    bicicletaIdBicicleta:id_bicicleta,
    id_cliente:id
  };
  await orm.bicicleta
    .findOne({ where: { id_bicicleta: id_bicicleta } })
    .then((actualizacion) => {
      actualizacion.update(actBicicleta);
    });
  await orm.perdidaRobada
    .findOne({ where: { bicicletaIdBicicleta: id_bicicleta } })
    .then((actualizacion) => {
      actualizacion.update(actperdidaRobo);
    });
    await orm.rin
    .findOne({ where: { bicicletaIdBicicleta: id_bicicleta } })
    .then((actualizacion) => {
      actualizacion.update(actRin);
    });
  req.flash("success", "Exito al guardar");
  res.redirect("/bicicleta/listar/" + id );
};
bicicletaCTL.eliminar = async (req, res) => {
  const id = req.user.id_cliente;
  const ids = req.params.id;
  await orm.bicicleta.destroy({ where: { id_bicicleta: ids } });
  await orm.perdidaRobada.destroy({ where: { id_perdidaRobada: ids} });
  await orm.rin.destroy({ where: { id_rin: ids } });
  req.flash("success", "Se Elimino Correctamente");
  res.redirect("/bicicleta/listar/" + id);
};

module.exports = bicicletaCTL;
