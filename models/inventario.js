const { Schema, model } = require('mongoose');

const InventarioSchema = Schema({

    fecha: {
        type: Date,
        required:true
    },
    inventario:{
        type: Array,
        items:[Schema.Types.Array],
        ref: 'Detalle_Producto',
    }
}, 

{  collection: 'Inventario' });


InventarioSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Inventarios', InventarioSchema );