const Task = require("../models/task");

exports.createTask = async (req, res) => {
    try {
        const newTask = await Task.create(req.body);

        res.status(200).json({
            status: 'success',
            data: {
                newTask
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error
        })
    }
}

exports.updateTask = async (req, res) => {
    try {
        const taskUpdate = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        )

        if(!taskUpdate){
            return res.status(404).json({
                status: 'fail',
                message: 'No task with such id'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                taskUpdate
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error
        })
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const taskDelete = await Task.findByIdAndDelete(req.params.id)

        if(!taskDelete){
            return res.status(404).json({
                status: 'fail',
                message: 'No task with such id'
            });
        }
        
        res.status(200).json({
            status: 'success',
            data: null
        })

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error
        })
    }
}

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.aggregate([
            {
                $lookup: {
                    from: 'projects',
                    localField: 'project_id',
                    foreignField: '_id',
                    as: 'project'
                }
            },
            {
                $project: {
                    project_title: { $arrayElemAt: ['$project.project_title', 0] },
                    task: "$task_title",
                    status: "$status",
                    assigned_to: "$members"
                }
            },
            {
                $group: {
                    _id: "$project_title",
                    tasks: { $push: "$$ROOT" }
                }
            }
        ]);
        
        res.status(200).json({
            status: 'success',
            data: {
                tasks
            }
        });

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error
        });
    }
}
