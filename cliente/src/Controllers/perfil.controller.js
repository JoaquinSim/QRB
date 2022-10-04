const perfilCTL = {};

const path = require("path");
const orm = require("../ConfigDataBase/DataBase.orm");
const sql = require("../ConfigDataBase/DataBase.sql");
var CryptoJS = require("crypto-js");

perfilCTL.mostrar = async (req, res) => {
	const id = req.user.id_cliente;
	const usuarios = await sql.query(
		"select * from clientes where id_cliente = ?",
		[id]
	);
  const tipc = await sql.query(
    "Select * from tiposciclismos"
  );
  const maxt = await sql.query(
    "select max(id_tipoCiclismo) from tiposciclismos"
  );
  const detalleC = await sql.query(
    "Select * from detalle_clientes"
  );
  const maxc = await sql.query(
    "select max(id_detalleCliente) from detalle_clientes"
  );
  console.log(tipc);
  console.log(maxt);
  console.log(detalleC);
  console.log(usuarios);
  console.log(maxc);
	res.render("perfil/perfil_editar", { usuarios,tipc, maxt,detalleC,maxc });
};

perfilCTL.actualizar = async (req, res) => {
  const id = req.user.id_cliente;
  const {
    id_cliente,
    nombreCompleto_cliente,
    correo_cliente,
    fechaNacimiento_cliente,
    foto_cliente,
    estado_cliente,
    username,
    nombre_tipoCiclismo,
  } = req.body;
  const actCliente = {
    id_cliente,
    nombreCompleto_cliente,
    correo_cliente,
    fechaNacimiento_cliente,
    foto_cliente,
    estado_cliente,
    username,
    id_cliente: id,
  };
  const actTipoCiclismo = {
    nombre_tipoCiclismo,
    estado_tipoCiclismo: 1,
    id_cliente: id,
  };
  const actDetalleCliente = {
    clienteIdCliente: id_cliente,
    tiposCiclismoIdTipoCiclismo: id_tipoCiclismo,
    id_cliente: id,
  };
  await orm.cliente
    .findOne({ where: { id_cliente: id_cliente } })
    .then((actualizacion) => {
      actualizacion.update(actCliente);
    });
  await orm.detalle_cliente
    .findOne({ where: { clienteIdCliente: id_cliente } })
    .then((actualizacion) => {
      actualizacion.update(actDetalleCliente);
    });
    await orm.tiposCiclismo
    .findOne({ where: { detalleClienteIdDetalleCliente: id_cliente } })
    .then((actualizacion) => {
      actualizacion.update(actTipoCiclismo);
    });
  req.flash("success", "Exito al guardar");
};

perfilCTL.eliminar = async (req, res) => {
  const id = req.user.id_cliente;
  await orm.cliente.destroy({ where: { id_cliente: id } });
  await orm.detalle_cliente.destroy({ where: { id_detalleCliente: id} });
  await orm.tiposCiclismo.destroy({ where: { id_tipoCiclismo: id } });
  req.flash("success", "Se Elimino Correctamente");
  res.redirect("/");
};
module.exports = perfilCTL
