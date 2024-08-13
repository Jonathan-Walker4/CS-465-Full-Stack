const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    length: { type: Number, required: true },
    start: { type: Date, required: true },
    resort: { type: String, required: true },
    perPerson: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true }
});

// Check if the 'trips' model already exists before defining it
module.exports = mongoose.models.trips || mongoose.model('trips', tripSchema);
