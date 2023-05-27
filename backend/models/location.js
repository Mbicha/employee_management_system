const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const location = new Schema({
    country: {type: String},
    address: {type: String},
    user_id: {type: Schema.Types.ObjectId, ref: "user"}
});

module.exports = mongoose.model('location', location);
