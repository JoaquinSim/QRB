const bicicletaCTL = {}

bicicletaCTL.agregarBicicleta = (req, res)=>{
    res.render('bicicleta/bicicleta_agregar')
}
bicicletaCTL.mostrarBicicleta = (req, res)=>{
    res.render('bicicleta/bicicleta_listar')
}
bicicletaCTL.editarBicicleta = (req, res)=>{
    res.render('bicicleta/bicicleta_editar')
}
module.exports = bicicletaCTL