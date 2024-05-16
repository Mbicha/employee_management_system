const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salary = new Schema({
    empl_id: {type: Schema.Types.ObjectId, ref: "employee"},
    salary: {type: Number, default: 0.00},
    salary_advance: {type: Number, default: 0.00},
    advance_status: {type: String, enum: ['Requested','Rejected','Approved','Disbursed']},
    created_at: {type: Date, deafault: Date.now}
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
);

salary.virtual('remaining_salary').get(function(){
    return this.salary - this.salary_advance;
});

module.exports = mongoose.model("salary", salary);
