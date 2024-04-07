const Employee = require('../models/employee')

exports.createEmployee = async (req, res) => {
    try {
        const newEmployee = await Employee.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                employee: newEmployee
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error: error,
        })
    }
}

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({});

        if(!employees){
            return res.status(404).json({
                status: 'fail',
                message: '0 Employees'
            });
        }

        res.status(200).json({
            number_of_employees: employees.length,
            data: {
                status: 'success',
                employees: employees
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'success',
            error: error
        })
    }
}

exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id)
        
        res.status(200).json({
            status: 'success',
            data: {
                employee: employee
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'No employee with such id',
            error: error.message // Send error message to client
        });
    }
}

exports.updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        if(!employee) {
            return res.status(404).json({
                status: 'fail',
                message: "No employee with such id"
            });
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                employee: employee
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

exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);

        if(!employee){
            return res.status(404).json({
                status: 'fail',
                message: 'No employee With such ID'
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
            message: 'Internal server error',
            error: error.message
        });
    }
}
