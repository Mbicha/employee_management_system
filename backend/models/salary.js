const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salary = new Schema({
    empl_id: {type: Schema.Types.ObjectId, ref: "employee"},
    salary: {type: Number, default: 0.00},
    ot_id: {type: Schema.Types.ObjectId, ref: "overtime"},
    salary_advance: {type: Number, default: 0.00}
});

module.exports = mongoose.model("salary", salary);
