const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roles = ['Employee', 'Staff', 'Admin']

const employee = new Schema({
    job_id: {type: Schema.Types.ObjectId, ref: "designation", unique: true},
    user_id: {type: Schema.Types.ObjectId, ref: "user", unique: true},
    role: {
        type: String,
        require: true,
        default: "Employee",
        enum: roles
    },
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model("employee", employee);
