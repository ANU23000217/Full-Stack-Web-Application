const mongoose = require('mongoose');

const DBSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        title: {
            type: String,
            required: true
        },
        priority: {
            type: String,
            required: true,
            unique: true
        },
        status: {
            type: String,
            required: true
        },
    },
    {
        collection: 'DataCollection'
    }
);

module.exports = mongoose.model('DataCollection', DBSchema);