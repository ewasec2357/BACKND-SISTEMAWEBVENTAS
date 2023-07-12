const { response } = require('express');
const Productos = require('../models/productos');

const getProductos = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [ productos, total ] = await Promise.all([Productos.find({estado:true}, 
                'nom_prod barcode prec_prod id_cat stock_prod img_prod estado')
                .populate('Categorias')
                .skip( desde ),
                Productos.countDocuments()
    ]);

    res.json({
        ok: true,
        productos,
        total
    });

}

const crearProducto = async(req, res) => {

    const { nom_prod } = req.body;
    const productos = new Productos( req.body) 

    try {
        const existeproducto = await Productos.findOne({ nom_prod });
        if ( existeproducto ) {
           return res.status(400).json({
               ok: false,
               msg: 'Ya existe ese producto'
            });
        }


        const productosDB = await productos.save()
        res.json({
            ok: true,
            productosDB
        }) 
        ;

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarProducto = async (req, res = response) => {
    
    const id  = req.params.id;
    
    try {
        const productosDB = await Productos.findById( id );

        if ( !productosDB ) {
            return res.status(404).json({
                ok: true,
                msg: 'Producto no encontrado por id',
            });
        }

        const cambiosproductos = { ...req.body,productos: id }

        const productoActualizado = await Productos.findByIdAndUpdate( id, cambiosproductos, { new: true } )

        res.json({
            ok: true,
            productos: productoActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const borrarProducto = async (req, res = response) => {

    const id  = req.params.id;

    try {
        
        const productos = await Productos.findById( id );

        if ( !productos ) {
            return res.status(404).json({
                ok: true,
                msg: 'El producto no fue encontrado por id',
            });
        }

        await Productos.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Producto borrado'
        }); 

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = {
    getProductos,
    crearProducto,
    actualizarProducto,
    borrarProducto
}
