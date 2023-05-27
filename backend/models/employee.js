const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employee = new Schema({
    job_id: {type: Schema.Types.ObjectId, ref: "designation"},
    user_id: {type: Schema.Types.ObjectId, ref: "user"},
});

module.exports = mongoose.model("employee", employee);
