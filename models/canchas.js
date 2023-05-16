const { Schema, model } = require('mongoose');

const CanchasSchema = Schema({

    cod_cancha: {
        type: String,
        required:true
    },
    ubi_cancha: {
        type: String,
        required:true,
        enum:["Cancha 1","Cancha 2"]
    },
    cli_cancha: {
        type: String,
        required:true
    },
    fecha_alq: {
        type: Date,
        required:true
    },
    hora_ini: {
        type: String,
        required:true
    },
    hora_fin: {
        type: String,
        required:true
    },
    turno_alq: {
        type: String,
        required:true,
        enum:["Mañana","Tarde","Noche"]
    },
    tipo_pago: {
        type: String,
        required:true,
        enum:["Efectivo","Yape","Efectivo y Yape","Hora Gratis"]
    },
    monto_efect:{
        type:Number
    },
    monto_yape:{
        type:Number
    },
    monto_total:{
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