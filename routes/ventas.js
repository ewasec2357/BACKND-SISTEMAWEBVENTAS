/*
    Ruta: /api/ventas
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getVentas, crearVenta, actualizarVenta, borrarVenta } = require('../controllers/ventas').default;
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/', validarJWT , getVentas );

router.post( '/',
    [   
        validarJWT,
        check('alq_cochera', 'La fecha de compra es obligatoria').not().isEmpty(),
        check('fecha_venta', 'El subtotal de la compra es obligatorio').not().isEmpty(),
        check('subtot_venta', 'El igv de la compra es obligatorio').not().isEmpty(),
        check('igv_venta', 'El total de la compra es obligatorio').not().isEmpty(),
        check('tot_venta', 'El detalle de la compra es obligatorio').not().isEmpty(),
        check('detalle_venta','El detalle de venta es obligatorio').not().isEmpty(),
        validarCampos,
    ], 
    crearVenta, 
);

router.put( '/:id',
    validarJWT,
    actualizarVenta
);

router.delete( '/:id',
    validarJWT,
    borrarVenta
);



module.exports = router;
