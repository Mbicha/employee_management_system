import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../http-common";

const AddProject = () => {
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
        dept_id: null, project_title: "", project_desc: "", project_manager: "", start_date: "", end_date: "", status: ""
    });

    const handleFormChange = (event) => {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    const getDepartments = async () => {
        try {
            const response = await http.get("/departments")
            setDepartments(response.data.departments);
        } catch (error) {
            console.log(error);
        }
    }

    departments.map(dept => {
        console.log(dept);
    })

    useEffect(() => {
        getDepartments()
    },[])

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {            
            const response = await http.post('/project', formData);
            if (response.status === 200) {
                // Save the token to the local storage
                // localStorage.setItem('token', response.data.foundUser._id);
                navigate('/employees');
            } else {
                console.log("Invalid Credentials");
            }         
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <form className="flex flex-col items-center rounded-lg shadow-md p-2 w-full sm:w-2/3 md:w-1/3 lg:w-1/3">
                    <h1 className="text-center text-green-700 text-2xl mb-4">Edit Project</h1>

                    <input className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700" type="text" placeholder="Project Title" name='project_title' onChange={handleFormChange}/>
                    
                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="dept_id">Department:</label>
                        <select 
                            name="dept_id" 
                            id="dept_id" 
                            className="w-1/2"
                            onChange={handleFormChange}
                        >
                            {departments.map((dept, index) => (
                                <option key={index} value={dept._id}>{dept.name}</option>
                            ))}
                        </select>
                    </div>
                          
                    
                    <input className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700" type="text" placeholder="Project Manager" name='project_manager' onChange={handleFormChange}/>
                    <textarea className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700"
                        placeholder="Project Description..."
                        rows={2}
                        cols={25}
                        onChange={handleFormChange}/>
                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="start_date">Start Date:</label>
                        <input className="w-1/2" type="date" name='start_date' onChange={handleFormChange}/>
                    </div>
                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="start_date">End Date:</label>
                        <input className="w-1/2" type="date" name='end_date' onChange={handleFormChange}/>
                    </div>
                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="status">Status:</label>
                        <select 
                            name="status" 
                            id="status" 
                            className="w-1/2"
                            defaultValue="Proposed"
                            onChange={handleFormChange}
                        >
                            <option value="Proposed">Proposed</option>
                            <option value="Approved">Approved</option>
                            <option value="Not Started">Not Started</option>
                            <option value="In-Progress">In-Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                    <button className="bg-green-700 hover:bg-green-600 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline w-4/5 mb-4" type="button" onClick={handleSubmit}>Add/Update Project</button>
                    <span><Link to='/projects'>Go Back</Link></span>
                </form>
            </div>
        </div>
    )
}

export default AddProject
