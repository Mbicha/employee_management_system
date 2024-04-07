const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const department = new Schema({
    name: {type: String, unique: true, required: true},
    head_of_department: {type: String, default: ''},
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model("department", department);
