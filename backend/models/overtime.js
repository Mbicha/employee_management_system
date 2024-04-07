const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const overtime = new Schema({
    date: {type: Date, deafault: Date.now},
    start_time: {type: Date, deafault: Date.now},
    stop_time: {type: Date, deafault: Date.now},
    salary_id: {type: Schema.Types.ObjectId, ref: "salary"},
    hourly_rate: {type: Number, default: 0.00},
    created_at: {type: Date, deafault: Date.now}
});

module.exports = mongoose.model("overtime", overtime);
