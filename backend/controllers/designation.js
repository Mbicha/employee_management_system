const Designation = require("../models/designation");

exports.createDesignation = async(req, res) => {
    try {
        const newDesignation = await Designation.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                designation: newDesignation
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to create Designation',
            error: error.message // Send error message to client
        });
    }
}

exports.getAllDesignations = async (req, res) => {
    try {
        const designations = await Designation.find({});

        res.status(200).json({
            status: 'success',
            data: {
                number_of_designation: designations.length,
                designations: designations
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve designations',
            error: error.message // Send error message to client
        });
    }
}

exports.getDesignationById = async (req, res) => {
    try {
        const designation = await Designation.findById(req.params.id)
        
        res.status(200).json({
            status: 'success',
            data: {
                designation: designation
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'No designation with such id',
            error: error.message // Send error message to client
        });
    }
}

exports.updateDesignation = async (req, res) => {
    try {
        const designation = await Designation.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        if(!designation) {
            return res.status(404).json({
                status: 'fail',
                message: "No designation with such id"
            });
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                designation: designation
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

exports.deleteDesignation = async (req, res) => {
    try {
        const designation = await Designation.findByIdAndDelete(req.params.id);

        if(!designation){
            return res.status(404).json({
                status: 'fail',
                message: 'No designation With such ID'
            })
        }

        res.status(200).json({
            status: 'success',
            data: {
                designation: null
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
