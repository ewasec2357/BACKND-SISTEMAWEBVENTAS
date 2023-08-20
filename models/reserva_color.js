const { Schema, model } = require('mongoose');

const ReservaColorSchema = Schema({

    primary: {
        type: String,
        required: true
    },
}, 

{  collection: 'ReservaColor' });


ReservaColorSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'ReservaColor', ReservaColorSchema );
