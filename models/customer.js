const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

const customerCollection = mongoose.model('customerCollection', customerSchema);

module.exports = customerCollection;