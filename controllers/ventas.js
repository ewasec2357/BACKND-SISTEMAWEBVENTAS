const { response } = require('express');
const Ventas = require('../models/ventas');
const Venta_Temporal = require('../models/venta_temporal');

const getVentas = async(req, res = response) => {

    const [ ventas, total ] = await Promise.all([Ventas.find({}, 
                'alq_cochera fecha_venta subtot_venta igv_venta tot_venta detalle_venta')
                .populate({path:'detalle_venta.vt_id_prod',select:'nom_prod', model:'Productos'}),
                Ventas.countDocuments()
    ]);
    
    res.json({
        ok: true,
        ventas,
        total
    });

}

const crearVenta = async(req, res = response) => { 
    
    try {
        const ventas = new Ventas( req.body) 
        const ventasDB = await ventas.save()

        const {detalle_venta} = req.body;
        let vtupdate = [];

        for (let i = 0; i < detalle_venta.length; i++) {

            detalle_venta[i].estado = false;
            const vt = await Venta_Temporal.findByIdAndUpdate( detalle_venta[i]._id, detalle_venta[i], { new: true } );
            vtupdate.push(vt);
        }

        res.json({
            ok: true,
            ventasDB
        });

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

        const {detalle_venta} = ventas;
        let vtupdate = [];
        
        for (let i = 0; i < detalle_venta.length; i++) {
            
            detalle_venta[i].estado = true;
            const vt = await Venta_Temporal.findByIdAndUpdate( detalle_venta[i]._id, detalle_venta[i], { new: true } );
            vtupdate.push(vt);
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
