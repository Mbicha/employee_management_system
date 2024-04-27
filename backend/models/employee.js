const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roles = ['Employee', 'Staff', 'Admin', 'Director']

const employee = new Schema({
    job_id: {type: Schema.Types.ObjectId, ref: "designation"},
    user_id: {type: Schema.Types.ObjectId, ref: "user", unique: true},
    role: {
        type: String,
        require: true,
        default: "Employee",
        enum: roles
    },
    employment_type: {
        type: String,
        default: "Casual",
        enum: ['Casual', 'Contract', 'Permanent']
    },
    contract_length: {
        type: Number,
        default: 1.0,
    },
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model("employee", employee);
