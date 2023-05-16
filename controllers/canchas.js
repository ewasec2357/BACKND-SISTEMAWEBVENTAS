const { response } = require('express');
const Canchas = require('../models/canchas');

const getCanchas = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [ canchas, total ] = await Promise.all([Canchas.find({}, 
                'codigo cancha persona fecha_alq hora_inicio hora_fin turno tipo_pago pago_efectivo pago_yape total estado')
                .skip( desde ),
       Canchas.countDocuments()
    ]);


    res.json({
        ok: true,
        canchas,
        total
    });

}

const crearCancha = async(req, res) => {

    const canchas = new Canchas( req.body) 

    try {

        const canchasDB = await canchas.save()
        res.json({
            ok: true,
            canchasDB
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

const actualizarCancha = async (req, res = response) => {
    
    const id  = req.params.id;
    
    try {
        const canchasDB = await Canchas.findById( id );

        if ( !canchasDB ) {
            return res.status(404).json({
                ok: true,
                msg: 'Alquiler de cancha no encontrado por id',
            });
        }

        const cambioscanchas = { ...req.body,canchas: id }

        const canchasActualizado = await Canchas.findByIdAndUpdate( id, cambioscanchas, { new: true } )

        res.json({
            ok: true,
            canchas: canchasActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const borrarCancha = async (req, res = response) => {

    const id  = req.params.id;

    try {
        
        const canchas = await Canchas.findById( id );

        if ( !canchas ) {
            return res.status(404).json({
                ok: true,
                msg: 'Alquiler de cancha no fue encontrado por id',
            });
        }

        await Canchas.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Alquiler de cancha borrado'
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
    getCanchas,
    crearCancha,
    actualizarCancha,
    borrarCancha
}
