const User = require('../models/user')

exports.updatePersonaDetails = async (req, res) => {
    try {
        const newData = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        if(!newData) {
            return res.status(404).json({
                status: 'fail',
                message: "No user with such id"
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'success',
            error
        });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const employee = await User.findByIdAndDelete(req.params.id);

        if(!employee){
            return res.status(404).json({
                status: 'fail',
                message: 'No User With such ID'
            })
        }

        res.status(200).json({
            status: 'success',
            data: {
                employee: null
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error
        });
    }
}

exports.getPersonalDetails = async (req, res) => {
    try {
        const personalDetails = await User.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            personalDetails
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Internal Error',
            error: error.message
        })
    }
}

exports.getFullName = async (req, res) => {
    try {
        const users = await User.aggregate([
            {
                $project: {
                    _id: 0,
                    full_name:{
                        $concat: [
                            "$first_name",
                            " ",
                            "$last_name"
                        ]
                    },
                }
            }
        ])

        if(!users){
            return res.status(404).json({
                status: 'fail',
                message: 'No users'
            })
        }

        res.status(200).json({
            status: 'success',
            users
        })
    } catch (error) {
        res.status(500).json({
            status: 'success',
            error
        })
    }
}
