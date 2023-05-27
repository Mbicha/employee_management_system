const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const department = new Schema({
    name: {type: String},
    head_of_department: {type: String}
});

module.exports = mongoose.model("department", department);
