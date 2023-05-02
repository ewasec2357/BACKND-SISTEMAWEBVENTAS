const { Schema, model } = require('mongoose');

const VentasSchema = Schema({

    serie_venta: {
        type: String
    },
    correlat_venta: {
        type: String
    },
    cliente_venta: {
        type: String
    },
    dni_venta: {
        type: String
    },
    fecha_venta:{
        type: Date,
        required:true,
    },
    subtot_venta:{
        type:Number,
        required:true
    },
    igv_venta:{
        type:Number,
        required:true
    },
    tot_venta:{
        type:Number,
        required:true
    },
    estado: {
        type: Boolean,
        required: true,
        default:true
    },
    detalle_venta:{
        type: Array,
        items:[Schema.Types.ObjectId],
        ref: 'Detalle_Producto'
}
}, {  collection: 'Ventas' });

VentasSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'Ventas', VentasSchema );