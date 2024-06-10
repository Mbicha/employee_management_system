const Salary = require("../models/salary");

exports.createSalary = async(req, res) => {
    try {
        const newSalary = await Salary.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                salary: newSalary
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to create Salary',
            error: error.message // Send error message to client
        });
    }
}

exports.getAllSalaries = async (req, res) => {
    try {
        const salaries = await Salary.find({});

        res.status(200).json({
            status: 'success',
            data: {
                salaries: salaries
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve Salary',
            error: error.message // Send error message to client
        });
    }
}

exports.getSalaryById = async (req, res) => {
    try {
        const salary = await Salary.findById(req.params.id)
        
        res.status(200).json({
            status: 'success',
            salary
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'No Salary with such id',
            error: error.message // Send error message to client
        });
    }
}

exports.updateSalary = async (req, res) => {
    try {
        const salary = await Salary.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        if(!salary) {
            return res.status(404).json({
                status: 'fail',
                message: "No salary with such id"
            });
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                salary: salary
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
}

exports.updateSalaryAdvanceStatus = async (req, res) => {
    try {
        const { advance_status } = req.body;

        if (!advance_status) {
            return res.status(400).json({
                status: 'fail',
                message: 'Advance status is required'
            });
        }

        // Find the employee's salary document and update only the advance_status field
        const salary = await Salary.findOneAndUpdate(
            { _id: req.params.id },
            { advance_status },
            { new: true, runValidators: true }
        );

        if (!salary) {
            return res.status(404).json({
                status: 'fail',
                message: "No salary record found for the employee with such id"
            });
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                salary
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
};

exports.deleteSalary = async (req, res) => {
    try {
        const salary = await Salary.findByIdAndDelete(req.params.id);

        if(!salary){
            return res.status(404).json({
                status: 'fail',
                message: 'No Salary With such ID'
            })
        }

        res.status(200).json({
            status: 'success',
            data: {
                salary: null
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
