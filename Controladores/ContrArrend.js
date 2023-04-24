const arrendatarios = require("../Modelos/arrendatarios");
const propiedades = require("../Modelos/propiedades");

const nuevoArrendatario = async function (req, res) {
    let nuevo = { RFC: req.query.RFC, Nombre: req.query.Nombre };
    await arrendatarios.default.push(nuevo);
    await res.json("Nuevo Arrendatario");
}

const totalArrendatarios = async function (req, res) {
    let datos = await arrendatarios.default;
    await res.json(datos);
}

const mostrarArrendatario = async function (req, res) {
    let datos = await arrendatarios.default.find(arrend => arrend.RFC === req.params.RFC);
    await res.json(datos);

}

const modificarArrendatario = async function (req, res) {
    let datos = await arrendatarios.default.find(arrend => arrend.RFC === req.params.RFC);
    datos.Nombre = req.query.Nombre;
    await res.json(datos);

}

const eleminarArrendatario = async function (req, res) {
    arrendatarios.default = await arrendatarios.default.filter((arrend) => arrend.RFC !== req.params.RFC)
    await res.json(arrendatarios.default);

}

const propiedPorArend  = async function (req, res) {
    let arrendt = arrendatarios.default.find(arrend => arrend.RFC === req.params.RFC);
    if (arrendt == null) {
        await res.json("No existe la arrendatario");
    } else {     
        let propiedadesArend = propiedades.default.filter(arrend => arrend.arrendatario.RFC === req.params.RFC);
        if (propiedadesArend == null) {
            await res.json("No se encuentras propiedades a dicho arrendatario ");
        }
        else {
                await res.json(propiedadesArend);          
        }
    }

}

module.exports.nuevoArrend = nuevoArrendatario;
module.exports.totalArrend = totalArrendatarios;
module.exports.mostarArrend = mostrarArrendatario;
module.exports.modificarArrend = modificarArrendatario;
module.exports.eleminarArrend = eleminarArrendatario;
module.exports.propiedPorArend = propiedPorArend;