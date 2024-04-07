const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const location = new Schema({
    country: {type: String, required: true},
    address: {type: String, required: true},
    user_id: {type: Schema.Types.ObjectId, ref: "user"},
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('location', location);
