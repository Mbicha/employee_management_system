import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import NoticeBoard from "../components/NoticeBoard";
import httpCommon from "../http-common";

const DepartmentData = () => {
    const { id } = useParams(); //Extracts Department ID
    const [departmentData, setDepartmentData] = useState([]);

    useEffect(() => {
        const getDeparmentData = async () => {
            try {
                const response = await httpCommon.get(`/departments/${id}`);
                setDepartmentData(response.data.department);
            } catch (error) {
                console.log(error);
            }
        }
        getDeparmentData()
    }, [])

    return (
        <>
            {
                departmentData.map(dept =>
                    <section className="flex flex-col w-full md:flex-row lg:flex-row">
                        <div className="flex flex-col w-full border-r-2 border-green-600 md:w-1/4 lg:1/4 md:h-screen lg:h-screen">
                            <div className="flex flex-col w-full h-3/4">
                                <div className="flex flex-col">
                                    <h2 className="h-4 m-2">
                                        <span className="font-bold">
                                            Department:
                                        </span>
                                        {dept.name}
                                    </h2>
                                    <h2 className="h-4 m-2">
                                        <span className="font-bold">
                                            Head of Department:
                                        </span>
                                        {dept.head_of_department
                                        }</h2>
                                    <h2 className="h-4 m-2">
                                        <span className="font-bold">
                                            No. of Employees:
                                        </span>
                                        8
                                    </h2>                            
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
