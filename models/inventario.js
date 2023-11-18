const { Schema, model } = require('mongoose');

const ProductoInventarioSchema = new Schema({
    nom_prod: { 
        type: String,
        required: true
    },
    id_prod: { 
        type: Schema.Types.ObjectId,
        ref: 'Productos',
        required: true
    },
    cantidad: { 
        type: Number, 
        required: true 
    }  
})

const InventarioSchema = Schema({
    fecha: {
        type: Date, 
        required:true
    },
    inventario: [
        ProductoInventarioSchema
    ]
}, {  collection: 'Inventario' });


InventarioSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Inventarios', InventarioSchema );