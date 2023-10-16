var ruta=require("express").Router();
var path = require("path");
var fs = require("fs");
var subirArchivo=require("../middlewares/middleware").subirArchivo;
var {mostrarProductos, buscarPorID, nuevoProducto, modificarProducto, borrarProducto}=require("../bd/productosBD");

ruta.get("/mostrarProductos",async(req,res)=>{
    var products=await mostrarProductos();
    res.render("productos/mostrarPro",{products});
});

ruta.get("/nuevoProducto",(req,res)=>{
    res.render("productos/nuevoPro");
});

ruta.post("/nuevoProducto",subirArchivo(),async(req,res)=>{
    req.body.foto=req.file.originalname;
    var error=await nuevoProducto(req.body);
    console.log(error);
    res.redirect("/");
});

ruta.get("/editarProducto/:id",async(req,res)=>{
    var product=await buscarPorID(req.params.id);
    res.render("productos/modificarPro",{product});
});

ruta.post("/editarProducto",async(req,res)=>{
    var error=await modificarProducto(req.body);
    res.redirect("/");
});

ruta.get("/borrarProducto/:id",async(req,res)=>{
    try {
        var producto = await buscarPorID(req.params.id);
        if (producto) {
            var rutaImagen = path.join(__dirname, "web","images");
            if (fs.existsSync(rutaImagen)) {
                fs.unlinkSync(rutaImagen);
            }
            await borrarProducto(req.params.id);
        }
        res.redirect("/");
    } catch (error) {
        console.error("Error al borrar producto:", error);
    }
});

module.exports=ruta;