const propiedades = require("../Modelos/propiedades");
const arrendatarios = require("../Modelos/arrendatarios");
const propietarios = require("../Modelos/propietarios");

const CrearPropiedad = async function (req, res) {
    let nuevo = { clave_catastral: req.query.clave, descripcion: req.query.desc, propietarios: [], arrendatarios: [] };
    await propiedades.default.push(nuevo);
    await res.json("Propiedad Agregada");
}

const totalPropiedades = async function (req, res) {
    let datos = await propiedades.default;
    await res.json(datos);
}

const eliminarPropiedad = async function (req, res) {
    propiedades.default = await propiedades.default.filter((prop) => prop.clave_catastral !== req.params.clave)

    await res.json(propiedades.default);

}

const agregarPropietario = async function (req, res) {
    let propiedad = await propiedades.default.find(prop => prop.clave_catastral === req.query.clave);
    if (propiedad == null) {
        await res.json("No existe la propiedad");
    } else {
        let propietario = await propietarios.default.find(prop => prop.RFC === req.query.RFC);

        if (propietario == null) {
            await res.json("No existe el propietario");
        }
        else {
            
            await propiedad.propietarios.push(propietario);
            await res.json("Asignado");
        }
    }

}

const borrarPropietario = async function (req, res) {
    let propiedad = await propiedades.default.find(prop => prop.clave_catastral === req.query.clave);
    if (propiedad == null) {
        await res.json("No existe la propiedad");
    } else {
        let propietario = await propietarios.default.find(prop => prop.RFC === req.query.RFC);
        if (propietario == null) {
            await res.json("No existe el propietario");
        }
        else {

            if (propiedad.propietarios.find(prop => prop.RFC === propietario.RFC)) {

                propiedad.propietarios = await propiedad.propietarios.filter((prop) => prop.RFC !== propietario.RFC)
                await res.json("Borrado");
            } else {

                await res.json("No existe registro del propietario");
            }

        }
    }

}


const agregarArrendatario = async function (req, res) {
    let propiedad = await propiedades.default.find(arrend => arrend.clave_catastral === req.query.clave);
    if (propiedad == null) {
        await res.json("No existe la propiedad");
    } else {
        let arrendatario = await arrendatarios.default.find(arrend => arrend.RFC === req.query.RFC);

        if (arrendatario == null) {
            await res.json("No existe el arrendatario");
        }
        else {
            if(propiedad.arrendatario.length < 1){
                await propiedad.arrendatario.push(arrendatario);
                await res.json("Asignado");
            }else{
                await res.json("solo se permite asiganar un arrendatario");  
            }

        }
    }

}

const borrarArrendatario = async function (req, res) {
    let propiedad = await propiedades.default.find(arrend => arrend.clave_catastral === req.query.clave);
    if (propiedad == null) {
        await res.json("No existe la propiedad");
    } else {
        let arrendatario = await arrendatarios.default.find(arrend => arrend.RFC === req.query.RFC);
        if (arrendatario == null) {
            await res.json("No existe el arrendatario");
        }
        else {

            if (propiedad.arrendatario.find(arrend => arrend.RFC === arrendatario.RFC)) {

                propiedad.arrendatario = await propiedad.arrendatario.filter((arrend) => arrend.RFC !== arrendatario.RFC)
                await res.json("Borrado");
            } else {

                await res.json("No existe registro del arrendatario");
            }

        }
    }

}


module.exports.CrearPropiedad = CrearPropiedad;
module.exports.totalPropiedades = totalPropiedades;
module.exports.eliminarPropiedad = eliminarPropiedad;
module.exports.agregarPropietario = agregarPropietario;
module.exports.borrarPropietario = borrarPropietario;
module.exports.agregarArrendatario = agregarArrendatario;
module.exports.borrarArrendatario = borrarArrendatario;