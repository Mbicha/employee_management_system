import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import http from "../http-common";

const Task = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getAllTasks = async () => {
            try {
                const response = await http.get('/tasks/data/tasks');
                setTasks(response.data.tasks);
            } catch (error) {
                console.log(error);
            }
        }
        getAllTasks();
    }, [])

    return (
        <div>
            <section className="flex flex-col">
                {/* Heading Section */}
                <div className="flex flex-col border-gray-10 pr-5 pl-5 pt-5 pb-1">
                    <h1 className="flex flex-row justify-center bg-gray-800 text-green-600 border-b-2 border-green-600 p-3 font-serif font-bold text-2xl">
                        TASKS
                    </h1>
                    <div className="flex flex-row justify-between border-b-2 border-green-600 p-2">
                        <h1>Total Tasks: {0}</h1>
                        <Link to="/add-task" className="bg-green-600 p-1 border rounded-md">
                            Add Task
                        </Link>
                    </div>
                </div>
                
                {/* Tasks section */}
                <div className="flex flex-wrap justify-center md:flex-row lg:flex-row max-w-full max-h-full p-4">                
                    {/* Each Task Card */}
                    {tasks.map(task => (
                        <Link key={task._id} to={`/add-task/${task._id}`} className="flex flex-col w-72 border rounded-lg m-2 shadow-md p-2">
                            <div className="flex flex-row justify-center rounded-md font-semibold border-b-2 border-green-600">
                                {task.task_title}
                            </div>
                            <div className="pt-4">
                                <span className="text-green-600 font-semibold mr-1">
                                    Status:
                                </span>
                                {task.status}
                            </div>
                            <div className="pt-4">
                                <span className="text-green-600 font-semibold mr-1">
                                    Ends In:
                                </span>
                                {task.ends_in}
                            </div>
                            <div className="pt-4">
                                <span className="text-green-600 font-semibold mr-1">
                                    Members:
                                </span>
                                {task.assigned_to}
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Task;
