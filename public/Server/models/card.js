let mongoose = require('mongoose')

let cardSchema = mongoose.Schema({
    title: { type: String, required: true }, 
    description: { type: String }, // Optional field
    comments: [{
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        message: { type: String, required: true },
        postedAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

let Card = module.exports = mongoose.model("Card", cardSchema);