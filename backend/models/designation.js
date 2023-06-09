const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const designation = new Schema({
    job_title: {type: String, required: true},
    dept_id: {type: Schema.Types.ObjectId, ref: "department"},
    job_description: {type: String, required: true},
    job_requirements: {type: String, required: true},
})

module.exports = mongoose.model('designation', designation);
