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
                    <div className="flex flex-col justify-center">
                        <div className="flex flex-row justify-between w-1/3 text-green-600 border-b-2 border-green-600 p-3 font-serif font-semibold text-2xl">
                            <div>Full Name</div>
                            <div>Role</div>
                            <div>Basic Salary</div>
                        </div>
                        {/* Salaries Section */}
                        {
                            salaries.map(employeeSalary =>
                                <div key={employeeSalary.full_name} className="flex flex-row justify-between w-1/3">
                                    <div className="flex justify-start">{employeeSalary.full_name}</div>
                                    <div className="flex justify-start">{employeeSalary.role}</div>
                                    <div className="flex justify-start">{employeeSalary.basic_salary}</div>
                                </div>
                            )
                        }                        
                    </div>                    
                </div>
            </section>                            
        </>
    )
}

export default Salaries
