var ruta=require("express").Router();
var {mostrarUsuarios, buscarPorID, nuevoUsuario, modificarUsuario, borrarUsuario}=require("../bd/usuariosBD");

ruta.get("/api/",async (req,res)=>{
    var users=await mostrarUsuarios();
    if(users.length>0){
        res.status(200).json(users);
    }
    else{
        res.status(400).json("Usuarios no encontrados");
    }

});

ruta.get("/nuevoUsuario",(req,res)=>{
    res.render("usuarios/nuevo");
});

ruta.post("/api/nuevoUsuario",async(req,res)=>{
    var error=await nuevoUsuario(req.body);
    if(error==0){
        res.status(200).json("Usuario registrado correctamente")
        }
        else{
            res.status(400).json("Error al registrar al usuario")
        }
});

ruta.get("/api/buscarUsuarioPorId/:id", async(req,res)=>{
    var user=await buscarPorID(req.params.id);
    if (user!=undefined){
        res.status(200).json(user);
    }
    else{
        res.status(400).json("Usuario no encontrado");
    }
});

ruta.post("/api/editarUsuario",async(req,res)=>{
    var error=await modificarUsuario(req.body);
    if(error==0){
        res.status(200).json("Usuario actualizado correctamente");
    }
    else{
        res.status(400).json("Error al actualizar usuario")
    }
});

ruta.get("/api/borrarUsuario/:id",async(req,res)=>{
    var error= await borrarUsuario(req.params.id);
    if(error==0){
        res.status(200).json("Usuario borrado");
    }
    else{
        res.status(400).json("Error al borrar el usuario");
    }
});

module.exports=ruta;