const mongoose = require('mongoose')
const { Schema } = mongoose;

const PairSchema = new Schema({
    coin1: { type: String, required: true },
    coin2: { type: String, required: true },
    fee: {type: Number, required: false}
})

module.exports = mongoose.model('Pair', PairSchema);

