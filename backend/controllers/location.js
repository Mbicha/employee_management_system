const Location = require('../models/location')

exports.createLocation = async (req, res) => {
    try {
        const location = await Location.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                location: location
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: "Internal Error",
            error: error.message
        })
    }
}

exports.updateLocation = async (req, res) => {
    try{
        const location = await Location.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if(!location){
            return res.status(404).json({
                status: 'fail',
                message: 'No Location with Such ID'
            })
        }

        res.status(201).json({
            status: 'success',
            data: {
                location: location
            }
        })
    } catch(error) {
        res.status(500).json({
            status: 'fail',
            message: "Internal Error",
            error: error.message
        })
    }
}
