import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../http-common";

const AddEmployee = () => {
    const [designations, setDesignations] = useState([]);
    const [users, setUsers] = useState([]);
    const [filterUsers, setFilterUsers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user_id: filterUsers.length > 0 ? filterUsers[0]._id: null,
        job_id: designations.length > 0 ? designations[0]._id : null,
        role: "Employee",
        employment_type: "Casual",
        contract_length: 0.0
    })

    const handleFormChange = (event) => {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    useEffect(() => {
        const getEmployees = async () => {
            try {
                const response = await http.get('/employees/data/basic-info');
                setEmployees(response.data.employees)
            } catch (error) {
                console.log(error);
            }
        }
        getEmployees()
    },[])

    const getUsers = async () => {
        try {
            const response = await http.get("/users")
            setUsers(response.data.users);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUsers()
    }, []);

    useEffect(() => {
        const getDesignations = async () => {
            try {
                const response = await http.get('/designations');
                setDesignations(response.data.data.designations);
            } catch (error) {
                console.log(error);
            }
        }
        getDesignations()
    },[])

    useEffect(() => {
        const getFilteredUsers = () => {
            try {
                const employeeEmails = employees.map(
                    employee => employee.email
                )

                const filteredUsers = users.filter(user => !employeeEmails.includes(user.email))
                setFilterUsers(filteredUsers);
            } catch (error) {
                console.log(error);
            }             
        }
        getFilteredUsers()
    },[])

    const handleSubmit = async (event) =>{
        try {
            await http.post('/employees', formData);
            console.log('Saved!!');
            navigate("/employees/data/basic-info")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <form className="flex flex-col items-center rounded-lg shadow-md p-2 w-full sm:w-2/3 md:w-1/3 lg:w-1/3">
                    <h1 className="text-center text-green-700 text-2xl mb-4">Edit Employee</h1>

                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="user_id">User:</label>
                        <select 
                            name="user_id" 
                            id="user_id" 
                            className="w-1/2"
                            onChange={handleFormChange}
                        >
                            {filterUsers.map((user, index) => (
                                <option key={index} value={user._id}>{user.full_name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="job_id">Designation:</label>
                        <select 
                            name="job_id" 
                            id="job_id" 
                            className="w-1/2"
                            defaultValue="Select Designation"
                            onChange={handleFormChange}
                        >
                            {designations.map((designation, index) => (
                                <option key={index} value={designation._id}>
                                    {designation.job_title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="role">Role:</label>
                        <select 
                            name="role"
                            id="role" 
                            className="w-1/2"
                            defaultValue="Employee"
                            onChange={handleFormChange}
                        >
                            <option value="Employee">Employee</option>
                            <option value="Admin">Admin</option>
                            <option value="Staff">Staff</option>
                            <option value="Director">Director</option>
                        </select>
                    </div>
                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="employment_type">Employment Type:</label>
                        <select 
                            name="employment_type" 
                            id="employment_type" 
                            className="w-1/2"
                            defaultValue="Casual"
                            onChange={handleFormChange}
                        >
                            <option value="Casual">Casual</option>
                            <option value="Contract">Contract</option>
                            <option value="Permanent">Permanent</option>
                        </select>
                    </div>
                    <input className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700" type="text" placeholder="Contract Length" name='contract_length' onChange={handleFormChange}/>
                    
                    <button className="bg-green-700 hover:bg-green-600 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline w-4/5 mb-4" type="button" onClick={handleSubmit}>Add/Update Employee</button>
                    <span><Link to='/employees'>Go Back</Link></span>
                </form>
            </div>
        </>
    )
}

export default AddEmployee
