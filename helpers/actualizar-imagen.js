const Usuario = require('../models/usuario');
const Productos = require('../models/productos');
const fs = require('fs');


const borrarImagen = ( path ) => {
    if ( fs.existsSync( path ) ) {
        // borrar la imagen anterior
        fs.unlinkSync( path );
    }
}

const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';
    
    switch( tipo ) {
        
        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if ( !usuario ) {
                console.log('No es un usuario por id');
                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen( pathViejo );

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
        break;

        case 'productos':

            const productos = await Productos.findById(id);
            if ( !productos ) {
                console.log('No es un producto por id');
                return false;
            }

            pathViejo = `./uploads/productos/${ productos.img }`;
            borrarImagen( pathViejo );

            productos.img = nombreArchivo;
            await productos.save();
            return true;
        break;
    }
    }


module.exports = { 
    actualizarImagen
}
