const { response } = require('express');
const Venta_Temporal = require('../models/venta_temporal');

const getVenta_Temporal = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [ venta_temporal, total ] = await Promise.all([Venta_Temporal.find({}, 
                'vt_nom_prod vt_prec_venta vt_cantidad vt_total vt_fecha')
                .skip( desde ),
                Venta_Temporal.countDocuments()
    ]);

    res.json({
        ok: true,
        venta_temporal,
        total
    });

}

const crearVenta_Temporal = async(req, res) => {

    const venta_temporal = new Venta_Temporal( req.body) 

    try {
        const venta_temporalDB = await venta_temporal.save()
        res.json({
            ok: true,
            venta_temporalDB
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

const actualizarVenta_Temporal = async (req, res = response) => {
    
    const id  = req.params.id;
    
    try {
        const venta_temporalDB = await Venta_Temporal.findById( id );

        if ( !venta_temporalDB ) {
            return res.status(404).json({
                ok: true,
                msg: 'Venta temporal no encontrada por id',
            });
        }

        const cambiosventa_temporal = { ...req.body,venta_temporal: id }

        const venta_temporalActualizada = await Venta_Temporal.findByIdAndUpdate( id, cambiosventa_temporal, { new: true } )

        res.json({
            ok: true,
            venta_temporal: venta_temporalActualizada
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const borrarVenta_Temporal = async (req, res = response) => {

    const id  = req.params.id;

    try {
        
        const venta_temporal = await Venta_Temporal.findById( id );

        if ( !venta_temporal ) {
            return res.status(404).json({
                ok: true,
                msg: 'Venta temporal no encontrada por id',
            });
        }

        await Venta_Temporal.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Venta temporal borrada con éxito'
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
    getVenta_Temporal,
    crearVenta_Temporal,
    actualizarVenta_Temporal,
    borrarVenta_Temporal
}
