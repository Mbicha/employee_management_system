import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../http-common";

const AddTask = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        project_id: null, task_title: "", task_desc: "", start_date: "", end_date: "", status: "", members: []
    });

    const handleFormChange = (event) => {
        const { name, value, type, options } = event.target;
    
        if (type === 'select-multiple') {
            // For select elements with multiple selection enabled
            const selectedOptions = Array.from(options)
                .filter(option => option.selected)
                .map(option => option.value);
    
            setFormData(prev => ({
                ...prev,
                [name]: selectedOptions
            }));
        } else {
            // For other fields, update the state as usual
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    }   

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

    console.log(formData.members);

    const getProjects = async () => {
        try {
            const response = await http.get("/project/data")
            setProjects(response.data.projects);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProjects()
    },[])

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {            
            const response = await http.post('/tasks', formData);
            if (response.status === 200) {
                // Save the token to the local storage
                // localStorage.setItem('token', response.data.foundUser._id);
                navigate('/tasks');
            } else {
                console.log("Can't add task");
            }         
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <form className="flex flex-col items-center rounded-lg shadow-md p-2 w-full sm:w-2/3 md:w-1/3 lg:w-1/3">
                    <h1 className="text-center text-green-700 text-2xl mb-4">Edit Task</h1>
                    
                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="project_id">Project:</label>
                        <select 
                            name="project_id" 
                            id="project_id" 
                            className="w-1/2"
                            onChange={handleFormChange}
                        >
                            {projects.map((project, index) => (
                                
                                <option key={index} value={project._id}>{project.project_name}</option>
                            ))}
                        </select>
                    </div>
                          
                    
                    <input className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700" type="text" placeholder="Task Title" name="task_title" onChange={handleFormChange}/>
                    <textarea className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700"
                        placeholder="Task Description..."
                        rows={2}
                        cols={25}
                        name="task_desc"
                        onChange={handleFormChange}/>
                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="start_date">Start Date:</label>
                        <input className="w-1/2" type="date" name="start_date" onChange={handleFormChange}/>
                    </div>
                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="end_date">End Date:</label>
                        <input className="w-1/2" type="date" name="end_date" onChange={handleFormChange}/>
                    </div>
                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="status">Status:</label>
                        <select 
                            name="status" 
                            id="status" 
                            className="w-1/2"
                            defaultValue="Completed"
                            onChange={handleFormChange}
                        >
                            <option value="In-Progress">In-Progress</option>
                            <option value="Not Started">Not Started</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="members">Members:</label>
                        <select 
                            name="members" 
                            id="members" 
                            className="w-1/2"
                            multiple
                            defaultValue={"Select Member"}
                            onChange={handleFormChange}
                        >
                            {users.map((user, index) => (                                
                                <option key={index} value={user.full_name}>{user.full_name}</option>
                            ))}
                        </select>
                    </div>              

                    <button className="bg-green-700 hover:bg-green-600 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline w-4/5 mb-4" type="button" onClick={handleSubmit}>Add/Update Task</button>
                    <span><Link to='/projects'>Go Back</Link></span>
                </form>
            </div>
        </div>
    )
}

export default AddTask
