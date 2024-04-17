const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const overtime = new Schema({
    date: {type: Date, default: Date.now},
    start_time: {type: Date },
    stop_time: {type: Date},
    emp_id: {type: Schema.Types.ObjectId, ref: "employee"},
    hourly_rate: {type: Number, default: 0.00},
    created_at: {type: Date, default: Date.now}
}, { toJSON: { virtuals: true }, toObject: { virtuals: true }});

// overtime.virtual('total_amount').get(function() {
//     // Calculate the difference in hours between start_time and stop_time
//     const hoursWorked = (this.stop_time - this.start_time) / (1000 * 60 * 60);
//     // Calculate the total amount by multiplying hours worked with hourly rate
//     return hoursWorked * this.hourly_rate;
// });
module.exports = mongoose.model("overtime", overtime);
