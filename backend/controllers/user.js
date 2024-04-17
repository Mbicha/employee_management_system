const User = require('../models/user')

exports.getPersonalDetails = async (req, res) => {
    try {
        const {id} = req.body;
        const personal_details = await User.findOne({id});
        res.status(200).json({
            status: 'success',
            personal_details
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Internal Error',
            error: error.message
        })
    }
}
