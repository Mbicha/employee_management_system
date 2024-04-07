const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salary = new Schema({
    empl_id: {type: Schema.Types.ObjectId, ref: "employee"},
    salary: {type: Number, default: 0.00},
    salary_advance: {type: Number, default: 0.00},
    created_at: {type: Date, deafault: Date.now}
});

module.exports = mongoose.model("salary", salary);
