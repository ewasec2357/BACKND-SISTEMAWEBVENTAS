const { response } = require('express');
const Ventas = require('../models/ventas');

const getVentas = async(req, res = response) => {

    const [ ventas, total ] = await Promise.all([Ventas.find({}, 
                'alq_cochera fecha_venta subtot_venta igv_venta tot_venta detalle_venta'),
                Ventas.countDocuments()
    ]);


    res.json({
        ok: true,
        ventas,
        total
    });

}

const crearVenta = async(req, res) => {

    try {

        const ventas = new Ventas( req.body) 

        const ventasDB = await ventas.save()
        res.json({
            ok: true,
            ventasDB
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

const actualizarVenta = async (req, res = response) => {
    
    const id  = req.params.id;
    
    try {
        const ventasDB = await Ventas.findById( id );

        if ( !ventasDB ) {
            return res.status(404).json({
                ok: true,
                msg: 'La venta no fue encontrada por id',
            });
        }

        const cambiosventas = { ...req.body,ventas: id }

        const ventasActualizado = await Ventas.findByIdAndUpdate( id, cambiosventas, { new: true } )

        res.json({
            ok: true,
            canchas: ventasActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const borrarVenta = async (req, res = response) => {

    const id  = req.params.id;

    try {
        
        const ventas = await Ventas.findById( id );

        if ( !ventas ) {
            return res.status(404).json({
                ok: true,
                msg: 'La venta no fue encontrada por id',
            });
        }

        await Ventas.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Venta borrada'
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
    getVentas,
    crearVenta,
    actualizarVenta,
    borrarVenta
}
