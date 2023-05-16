const { Schema, model } = require('mongoose');

const CanchasSchema = Schema({

    codigo: {
        type: String,
        required:true
    },
    cancha: {
        type: String,
        required:true,
        enum:["Cancha 1","Cancha 2"]
    },
    persona: {
        type: String,
        required:true
    },
    fecha_alq: {
        type: Date,
        required:true
    },
    hora_inicio: {
        type: String,
        required:true
    },
    hora_fin: {
        type: String,
        required:true
    },
    turno: {
        type: String,
        required:true,
        enum:["Mañana","Tarde","Noche"]
    },
    tipo_pago: {
        type: String,
        required:true,
        enum:["Efectivo","Yape","Efectivo y Yape","Hora Gratis"]
    },
    pago_efectivo:{
        type:Number
    },
    pago_yape:{
        type:Number
    },
    total:{
        type:Number,
        required:true
    },
    estado: {
        type: Boolean,
        required: true,
        default:true
    },
}, 

{  collection: 'Canchas' });


CanchasSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Canchas', CanchasSchema );