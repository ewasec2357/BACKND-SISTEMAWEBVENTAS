const { Schema, model } = require('mongoose');

const Venta_TemporalSchema = Schema({

    vt_nom_prod: {
        type: String,
        required:true
    },
    vt_prec_venta: {
        type: Number,
        required:true
    },
    vt_cantidad:{
        type:Number,
        required:true
    },
    vt_total:{
        type:Number,
        required:true
    },
    vt_fecha:{
        type:Date,
        required:true
    }
}, 

{  collection: 'Venta_Temporal' });


Venta_TemporalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Venta_Temporal', Venta_TemporalSchema );