var ruta=require("express").Router();
var path = require("path");
var fs = require("fs");
var subirArchivo=require("../middlewares/middleware").subirArchivo;
var {mostrarUsuarios, buscarPorID, nuevoUsuario, modificarUsuario, borrarUsuario}=require("../bd/usuariosBD");

ruta.get("/",async (req,res)=>{
    var users=await mostrarUsuarios();
    //console.log(users);
    //res.end();
    //console.log(users);
    res.render("usuarios/mostrar",{users});
});

ruta.get("/nuevoUsuario",(req,res)=>{
    res.render("usuarios/nuevo");
});

ruta.post("/nuevoUsuario",subirArchivo(),async(req,res)=>{
    //console.log(req.file.originalname);
    req.body.foto=req.file.originalname;
    //res.end();
    var error=await nuevoUsuario(req.body);
    console.log(error);
    res.redirect("/");
});

ruta.get("/editarUsuario/:id", async(req,res)=>{
    var user=await buscarPorID(req.params.id);
    //res.end;
    res.render("usuarios/modificar",{user});
});

ruta.post("/editarUsuario",async(req,res)=>{
    var error=await modificarUsuario(req.body);
    res.redirect("/");
});

/*ruta.post("/editarUsuario",subirArchivo(), async(req,res)=>{
    try{
        var rutaImagen = path.join(__dirname, "..","web","images",req.body.foto);
        if(fs.existsSync(rutaImagen)){
            fs.unlinkSync(rutaImagen);
            req.body.foto= req.file;
            await modificarUsuario(req.body.foto);
        }
        res.redirect("/");
    }catch(error){
        console.error("Error al editar el usuario:",error);
    }
});*/


ruta.get("/borrarUsuario/:id",async(req,res)=>{
    try {
        var usuario = await buscarPorID(req.params.id);
        if (usuario) {
            var rutaImagen = path.join(__dirname, "web","images");
            if (fs.existsSync(rutaImagen)) {
                fs.unlinkSync(rutaImagen);
            }
            await borrarUsuario(req.params.id);
        }
        res.redirect("/");
    } catch (error) {
        console.error("Error al borrar usuario:", error);
    }
});



module.exports=ruta;