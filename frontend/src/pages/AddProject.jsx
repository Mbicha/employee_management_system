import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import http from "../http-common";

const AddProject = () => {
    const {id} = useParams()
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [projectData, setProjectData] = useState({});
    const [formData, setFormData] = useState({
        dept_id: null, project_title: "", project_desc: "", project_manager: "", start_date: "", end_date: "", status: ""
    });

    const handleFormChange = (event) => {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    useEffect(() => {
        const getDepartments = async () => {
            try {
                const response = await http.get("/departments")
                setDepartments(response.data.departments);
            } catch (error) {
                console.log(error);
            }
        }
        getDepartments()
    },[])

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() =>{
        const getProject = async () => {
            try {
                if(id) {
                    const response = await http.get(`/project/data/project/${id}`)
                    const project = response.data.project;

                    const resData = project[0];
                    setFormData((prev) => ({
                        ...prev,
                        dept_id: project[0].dept_id,
                        project_title: project[0].project_name,
                        project_desc: project[0].project_desc,
                        project_manager: project[0].pm,
                        start_date: formatDate(project[0].start_date),
                        end_date: formatDate(project[0].ends_in),
                        status: project[0].status,
                        department: project[0].department
                    }))
                    setProjectData(resData)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getProject()
    },[id])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if(id){
                await http.patch(`/project/${id}`, formData);
            } else {
                await http.post('/project', formData);
            }
            navigate('/projects');            
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            if(id){
                await http.delete(`/project/${id}`);
            }
            navigate('/projects');           
        } catch (error) {
            console.log(error);
        }
    }

    const handleHeadText = id ? "Edit Project" : "Add Project";

    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <form className="flex flex-col items-center rounded-lg shadow-md p-2 w-full sm:w-2/3 md:w-1/3 lg:w-1/3">
                    <h1 className="text-center text-green-700 text-2xl mb-4">{handleHeadText}</h1>

                    <input
                        className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700"
                        type="text"
                        placeholder="Project Title"
                        name='project_title'
                        value={formData.project_title}
                        onChange={handleFormChange}/>
                    
                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="dept_id">Department:</label>
                        <select 
                            name="dept_id" 
                            id="dept_id" 
                            className="w-1/2"
                            onChange={handleFormChange}
                        >
                            {
                                id && formData.dept_id ?
                                (<option key={formData.dept_id} value={formData.dept_id}>{formData.department}</option>)
                                :
                                (departments.map((dept, index) => (
                                    <option key={index} value={dept._id}>{dept.name}</option>
                                )))
                            }
                            
                        </select>
                    </div>
                          
                    
                    <input
                        className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700"
                        type="text"
                        placeholder="Project Manager"
                        name='project_manager'
                        value={formData.project_manager}
                        onChange={handleFormChange}/>
                    <textarea className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700"
                        placeholder="Project Description..."
                        rows={2}
                        cols={25}
                        value={formData.project_desc}
                        onChange={handleFormChange}/>
                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="start_date">Start Date:</label>
                        <input
                            className="w-1/2"
                            type="date"
                            name='start_date'
                            value={formData.start_date}
                            onChange={handleFormChange}/>
                    </div>
                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="start_date">End Date:</label>
                        <input className="w-1/2"
                        type="date"
                        name='end_date'
                        value={formData.end_date}
                        onChange={handleFormChange}/>
                    </div>
                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="status">Status:</label>
                        <select 
                            name="status" 
                            id="status" 
                            className="w-1/2"
                            value={formData.status}
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
                    <span><Link to='/projects'>Go Back</Link></span>
                </form>
            </div>
        </div>
    )
}

export default AddProject
