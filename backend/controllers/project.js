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
            data: {
                updateProject
            }
        });
    } catch (error) {
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
                $project: {
                    _id: 0,
                    project_name: "$project_title",
                    department: { $arrayElemAt: ['$department.name', 0] },
                    status: '$status',
                    pm: "$project_manager",
                    ends_in: "$end_date",
                    percentage_complete: "No data yet",
                    year: {$year: '$end_date'}
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
            data: [
                projects
            ]
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error
        });
    }
}
