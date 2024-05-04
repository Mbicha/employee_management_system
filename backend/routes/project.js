const express = require('express');
const router = express.Router();
const Project = require('../controllers/project');

router
    .post('/', Project.createProject)
    .patch('/:id', Project.updateProject)
    .delete('/:id', Project.deleteProject)
    .get('/data/', Project.getProjects)
    .get('/data/project/:id', Project.getProjectById)

module.exports = router;
