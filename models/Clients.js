const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClientsSchema = new Schema({
    name: {String, required: true},
    phone: {Number, required: true},
    location: {
        country: {String, required: true},
        state: {String, required: true},
        city: {String, required: true},
        address: {String, required: true},
    },
    description: String,
    created: {
        admin: mongoose.Schema.Types.ObjectId,
        ref: 'Admins',
        timestamp: Date
    }
    modified: {
        admin: mongoose.Schema.Types.ObjectId,
        ref: 'Admins',
        timestamp: Date
    }
})

module.exports = mongoose.model('Clients', ClientsSchema);
