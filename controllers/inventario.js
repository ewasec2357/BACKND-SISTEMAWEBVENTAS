const { response } = require('express');
const Inventarios = require('../models/inventario');


const getInventario = async(req, res) => {


    const [ inventarios, total ] = await Promise.all([
        Inventarios.find({estado:true})
            .populate({path:'inventario.id_prod', select:'id_cat _id nom_prod', model:'Productos' }),
        Inventarios.countDocuments()
    ]);

    res.json({
        ok: true,
        inventarios,
        total
    });

}

const crearInventario = async(req, res) => {

    const inventarios = new Inventarios( req.body ) 

    try {
 
        const inventariosDB = await inventarios.save()

        res.json({
            ok: true,
            inventariosDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}


module.exports = {
    getInventario,
    crearInventario
}
