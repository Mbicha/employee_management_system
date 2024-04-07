const Overtime = require("../models/overtime");

exports.createOvertime = async(req, res) => {
    try {
        const newOvertime = await Overtime.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                overtime: newOvertime
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to create overtime',
            error: error.message // Send error message to client
        });
    }
}

exports.getAllOvertime = async (req, res) => {
    try {
        const overtimes = await Overtime.find({});

        res.status(200).json({
            status: 'success',
            data: {
                overtimes: overtimes
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve overtimes',
            error: error.message // Send error message to client
        });
    }
}

exports.getOvertimeById = async (req, res) => {
    try {
        const overtime = await Overtime.findById(req.params.id)
        
        res.status(200).json({
            status: 'success',
            data: {
                overtime: overtime
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'No overtime with such id',
            error: error.message // Send error message to client
        });
    }
}

exports.updateOvertime = async (req, res) => {
    try {
        const overtime = await Overtime.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        if(!overtime) {
            return res.status(404).json({
                status: 'fail',
                message: "No overtime with such id"
            });
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                overtime: overtime
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
}

exports.deleteOvertime = async (req, res) => {
    try {
        const overtime = await Overtime.findByIdAndDelete(req.params.id);

        if(!overtime){
            return res.status(404).json({
                status: 'fail',
                message: 'No overtime With such ID'
            })
        }

        res.status(200).json({
            status: 'success',
            data: {
                overtime: null
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
}
