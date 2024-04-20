const mongoose = require("mongoose");
const Department = require("../models/department");

exports.createDepartment = async(req, res) => {
    try {
        const newDepartment = await Department.create({
            name: req.body.name,
            head_of_department: req.body.head_of_department
        });

        res.status(201).json({
            status: 'success',
            data: {
                department: newDepartment
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to create department',
            error: error.message // Send error message to client
        });
    }
}

exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find({});

        res.status(200).json({
            status: 'success',
            number_of_departments: departments.length,
            departments: departments
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve departments',
            error: error.message // Send error message to client
        });
    }
}


exports.getDepartmentById = async (req, res) => {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id)
        const department = await Department.aggregate([
            {
                $match: {
                    _id: id
                },
            }
        ]);

        const departments = await Department.aggregate([
            {
                $lookup: {
                    from: "projects",
                    localField: "_id",
                    foreignField: "dept_id",
                    as: 'project'
                },
                $lookup: {
                    from: "designations",
                    localField: "_id",
                    foreignField: "dept_id",
                    as: "designation"
                }
            }
        ])
        
        res.status(200).json({
            status: 'success',
            department,
            departments
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'No department with such id',
            error: error.message // Send error message to client
        });
    }
}

exports.updateDeparment = async (req, res) => {
    try {
        const department = await Department.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        if(!department) {
            return res.status(404).json({
                status: 'fail',
                message: "No department with such id"
            });
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                department: department
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

exports.deleteDepartment = async (req, res) => {
    try {
        const department = await Department.findByIdAndDelete(req.params.id);

        if(!department){
            return res.status(404).json({
                status: 'fail',
                message: 'No Department With such ID'
            })
        }

        res.status(200).json({
            status: 'success',
            data: {
                department: null
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
