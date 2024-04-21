import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import http from "../http-common";

const Deparments = () => {
    const [departements, setDepartments] = useState([]);
    const [numberDepartments, setNumberDepartments] = useState(0);

    useEffect(() => {
        const getDepartments = async () => {
            try {
                const response = await http.get('/departments');
                setNumberDepartments(response.data)
                setDepartments(response.data.departments);
            } catch (error) {
                console.log(error);
            }
        }
        getDepartments();
    }, []);


    
    return (
        <div>
            <section className="flex flex-col">
                {/* Heading Section */}
                <div className="flex flex-col border-gray-10 pr-5 pl-5 pt-5 pb-1">
                    <h1 className="flex flex-row justify-center bg-gray-800 text-green-600 border-b-2 border-green-600 p-3 font-serif font-bold text-2xl">
                        DEPARTMENTS
                    </h1>
                    <div className="flex flex-row justify-between border-b-2 border-green-600 p-2">
                        <h1>Total Departments: {numberDepartments.number_of_departments}</h1>
                        <Link to="/add-department" className="bg-green-600 p-1 border rounded-md">
                            Add Department
                        </Link>
                    </div>
                </div>
                
                {/* Departments section */}
                <div className="flex flex-wrap justify-center md:flex-row lg:flex-row max-w-full max-h-full p-4">                
                    {/* Each Department Card */}     
                    {departements.map(department => (
                        <Link key={department._id} to={`/deptdata/${department._id}`} className="flex flex-col w-72 border rounded-lg m-2 shadow-md p-2">
                            <div className="flex flex-row justify-center rounded-md font-semibold border-b-2 border-green-600">
                                {department.name}
                            </div>
                            <div className="pt-4">
                                <span className="text-green-600 font-semibold mr-1">
                                    In-charge:
                                </span>
                                {department.head_of_department}
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Deparments;
