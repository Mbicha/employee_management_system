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
                $addFields: {
                    year: { $year: "$end_date"},
                    month: { $month: "$end_date"},
                    day: { $dayOfMonth: "$end_date"}
                }
            },
            {
                $project: {
                    project_title: { $arrayElemAt: ['$project.project_title', 0] },
                    task_title: "$task_title",
                    ends_in: {
                        $concat: [
                            { $toString: "$year" },
                            "-0",
                            { $toString: "$month" },
                            "-",
                            { $toString: "$day" }
                        ]
                    },
                    task_desc: "$task_desc",
                    status: "$status",
                    assigned_to: "$members"
                }
            },
        ]);
        
        res.status(200).json({
            status: 'success',
            tasks
        });

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error
        });
    }
}
