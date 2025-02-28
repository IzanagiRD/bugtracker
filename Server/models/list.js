let mongoose = require('mongoose');

let listSchema = mongoose.Schema({
    board: {type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true},
    title: { type: String, required: true },
    cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }], 
    dateCreated: { type: Date, default: Date.now, required: true }
});


let List = module.exports = mongoose.model("List", listSchema)