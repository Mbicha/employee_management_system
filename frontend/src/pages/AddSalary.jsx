import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import http from "../http-common";

const AddSalary = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [salaryData, setSalaryData] = useState([]);
    const [filteredEmployee, setFilteredEmployee] = useState([]);
    const [formData, setFormData] = useState({
        empl_id: null, salary: 0.0, salary_advance: 0.00
    });

    const handleFormChange = (event) => {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    useEffect(() => {
        const getSalary = async () => {
            try {
                if(id) {
                    const response = await http.get(`/salaries/${id}`);
                    setFormData((prev) => ({
                        empl_id: null,
                        salary: response.data.salary.salary,
                        salary_advance: response.data.salary.salary_advance
                    }))
                    setSalaryData(response.data.salary)
                }
                
            } catch (error) {
                console.log(error);
            }
        }
        getSalary()
    },[id])

    useEffect(() => {
        const getEmployees = async () => {
            try {
                const response = await http.get("/employees/data/basic-info")
                setEmployees(response.data.employees);
            } catch (error) {
                console.log(error);
            }
        }
        getEmployees()
    }, []);

    useEffect(() => {
        const filterEmployee = () => {
            try {
                const employee = employees.filter(emp => emp._id === salaryData.empl_id);
                setFilteredEmployee(employee);    
            } catch (error) {
                console.log(error);
            }
        }
        filterEmployee()
    }, [employees, salaryData.empl_id]);

    const updateButtonText = id ? "Update Salary" : "Add Salary";
    const updateHeadText = id ? "Edit Salary" : "Add Salary"

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if(id) {
                await http.post('/salaries', formData);
            } else {
                await http.patch(`/salaries/${id}`, formData)
            }            
            navigate('/salaries');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <form className="flex flex-col items-center rounded-lg shadow-md p-2 w-full sm:w-2/3 md:w-1/3 lg:w-1/3">
                    <h1 className="text-center text-green-700 text-2xl mb-4">{updateHeadText}</h1>
                    
                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="empl_id">Employee:</label>
                        <select 
                            name="empl_id" 
                            id="empl_id" 
                            className="w-1/2"
                            onChange={handleFormChange}
                        >
                            {filteredEmployee.length > 0 ? (
                                filteredEmployee.map((employee, index) => (                                
                                    <option key={index} value={employee._id}>{employee.full_name}</option>
                                ))
                            ) : (
                                employees.map((employee, index) => (                                
                                    <option key={index} value={employee._id}>{employee.full_name}</option>
                                ))
                            )}
                        </select>
                    </div>

                    <input
                        className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700"
                        type="text"
                        placeholder="Enter Salary"
                        name="salary" value={formData.salary}
                        onChange={handleFormChange}/>
                    <input
                        className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700"
                        type="text"
                        placeholder="Enter Salary Advance (Optional)"
                        value={formData.salary_advance}
                        name="salary_advance" 
                        onChange={handleFormChange}/>
                    <button 
                        className="bg-green-700 hover:bg-green-600 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline w-4/5 mb-4"
                        type="button"
                        onClick={handleSubmit}>
                            {updateButtonText}
                    </button>
                    <span><Link to='/salaries'>Go Back</Link></span>
                </form>
            </div>
        </div>
    )
}

export default AddSalary
