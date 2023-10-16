var conexion=require("./conexion").conexionProductos;
var Producto=require("../modelos/Producto");

async function mostrarProductos(){
    var products=[];
    try{
        var producto=await conexion.get();
        //console.log(producto);
        producto.forEach(producto => {
            var producto1=new Producto(producto.id, producto.data());
            //console.log(producto1);
            if(producto1.bandera==0){
                products.push(producto1.obtenerProducto);
                //console.log(products);
            }
        });
    }
    catch(err){
        console.log("Error al mostrar productos "+err);
        products = [];
    }
    return products;
}

async function nuevoProducto(newProduct){
    var error=1;
    try{
        var producto1=new Producto(null,newProduct);
        if(producto1.bandera==0){
            console.log(producto1.obtenerProducto);
            await conexion.doc().set(producto1.obtenerProducto);
            error=0;
        }
        else{
            console.log("Datos incorrectos del formulario");
        }
    }
    catch(err){
        console.log("Error al crear nuevo producto "+err);
    }
    return error;
}

async function buscarPorID(id){
    var product;
    try{
        var productoBD=await conexion.doc(id).get();
        var productoObjeto=new Producto((await productoBD).id, productoBD.data());
        if(productoObjeto.bandera==0){
            product=productoObjeto.obtenerProducto;
        }
    }
    catch(err){
        console.log("Error al recuperar el producto "+err);
    }
    return product;
}


async function modificarProducto(datos){
    var product=await buscarPorID(datos.id);
    if(product!=undefined){
        var product=new Producto(datos.id, datos);
        var error=1;
        if(product.bandera==0){
            try{
                await conexion.doc(product.id).set(product.obtenerProducto);
                console.log("Los datos se modificaron correctamente");
                error=0;
            }  
            catch(err){
                console.log("Error al modificar el usuario "+err);
            }
        }
        else{
            console.log("Error los datos no son validos");
        }
    }
    return error;
}

async function borrarProducto(id){
    var error=1;
    var product= await buscarPorID(id);
    if(product!=undefined){
        try{
            await conexion.doc(id).delete();
            console.log("Registro borrado");
            error=0;
        }
        catch(err){
            console.log("Error al borrar el producto "+err);
        }
    }
    return error;
}


module.exports={
    mostrarProductos,
    buscarPorID,
    nuevoProducto, 
    modificarProducto,
    borrarProducto
}
