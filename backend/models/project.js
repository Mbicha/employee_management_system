const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const project = new Schema({
    dept_id: { type: Schema.Types.ObjectId, ref: 'department' },
    project_title: {
        type: String,
        minlength: [1, 'Minimum Length is 1 Character'],
        equired: true
    },
    project_desc: {
        type: String,
        minlength: [50, 'Minimum length should be 50 characters']
    },
    project_manager: String,
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    status: {
        type: String,
        enum: ['Proposed', 'Approved', 'Not Started', 'In-Progress', 'Completed', 'Cancelled'],
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', project);
