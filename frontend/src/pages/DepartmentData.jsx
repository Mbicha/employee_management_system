import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import NoticeBoard from "../components/NoticeBoard";
import httpCommon from "../http-common";

const DepartmentData = () => {
    const { id } = useParams(); //Extracts Department ID
    const user_id = localStorage.getItem("token");

    const [departmentData, setDepartmentData] = useState([]);
    const [employeeData, setEmployeeData] = useState([]);

    /**
     * @description Extract employee by user_id and stores it on employeeData
     */
    useEffect(() => {
        const getEmployee = async () => {
            try {
                const response = await httpCommon.get(`/employees/data/employee/${user_id}`)
                console.log(response.data.employee[0].role);
                setEmployeeData(response.data.employee)
            } catch (error) {
                console.log(error);
            }
        }
        getEmployee()
    }, [])

    useEffect(() => {
        const getDeparmentData = async () => {
            try {
                const response = await httpCommon.get(`/departments/${id}`);
                setDepartmentData(response.data.departments);
            } catch (error) {
                console.log(error);
            }
        }
        getDeparmentData()
    }, [])

    const checkRole = () => {
        if (employeeData[0].role === "Admin" || employeeData[0].role === "Admin") {
            return true
        }
    }

    return (
        <>
            {
                departmentData.map(dept =>
                    <section key={dept._id} className="flex flex-col w-full md:flex-row lg:flex-row">
                        <div className="flex flex-col w-full border-r-2 border-green-600 md:w-1/4 lg:1/4 md:h-screen lg:h-screen">
                            <div className="flex flex-col w-full h-3/4">
                                <div className="flex flex-col">
                                    <h2 className="h-auto m-2">
                                        <span className="font-bold">
                                            Department:
                                        </span>
                                        {dept.name}
                                    </h2>
                                    <h2 className="h-auto m-2">
                                        <span className="font-bold">
                                            Head of Department:
                                        </span>
                                        {dept.head_of_department
                                        }</h2>
                                    <h2 className="h-auto m-2">
                                        <span className="font-bold">
                                            No. of Employees:
                                        </span>
                                        8
                                    </h2>                            
                                </div>
                                {/* Actions */}
                                <div>
                                    {
                                        checkRole ?
                                        (
                                            <div className="flex flex-col border-t-2 border-green-800 p-2">
                                                <Link to={`/add-department/${id}`} className="underline">Update Department</Link>
                                                <Link to={`/add-project`} className="underline">Create Project</Link>
                                                <Link to={`/add-task`} className="underline">Create Task</Link>
                                            </div>
                                        )
                                        :
                                        (
                                            <div className="flex flex-col border-t-2 border-green-800 p-2">
                                                <Link to={`/departments`} className="underline">Go Back</Link>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-full md:w-1/2 lg:1/2 md:h-screen lg:h-screen ml-4">
                            <h1 className="sub-header">Duties</h1>
                            <hr />
                            <ul className="flex flex-col max-h-28 overflow-y-auto">
                                <li>Duty 1</li>
                                <li>Duty 2</li>
                                <li>Duty 3</li>
                            </ul>
                            <hr />
                            <h1 className="sub-header">List of Employees</h1>
                            <hr />
                        </div>
                        <div className="flex flex-col w-full scrollable md:w-1/4 lg:1/4 md:h-screen lg:h-screen">
                            <NoticeBoard/>
                        </div>
                    </section>
                )
            }
        </>
    )
}

export default DepartmentData;
