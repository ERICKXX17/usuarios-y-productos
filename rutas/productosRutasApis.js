var ruta=require("express").Router();
var {mostrarProductos, buscarPorID, nuevoProducto, modificarProducto, borrarProducto}=require("../bd/productosBD");

ruta.get("/api/",async (req,res)=>{
    var products=await mostrarProductos();
    if(products.length>0){
        res.status(200).json(products);
    }
    else{
        res.status(400).json("Productos no encontrados");
    }
});

ruta.get("/nuevoProducto",(req,res)=>{
    res.render("productos/nuevoPro");
});

ruta.post("/api/nuevoProducto",async(req,res)=>{
    var error=await nuevoProducto(req.body);
    if(error==0){
        res.status(200).json("Producto registrado correctamente")
        }
        else{
            res.status(400).json("Error al registrar el producto")
        }
});

ruta.get("/api/buscarProductoPorId/:id", async(req,res)=>{
    var product=await buscarPorID(req.params.id);
    if (product!=undefined){
        res.status(200).json(product);
    }
    else{
        res.status(400).json("Producto no encontrado");
    }
});


ruta.post("/api/editarProducto",async(req,res)=>{
    var error=await modificarProducto(req.body);
    if(error==0){
        res.status(200).json("Producto actualizado correctamente");
    }
    else{
        res.status(400).json("Error al actualizar producto")
    }
});

ruta.get("/api/borrarProducto/:id",async(req,res)=>{
    var error= await borrarProducto(req.params.id);
    if(error==0){
        res.status(200).json("Producto borrado");
    }
    else{
        res.status(400).json("Error al borrar el producto");
    }
});

module.exports=ruta;