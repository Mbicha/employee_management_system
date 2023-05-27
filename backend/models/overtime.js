const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const overtime = new Schema({
    date: {type: Date},
    start_time: {type: Time},
    stop_time: {type: Time},
    hourly_rate: {type: Number, default: 0.00}
});

module.exports = mongoose.model("overtime", overtime);
