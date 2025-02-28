let mongoose = require('mongoose');

let boardSchema = mongoose.Schema({
    title: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    collaborators: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        permissions: { type: String, enum: ['read', 'write', 'admin'], required: true }
    }],
    dateCreated: { type: Date, default: Date.now, required: true },
    lastModified: {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
        date: { type: Date, default: Date.now }
    },
    color: { type: String, match: /^#[0-9A-F]{6}$/i, required: true } 
});


boardSchema.pre('findOneAndUpdate', function (next) {
    if (this._update.lastModified) {
        this._update['lastModified.date'] = Date.now();
    }
    next();
});


let Board = module.exports = mongoose.model("Board", boardSchema);
