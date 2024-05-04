const express = require('express');
const router = express.Router();

const Task = require("../controllers/task");

router
    .post('/', Task.createTask)
    .patch('/:id', Task.updateTask)
    .delete('/:id', Task.deleteTask)
    .get('/:id', Task.getTaskById)
    .get('/data/tasks', Task.getTasks)

module.exports = router;
