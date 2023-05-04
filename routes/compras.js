/*
    Ruta: /api/compras
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getCompras, crearCompra, actualizarCompra, borrarCompra } = require('../controllers/compras');
const { getDetalle_productos, crearDetalle_producto, actualizarDetalle_producto, borrarDetalle_producto } = require('../controllers/detalle_producto');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/', validarJWT , getCompras );

router.post( '/',
    [   
        validarJWT,
        check('fecha_comp', 'La fecha de compra es obligatoria').not().isEmpty(),
        check('subtot_comp', 'El subtotal de la compra es obligatorio').not().isEmpty(),
        check('igv_comp', 'El igv de la compra es obligatorio').not().isEmpty(),
        check('tot_comp', 'El total de la compra de la categoria es obligatorio').not().isEmpty(),
        
        check('nom_prod', 'El nombre de la categoria es obligatorio').not().isEmpty(),
        check('desc_unid', 'El nombre de la categoria es obligatorio').not().isEmpty(),
        check('fact_multip', 'El nombre de la categoria es obligatorio').not().isEmpty(),
        check('cant_prod', 'El nombre de la categoria es obligatorio').not().isEmpty(),
        check('prec_prod', 'El nombre de la categoria es obligatorio').not().isEmpty(),
        check('total_prod', 'El nombre de la categoria es obligatorio').not().isEmpty(),
   
        validarCampos,
    ], 
    crearCompra,
    crearDetalle_producto 
);

router.put( '/:id',
    [
        validarJWT,
        check('nom_prod', 'El nombre de la categoria es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarCompra
);

router.delete( '/:id',
    validarJWT,
    borrarCompra
);



module.exports = router;