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

exports.getLocationById = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id)
        if(!location){
            return res.status(404).json({
                status: 'fail',
                message: 'No such location'
            });
        }
        res.status(200).json({
            status: 'success',
            location
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error
        });
    }
}

exports.getEmployeeLocationByUserId = async (req, res) => {
    try {
        const location = await Location.find({ user_id: req.params.id })
        if(!location){
            return res.status(404).json({
                status: 'fail',
                message: 'No such location'
            });
        }
        res.status(200).json({
            status: 'success',
            location
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error
        });
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

/**
 * Retrieves first and last name, merge them to get full name, then country and address for all employees.
 * The collections being used here are users and locations.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * 
 * @returns {Object} A JSON object containing the HTTP response with the employee data.
 * 
 * @throws {Object} A JSON object containing an error message if an internal server error occurs.
 */
exports.getEmployeeLocationContact = async (req, res) => {
    try {
        const empLocations = await Location.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $project: {
                    _id: 0,
                    country: 1,
                    address: 1,
                    full_name: {
                        $concat: [
                            { $arrayElemAt: ["$user.first_name", 0] },
                            " ",
                            { $arrayElemAt: ["$user.last_name", 0] }
                        ]
                    },
                    phone: { $arrayElemAt: ["$user.phone", 0] },
                    email: { $arrayElemAt: ["$user.email", 0] }      
                }
            }
        ]);

        res.status(200).json({
                status: 'success',
                data: {
                    empLocations: empLocations
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

