const mongoose = require('mongoose');
const Project = require('../models/project');

exports.createProject = async (req, res) => {
    try {
        const newProject = await Project.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                project: newProject
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            error
        });
    }
}

exports.updateProject = async (req, res) => {
    try {
        const updateProject = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if(!updateProject){
            return res.status(404).json({
                status: 'fail',
                message: 'No project with that id'
            });
        }

        res.status(200).json({
            status: 'success',
            updateProject
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            error
        });
    }
}

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if(!project){
            return res.status(404).json({
                status: 'fail',
                message: 'No project with that id'
            });
        }

        res.status(200).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error
        });
    }
}

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.aggregate([
            {
                $lookup: {
                    from: 'departments',
                    localField: 'dept_id',
                    foreignField: '_id',
                    as: 'department'
                }
            },
            {
                $lookup: {
                    from: 'tasks',
                    localField: "_id",
                    foreignField: "project_id",
                    as: "tasks"
                  }
            },
            {
                $addFields: {
                    year: { $year: "$end_date" },
                    month: { $month: "$end_date" },
                    day: {$dayOfMonth: "$end_date"}
                }
            },
            {
                $project: {
                    dept_id: { $arrayElemAt: ['$department._id', 0] },
                    project_name: "$project_title",
                    department: { $arrayElemAt: ['$department.name', 0] },
                    status: '$status',
                    pm: "$project_manager",
                    ends_in: {
                        $concat: [
                            { $toString: "$year" },
                            "-",
                            { $toString: "$month" },
                            "-",
                            { $toString: "$day" }
                        ]
                    },
                    percentage_complete: "No data yet",
                    total_tasks: { $size: '$tasks' }                
                }
            }
        ]);

        if(!projects){
            return res.status(404).json({
                status: 'fail',
                message: 'No Projects Yet!!'
            });
        }

        res.status(200).json({
            status: 'success',
            number_of_projects: projects.length,
            projects
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error
        });
    }
}

exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(req.params.id)
                }
            },         
            {
                $lookup: {
                    from: 'departments',
                    localField: 'dept_id',
                    foreignField: '_id',
                    as: 'department'
                }
            },
            {
                $lookup: {
                    from: 'tasks',
                    localField: "_id",
                    foreignField: "project_id",
                    as: "tasks"
                  }
            },
            {
                $project: {
                    dept_id: { $arrayElemAt: ['$department._id', 0] },
                    project_name: "$project_title",
                    project_desc: "$project_desc",
                    department: { $arrayElemAt: ['$department.name', 0] },
                    status: '$status',
                    pm: "$project_manager",
                    start_date: "$start_date",
                    ends_in: "$end_date",
                    percentage_complete: "No data yet",
                    total_tasks: { $size: '$tasks' }                
                }
            }
        ]);

        if(!project){
            return res.status(404).json({
                status: 'fail',
                message: 'No Projects Yet!!'
            });
        }

        res.status(200).json({
            status: 'success',
            project
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            error
        });
    }
}
