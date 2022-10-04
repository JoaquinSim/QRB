const sql = require("../ConfigDataBase/DataBase.sql");
const perfilCTL = {};

perfilCTL.mostrar = async (req, res) => {
  const id = req.user.id_cliente;
  const lista = await sql.query("Select * from clientes where id_cliente = ?", [
    id,
  ]);
  res.render("perfil/perfil/", { lista });
};

module.exports = perfilCTL;
