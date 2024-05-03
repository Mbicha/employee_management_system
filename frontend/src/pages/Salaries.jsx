import {React, useState, useEffect} from "react"
import { Link } from "react-router-dom"
import httpCommon from "../http-common";

const Salaries = () => {    
    const id = localStorage.getItem('token');
    const [salaries, setSalaries] = useState([]);
    
    useEffect(() => {
        const getSalaries = async () => {
            try {
                const response = await httpCommon.get("/employees/data/employee-salaries")
                setSalaries(response.data.empSalaries);
            } catch (error) {
                console.log(error);
            }
        }
        getSalaries()
    },[])

    return(
        <>
            <section className="flex flex-col">
                {/* Heading Section */}
                <div className="flex flex-col border-gray-10 pr-5 pl-5 pt-5 pb-1">
                    <h1 className="flex flex-row justify-center bg-gray-800 text-green-600 border-b-2 border-green-600 p-3 font-serif font-bold text-2xl">
                        SALARIES
                    </h1>
                    <div className="flex flex-row justify-between border-b-2 border-green-600 p-2">
                        <h1>Total Employees: {0}</h1>
                        <h1>Total Amount: {0.00}</h1>
                        <div>
                            <Link to={`/add-salary`} className="bg-green-600 p-1 border rounded-md">
                                Add Salary
                            </Link>
                            <Link className="bg-green-600 p-1 border rounded-md">
                                Pay All
                            </Link>
                            <Link to={`/profile/${id}`} className="bg-green-600 p-1 border rounded-md">
                                Profile
                            </Link>
                        </div>                        
                    </div>
                    <table className="flex flex-col justify-center border-2 border-green-700 rounded-b-md mt-2">
                        <thead>
                            <tr className="flex flex-row justify-between border-b border-green-700">
                                <th className="px-4 py-2">Full Name</th>
                                <th className="px-4 py-2">Role</th>
                                <th className="px-4 py-2">Basic Salary</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salaries.map(employee_salary =>
                                <tr key={employee_salary.salary_id} className="flex flex-row justify-between border-b">
                                    <td className="px-4 py-2">{employee_salary.full_name}</td>
                                    <td className="px-4 py-2">{employee_salary.role}</td>
                                    <td className="px-4 py-2">{employee_salary.basic_salary}</td>
                                    <td className="px-4 py-2">
                                        <div className="flex flex-row justify-between">
                                            <Link className="flex justify-center bg-green-800 p-1 text-white rounded-md w-14">Pay</Link>
                                            <Link to={`/add-salary/${employee_salary.salary_id}`} className="flex justify-center bg-green-800 p-1 text-white rounded-md w-14 ml-1">Update</Link>
                                        </div>                                        
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>              
                </div>
            </section>                            
        </>
    )
}

export default Salaries
