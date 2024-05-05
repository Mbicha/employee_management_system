const mongoose = require('mongoose');
const Task = require('./task');

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

// Middleware to delete related documents
projectSchema.pre('findOneAndDelete', async function(next) {
    const project = this;
    try {
        // Delete documents from other collections that reference project_id
        await Task.deleteMany({ project_id: project._id });
        // Add more deleteMany statements for other collections if needed
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Project', projectSchema);
