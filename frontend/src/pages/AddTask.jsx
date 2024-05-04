import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import http from "../http-common";

const AddTask = () => {
    const {id} = useParams()
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    // const [filteredProject, setFilteredProject] = useState([]);
    const [taskData, setTaskData] = useState([]);
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
        const getProjects = async () => {
            try {
                const response = await http.get("/project/data")
                setProjects(response.data.projects);
            } catch (error) {
                console.log(error);
            }
        }
        getProjects()
    },[])

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${month}-${day}-${year}`;
    };

    useEffect(() => {
        const getTask = async () => {
            try {
                if(id){
                    const response = await http.get(`/tasks/${id}`)
                    const task = response.data.task;
                    setFormData((prev) =>({
                        ...prev,
                        project_id: task.project_id,
                        task_title: task.task_title,
                        task_desc: task.task_desc,
                        start_date: task.start_date,
                        end_date: task.end_date,
                        status: task.status,
                        members: task.members
                    }));
                    setTaskData(response.data.task)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getTask()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if(id){
                await http.patch(`/tasks/${id}`, formData)
            } else {
                await http.post('/tasks', formData);
            }
            navigate('/tasks');            
        } catch (error) {
            console.log(error);
        }
    }

    const handleHeadText = id ? "Edit Task" : "Add Task"
    const handleButtonText = id ? "Update Task" : "Save Task"

    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <form className="flex flex-col items-center rounded-lg shadow-md p-2 w-full sm:w-2/3 md:w-1/3 lg:w-1/3">
                    <h1 className="text-center text-green-700 text-2xl mb-4">{handleHeadText}</h1>
                    
                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="project_id">Project:</label>
                        <select 
                            name="project_id" 
                            id="project_id" 
                            className="w-1/2"
                            defaultValue={taskData.length > 0 ? taskData.project_id : formData.project_id}
                            onChange={handleFormChange}
                        >
                            {projects.map((project, index) => (                                
                                <option key={index} value={project._id}>{project.project_name}</option>
                            ))}
                        </select>
                    </div>
                          
                    
                    <input
                        className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700"
                        type="text" 
                        placeholder="Task Title"
                        name="task_title"
                        value={formData.task_title}
                        onChange={handleFormChange}/>
                    <textarea className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700"
                        placeholder="Task Description..."
                        rows={2}
                        cols={25}
                        value={formData.task_desc}
                        name="task_desc"
                        onChange={handleFormChange}/>
                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="start_date">Start Date:</label>
                        <input 
                            className="w-1/2"
                            type="date"
                            name="start_date"
                            value={formatDate(formData.start_date)}
                            onChange={handleFormChange}/>
                    </div>
                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="end_date">End Date:</label>
                        <input
                            className="w-1/2" 
                            type="date"
                            name="end_date"
                            value={formData.end_date}
                            onChange={handleFormChange}/>
                    </div>
                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="status">Status:</label>
                        <select 
                            name="status" 
                            id="status" 
                            className="w-1/2"
                            defaultValue="Completed"
                            value={formData.status}
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
                            value={formData.members}
                            onChange={handleFormChange}
                        >
                            {users.map((user, index) => (                                
                                <option key={index} value={user.full_name}>{user.full_name}</option>
                            ))}
                        </select>
                    </div>  

                    <button
                        className="bg-green-700 hover:bg-green-600 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline w-4/5 mb-4"
                        type="button"
                        onClick={handleSubmit}>
                            {handleButtonText}
                    </button>
                    <span><Link to='/tasks'>Go Back</Link></span>
                </form>
            </div>
        </div>
    )
}

export default AddTask
