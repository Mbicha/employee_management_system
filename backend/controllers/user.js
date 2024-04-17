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
        const {id} = req.body;
        const personalDetails = await User.findOne({id});
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
