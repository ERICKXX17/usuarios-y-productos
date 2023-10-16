var admin=require("firebase-admin");
var keys=require("../keys.json");

admin.initializeApp({
    credential:admin.credential.cert(keys)
});

var micuenta=admin.firestore(); //conexion de la cuenta
var conexionUsuarios=micuenta.collection("usuarios");
var conexionProductos=micuenta.collection("productos");
//var conexion=cuenta.collection("miejemploBD"); //conexion de la bd

module.exports={
    conexionUsuarios,
    conexionProductos
};