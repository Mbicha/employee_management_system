const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const task = new Schema({
    project_id: {
        type: Schema.Types.ObjectId, ref: 'project'
    },
    task_title: { type: String, required: true},
    task_desc: String,
    start_date: Date,
    end_date: Date,
    status: {
        type: String,
        enum: ['Not Started', 'In-Progress', 'Completed']
    },
    members: [String],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', task);
