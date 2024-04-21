import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import http from "../http-common";

const Project = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const getAllProjects = async () => {
            try {
                const response = await http.get('/project/data/');
                setProjects(response.data.projects);
            } catch (error) {
                console.log(error);
            }
        }
        getAllProjects();
    }, []);

    projects.map(project =>
        console.log(project.project_name)
    )
    
    return (
        <div>
            <section className="flex flex-col">
                {/* Heading Section */}
                <div className="flex flex-col border-gray-10 pr-5 pl-5 pt-5 pb-1">
                    <h1 className="flex flex-row justify-center bg-gray-800 text-green-600 border-b-2 border-green-600 p-3 font-serif font-bold text-2xl">
                        PROJECTS
                    </h1>
                    <div className="flex flex-row justify-between border-b-2 border-green-600 p-2">
                        <h1>Total Project: {}</h1>
                        <Link to="/add-project" className="bg-green-600 p-1 border rounded-md">
                            Add Project
                        </Link>
                    </div>
                </div>
                
                {/* Departments section */}
                <div className="flex flex-wrap justify-center md:flex-row lg:flex-row max-w-full max-h-full p-4">                
                    {/* Each Department Card */}
                    {projects.map(project => (
                        <Link key={project._id} to="/" className="flex flex-col w-72 border rounded-lg m-2 shadow-md p-2">
                            <div className="flex flex-row justify-center rounded-md font-semibold border-b-2 border-green-600">
                                {project.project_name}
                            </div>
                            <div className="pt-4">
                                <span className="text-green-600 font-semibold mr-1">
                                    Project Manager:
                                </span>
                                {project.pm}
                            </div>
                            <div className="pt-4">
                                <span className="text-green-600 font-semibold mr-1">
                                    Department:
                                </span>
                                {project.department}
                            </div>
                            <div className="pt-4">
                                <span className="text-green-600 font-semibold mr-1">
                                    Status:
                                </span>
                                {project.status}
                            </div>
                            <div className="pt-4">
                                <span className="text-green-600 font-semibold mr-1">
                                    Ends In:
                                </span>
                                {project.ends_in}
                            </div>
                            <div className="pt-4">
                                <span className="text-green-600 font-semibold mr-1">
                                    % Complete:
                                </span>
                                {project.percentage_complete}
                            </div>
                            <div className="pt-4">
                                <span className="text-green-600 font-semibold mr-1">
                                    Total Tasks:
                                </span>
                                {project.total_tasks}
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Project;
