const propietarios = require("../Modelos/propietarios");
const propiedades = require("../Modelos/propiedades");

const nuevoPropietario = async function (req, res) {
    let nuevo = { RFC: req.query.RFC, Nombre: req.query.Nombre };
    await propietarios.default.push(nuevo);
    await res.json("Agregado");
}

const leerPropietarios = async function (req, res) {
    let datos = await propietarios.default;
    await res.json(datos);
}

const leerPropietario = async function (req, res) {
    let datos = await propietarios.default.find(prop => prop.RFC === req.params.RFC);
    if(datos == null){
        await res.json("No se encontro el propietario");
    }else{
        await res.json(datos);
    }
}

const modificarPropiet = async function (req, res) {
    let datos = await propietarios.default.find(prop => prop.RFC === req.params.RFC);
    datos.Nombre = req.query.Nombre;
    await res.json(datos);
}

const eliminarPropiet = async function (req, res) {
    propietarios.default = await propietarios.default.filter((prop) => prop.RFC !== req.params.RFC);
    await res.json(propietarios.default);
}


module.exports.nuevoPropietario = nuevoPropietario;
module.exports.leerPropiet = leerPropietarios;
module.exports.leerUnPropiet = leerPropietario;
module.exports.modifiPropiet = modificarPropiet;
module.exports.eliminarPropiet = eliminarPropiet;