import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../http-common";

const AddSalary = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        empl_id: null, salary: 0.0, salary_advance: 0.00
    });

    const handleFormChange = (event) => {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }   

    const getEmployees = async () => {
        try {
            const response = await http.get("/employees/data/basic-info")
            setEmployees(response.data.employees);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getEmployees()
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {            
            await http.post('/salaries', formData);
            navigate('/salaries');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <form className="flex flex-col items-center rounded-lg shadow-md p-2 w-full sm:w-2/3 md:w-1/3 lg:w-1/3">
                    <h1 className="text-center text-green-700 text-2xl mb-4">Edit Salary</h1>
                    
                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="empl_id">Employee:</label>
                        <select 
                            name="empl_id" 
                            id="empl_id" 
                            className="w-1/2"
                            onChange={handleFormChange}
                        >
                            {employees.map((employee, index) => (                                
                                <option key={index} value={employee._id}>{employee._id},{employee.full_name}</option>
                            ))}
                        </select>
                    </div>

                    <input className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700" type="text" placeholder="Enter Salary" name="salary" onChange={handleFormChange}/>
                    <input className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700" type="text" placeholder="Enter Salary Advance (Optional)" name="salary_advance" onChange={handleFormChange}/>
                    <button className="bg-green-700 hover:bg-green-600 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline w-4/5 mb-4" type="button" onClick={handleSubmit}>Add/Update Salary</button>
                    <span><Link to='/salaries'>Go Back</Link></span>
                </form>
            </div>
        </div>
    )
}

export default AddSalary
