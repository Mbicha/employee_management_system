import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import http from "../http-common";

const AddEmployee = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [designations, setDesignations] = useState([]);
    const [users, setUsers] = useState([]);
    const [filterUsers, setFilterUsers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [employeeData, setEmployeeData] = useState([]);
    const [formData, setFormData] = useState({
        user_id: null,
        job_id: designations.length > 0 ? designations[0]._id : null,
        role: "Employee",
        employment_type: "Casual",
        contract_length: 0.0
    })

    /**
     * Handle form change event by updating the form data state with the new value.
     * @param {Event} event - The event object containing the form input's name and value.
     */
    const handleFormChange = (event) => {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    useEffect(() => {
        const getEmployee = async () => {
            try {
                if(id) {
                    const response = await http.get(`/employees/${id}`)
                    const employee = response.data.employee;
                    setFormData((prev) => ({
                        ...prev,
                        user_id: employee[0].user_id,
                        job_id: employee[0].job_id,
                        role: employee[0].role,
                        employment_type: employee[0].employment_type,
                        contract_length: employee[0].contract_length,
                        full_name: employee[0].full_name,
                        designation: employee[0].designation
                    }))
                }
            } catch (error) {
                console.log(error);
            }
        }
        getEmployee()
    },[id])

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await http.get("/users")
                setUsers(response.data.users);
            } catch (error) {
                console.log(error);
            }
        }
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
        const getEmployeeData = () => {
            try {
                const user = users.find(user => user._id === id);
                if (user) {
                    setEmployeeData(user);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getEmployeeData();
    }, [id, users]);

    const handleSubmit = async (event) =>{
        try {
            if(id) {
                await http.patch(`/employees/${id}`, formData)
            } else{
                await http.post('/employees', formData);
            }
            navigate("/employees")
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (event) => {
        try {
            await http.delete(`/employees/${id}`)
        } catch (error) {
            console.log(error);
        }
    }

    const handleHeadText = id ? "Edit" : "Add"

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <form className="flex flex-col items-center rounded-lg shadow-md p-2 w-full sm:w-2/3 md:w-1/3 lg:w-1/3">
                    <h1 className="text-center text-green-700 text-2xl mb-4">{handleHeadText} Employee</h1>

                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="user_id">User:</label>
                        <select 
                            name="user_id" 
                            id="user_id"
                            className="w-1/2"
                            onChange={handleFormChange}
                        >
                            {
                                id ?
                                (<option value={formData.user_id}>{formData.full_name}</option>)
                                :
                                (
                                    users.map((user, index) => (
                                        <option key={index} value={user._id}>{user.full_name}</option>
                                    ))
                                )
                            }                            
                        </select>
                    </div>

                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="job_id">Designation:</label>
                        <select 
                            name="job_id" 
                            id="job_id"
                            className="w-1/2"
                            value={formData.designation}
                            onChange={handleFormChange}
                        >
                            {
                                id && (
                                    <option value={formData.job_id}>
                                        {formData.designation}
                                    </option>
                                )
                            }
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
                            value={formData.role}
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
                            value={formData.employment_type}
                            onChange={handleFormChange}
                        >
                            <option value="Casual">Casual</option>
                            <option value="Contract">Contract</option>
                            <option value="Permanent">Permanent</option>
                        </select>
                    </div>
                    <input
                        className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700"
                        type="text"
                        placeholder="Contract Length"
                        name='contract_length'
                        value={formData.contract_length}
                        onChange={handleFormChange}/>
                    {
                        id ?
                        <div className="flex flex-row justify-between w-4/5">
                            <button
                                className="bg-green-700 hover:bg-green-600 text-white font-bold p-2 mr-1 rounded focus:outline-none focus:shadow-outline w-4/5 mb-4"
                                type="button"
                                onClick={handleDelete}>
                                    Delete
                            </button>
                            <button
                                className="bg-green-700 hover:bg-green-600 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline w-4/5 mb-4"
                                type="button"
                                onClick={handleSubmit}>
                                    Update
                            </button>
                        </div>
                        :
                        <button 
                            className="bg-green-700 hover:bg-green-600 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline w-4/5 mb-4"
                            type="button"
                            onClick={handleSubmit}>
                            Save
                        </button>
                    }
                    <span><Link to='/employees'>Go Back</Link></span>
                </form>
            </div>
        </>
    )
}

export default AddEmployee
