/*
    Path: '/api/login'
*/
const { Router } = require('express');
const { login, renovarToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.post( '/',
    [
        check('nom_usuario', 'El usuario es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
)

router.get('/renovartoken',
        validarJWT,
        renovarToken)


module.exports = router;
