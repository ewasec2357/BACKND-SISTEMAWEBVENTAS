const { response } = require('express');
const Compras = require('../models/compras');

const getCompras = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [ compras, total ] = await Promise.all([Compras.find({estado:true}, 
                'numero_comp  prov_comp ruc_comp fecha_comp subtot_comp igv_comp tot_comp')
                .populate('Detalle_Producto','nom_prod desc_unid fact_multip cant_prod prec_prod total_prod')
                .skip( desde ),
       Compras.countDocuments()
    ]);


    res.json({
        ok: true,
        compras,
        total
    });

}

const crearCompra = async(req, res) => {

    
    const compras = new Compras( req.body) 

    try {
        const comprasDB = await compras.save()
        res.json({
            ok: true,
            comprasDB
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

const actualizarCompra = async (req, res = response) => {
    
    const id  = req.params.id;
    
    try {
        const comprasDB = await Compras.findById( id );

        if ( !comprasDB ) {
            return res.status(404).json({
                ok: true,
                msg: 'La compra no fue encontrada por id',
            });
        }

        const cambioscompras = { ...req.body,compras: id }

        const compraActualizado = await Compras.findByIdAndUpdate( id, cambioscompras, { new: true } )

        res.json({
            ok: true,
            productos: compraActualizado
        })

    } catch (error) {

        console.log(error);

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

        await Compras.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Compra borrada'
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
    getCompras,
    crearCompra,
    actualizarCompra,
    borrarCompra
}
