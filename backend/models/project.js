const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const projectSchema = new Schema({
    dept_id: { type: Schema.Types.ObjectId, ref: 'department' },
    project_title: {
        type: String,
        minlength: 1, // Minimum Length is 1 Character
        required: true,
        unique: true
    },
    project_desc: {
        type: String,
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

module.exports = mongoose.model('Project', projectSchema);
