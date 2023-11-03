const { Schema, model } = require('mongoose');

const InventarioSchema = Schema({

    fecha: {
        type: Date,
        required:true
    },
    inventario: {
        id_prod: { 
            type: Schema.Types.ObjectId,
            ref: 'Productos',
            required:true
        },
        nom_prod: { 
            type: Schema.Types.ObjectId,
            ref: 'Productos',
            required:true
        },
        cantidad: { 
            type: Number, 
            required: true 
        }            
    },
}, 

{  collection: 'Inventario' });


InventarioSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Inventarios', InventarioSchema );