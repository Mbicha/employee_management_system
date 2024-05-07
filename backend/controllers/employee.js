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
        console.log(error);
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
            employee
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'No employee with such id',
            error: error.message // Send error message to client
        });
    }
}

exports.getEmployeeByUserId = async (req, res) => {
    try {
        const employee = await Employee.find({user_id: req.params.id})
        
        res.status(200).json({
            status: 'success',
            employee
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'No Data Available',
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

/**
 * Retrieves the names, email addresses, roles, designations, and departments of all employees.
 * This function aggregates data from the "Employees", "Users", "Designations", and "Departments" collections
 * in the MongoDB database and constructs an array of objects containing employee information.
 * The employee's full name is concatenated from their first name and last name.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * 
 * @returns {Object} A JSON object containing the HTTP response with the employee data.
 * 
 * @throws {Object} A JSON object containing an error message if an internal server error occurs.
 */
exports.getEmployeeBasicInfo = async (req, res) => {
    try {
        const employees = await Employee.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $lookup: {
                    from: "designations",
                    localField: "job_id",
                    foreignField: "_id",
                    as: "designation"
                }
            },
            {
                $lookup: {
                    from: "departments",
                    localField: "designation.dept_id",
                    foreignField: "_id",
                    as: "department"
                }
            },
            {
                $project: {
                    full_name:{
                        $concat: [
                            {$arrayElemAt: ["$user.first_name", 0] },
                            " ",
                            {$arrayElemAt: ["$user.last_name", 0] }
                        ]
                    },
                    email: {$arrayElemAt: ["$user.email", 0] },
                    role: 1,
                    designation: { $arrayElemAt: ["$designation.job_title", 0] },
                    department: { $arrayElemAt: ["$department.name", 0] }
                }
            }
        ]);

        res.status(200).json({
            status: 'success',
            employees
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
}

/**
 * Retrieves employee salary details
 */
exports.getEmployeeSalaries = async (req, res) => {
    try {
        const empSalaries = await Employee.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $lookup: {
                    from: "salaries",
                    localField: "_id",
                    foreignField: "empl_id",
                    as: "salary"
                }
            },
            {
                $lookup: {
                    from: "overtimes",
                    localField: "_id",
                    foreignField: "emp_id",
                    as: "overtime"
                }
            },
            {
                $addFields: {
                    total_hours: {
                        $divide: [
                            { 
                                $subtract: [
                                    {$arrayElemAt: ["$overtime.stop_time", 0]},
                                    {$arrayElemAt: ["$overtime.start_time", 0]}
                                ]
                            },
                            1000 * 60 * 60 // Convert milliseconds to hours
                        ]
                    }
                }
            },
            {
                $addFields: {
                    remaining_salary: {
                        $subtract:  [
                            { $arrayElemAt: ["$salary.salary", 0] },
                            { $arrayElemAt: ["$salary.salary_advance", 0] }
                        ]
                    }
                }
            },
            {
                $project: {
                    full_name:{
                        $concat: [
                            {$arrayElemAt: ["$user.first_name", 0] },
                            " ",
                            {$arrayElemAt: ["$user.last_name", 0] }
                        ]
                    },
                    role: 1,
                    user_id: {$arrayElemAt: ["$user._id", 0]},
                    salary_id: {$arrayElemAt: ["$salary._id", 0]},
                    basic_salary: {$arrayElemAt: ["$salary.salary", 0]},
                    salary_adavance: {$arrayElemAt: ["$salary.salary_advance", 0]},
                    total_hours: "$total_hours",
                    hourly_rate: { $arrayElemAt: ["$overtime.hourly_rate", 0] },
                    paid_salary: { 
                        $sum: [
                                { $multiply: [
                                    { $arrayElemAt: ["$overtime.hourly_rate", 0] },
                                    "$total_hours"
                                ]
                            },
                            "$remaining_salary"
                        ]
                    },
                }
            },
            {
                $sort: { paid_salary: -1 }
            }
        ]);

        res.status(200).json({
            status: 'success',
            empSalaries
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            message: 'internal error',
            error: error.message
        });
    }
}
