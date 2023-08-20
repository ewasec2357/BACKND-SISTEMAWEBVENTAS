const { Schema, model } = require('mongoose');

const ReservaSchema = Schema({

    title: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true,
    },
    color: {
        type: Schema.Types.ObjectId,
        ref:'ReservaColor',
        required:true
    },
}, 

{  collection: 'Reserva' });


ReservaSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Reserva', ReservaSchema );
