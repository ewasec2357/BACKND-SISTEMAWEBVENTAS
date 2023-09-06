const { response } = require('express');
const Compras = require('../models/compras');
const Productos = require('../models/productos');

const getCompras = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [ compras, total ] = await Promise.all([Compras.find({estado:true}, 
                'numero_comp ruc_comp tipo_doc_comp prove_comp fecha_comp subtot_comp igv_comp tot_comp detalle_comp')
                //.populate('Detalle_Producto','detalle_comp')
                .skip( desde ),
       Compras.countDocuments()
    ]);


    res.json({
        ok: true,
        compras,
        total
    });

}

const getCompraIdProducto = async(req, res) =>{
    
    const nom_prod  = req.params.id;

    try {

        const comprasById = await Compras.find();

        res.json({
            ok: true,
            comprasById
        }) ;

    }catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}
const crearCompra = async(req, res) => {

    
    const compras = new Compras( req.body)

    try {
        const comprasDB = await compras.save()

        const productosNewStockArray = [];

        await Promise.all(compras.detalle_comp.map(async (producto) => {
            
            const { nom_prod, fact_multip, cant_prod } = producto;

            const existeProducto = await Productos.findOne({nom_prod});
            
            if ( !existeProducto ) {
                return res.status(404).json({
                    ok: true,
                    msg: 'El producto no está registrado',
                });
            }

            console.log(existeProducto)

            existeProducto.stock_prod = existeProducto.stock_prod + (fact_multip * cant_prod)

            const productoActualizado = await Productos.findByIdAndUpdate( existeProducto._id, existeProducto, { new: true } )

            productosNewStockArray.push({ _id: existeProducto._id, producto: existeProducto.nom_prod, Stock_Actual: productoActualizado.stock_prod})

          })
        );

        res.json({
            ok: true,
            comprasDB,
            stockActualizado: productosNewStockArray
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const borrarCompra = async (req, res = response) => {

    const id  = req.params.id;

    try {
        
        const compras = await Compras.findById( id );

        if ( !compras ) {
            return res.status(404).json({
                ok: true,
                msg: 'La compra no fue encontrada por id',
            });
        }
        
        const productosNewStockArray = [];
        
        await Promise.all(
          compras.detalle_comp.map(async (producto) => {

            const { nom_prod, fact_multip, cant_prod } = producto;
            const existeProducto = await Productos.findOne({nom_prod});
            
            if ( !existeProducto ) {
                return res.status(404).json({
                    ok: true,
                    msg: 'El producto no está registrado',
                });
            }

            existeProducto.stock_prod = existeProducto.stock_prod - (fact_multip * cant_prod)
            const productoActualizado = await Productos.findByIdAndUpdate( existeProducto._id, existeProducto, { new: true } )
            productosNewStockArray.push({ _id: existeProducto._id, producto: existeProducto.nom_prod, Stock_Actual: productoActualizado.stock_prod})
          })
        );

        await Compras.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Compra borrada',
            stockActualizado: productosNewStockArray
        });


    }catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = {
    getCompras,
    crearCompra,
    borrarCompra,
    getCompraIdProducto
}
