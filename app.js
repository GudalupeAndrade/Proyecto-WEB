
const express = require('express');
const app = express();
let port = 3000;
//const fs=require("fs");
//const https= require("https");
//process.env.port = 3000;
//const llavePrivada=fs.readFileSync("private.key");
//const certificado=fs.readFileSync("certificate.crt");

const metPropiet = require("./Controladores/ContPropiet")
const metPropiedades = require("./Controladores/ContPropied")
const metArrendatarios = require("./Controladores/ContrArrend")

//const credenciales ={

//    key:llavePrivada,
  //  cert:certificado,
   // passphrase:"a1234567"
//};
app.get("/propietarios", metPropiet.leerPropiet);
app.get("/propietarios/:RFC", metPropiet.leerUnPropiet);
app.post("/propietarios", metPropiet.nuevoPropietario);
app.put("/propietarios/:RFC", metPropiet.modifiPropiet);
app.delete("/propietarios/:RFC", metPropiet.eliminarPropiet);

app.get("/arrendatarios", metArrendatarios.totalArrend);
app.get("/arrendatarios/:RFC", metArrendatarios.mostarArrend);
app.get("/arrendatarios/propiedades/:RFC", metArrendatarios.propiedPorArend);
app.post("/arrendatarios", metArrendatarios.nuevoArrend);
app.put("/arrendatarios/:RFC", metArrendatarios.modificarArrend);
app.delete("/arrendatarios/:RFC", metArrendatarios.eleminarArrend);

app.post("/propiedades", metPropiedades.CrearPropiedad);
app.get("/propiedades", metPropiedades.totalPropiedades);
app.delete("/propiedades", metPropiedades.eliminarPropiedad);
app.put("/propiedades/nuevoPropietario", metPropiedades.agregarPropietario);
app.put("/propiedades/borrarPropietario", metPropiedades.borrarPropietario);
app.put("/propiedades/nuevoArrendatario", metPropiedades.agregarArrendatario);
app.put("/propiedades/borrarArrendatario", metPropiedades.borrarArrendatario);

//const httpsServer =https.createServer(credenciales,app);

//httpsServer.listen(process.env.port,() =>{
//    console.log('Servidor https escuchando por el puerto:',process.env.port);
//}).on('error',err =>{
//    console.log('Error al iniciar el servidor:',err);
//});
app.listen(port, () => {

  console.log('Server listo');
});
