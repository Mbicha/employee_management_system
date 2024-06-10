import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import http from "../http-common";

const ApproveSalaryAdvance = () => {
    const [salaries, setSalaries] = useState([]);
    const id = localStorage.getItem("token");
    const [formData, setFormData] = useState({
        advance_status: "Requested"
    });

    useEffect(() => {
        const getSalaries = async () => {
            try {
                const response = await http.get("/employees/data/employee-salaries");
                const salaries = response.data.empSalaries;
                const requested = requestedSalaries(salaries);
                setSalaries(requested);
            } catch (error) {
                console.log(error);
            }
        };
        getSalaries();
    }, []);

    const updateAdvance = async (id, status) => {
        try {
            const updatedFormData = { ...formData, advance_status: status };
            await http.patch(`/salaries/salary/salary-advance/${id}`, updatedFormData);
            setSalaries(prevSalaries =>
                prevSalaries.map(salary =>
                    salary._id === id ? { ...salary, status: status } : salary
                )
            );
        } catch (error) {
            console.log("Can't be updated");
        }
    };

    /**
     * Gets all salaries and filter only employee salaries where advance status is Requested
     * @param {*} salaries 
     * @returns Array of Requested salary advances.
     */
    const requestedSalaries = (salaries) => {
        if(salaries)
            return salaries.filter(salary => salary.status === "Requested")
    };

    return(
        <>
            <section className="flex flex-col">
                {/* Heading Section */}
                <div className="flex flex-col border-gray-10 pr-5 pl-5 pt-5 pb-1">
                    <h1 className="flex flex-row justify-center bg-gray-800 text-green-600 border-b-2 border-green-600 p-3 font-serif font-bold text-2xl">
                        ADVANCE REQUESTS
                    </h1>
                    <div className="flex flex-row justify-between border-b-2 border-green-600 p-2">
                        <h1>Total Employees: {salaries.length}</h1>
                        <h1>Total Amount: {salaries.reduce((total, salary) => total + salary.salary_advance, 0.00)}</h1>
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
                    <div className="flex flex-wrap justify-start items-start">
                        {
                            salaries.map(salary => 
                                <div
                                    key={salary._id}
                                    className="flex flex-col w-60 m-1 border border-green-800 rounded-sm p-2">
                                    <div
                                        className="flex flex-row border-b border-green-800 rounded-r-sm font-semibold justify-center"
                                    >
                                        {salary.full_name}
                                    </div>
                                    <div
                                        className="flex flex-row justify-center border-b border-b-green-800 rounded-r-sm"
                                    >
                                        <span
                                            className="font-semibold"
                                        >Amount Requested: </span>
                                        <span
                                            className="text-green-800">
                                            {salary.salary_advance}
                                        </span>                                        
                                    </div>
                                    <div className="flex flex-row m-1">
                                        <button
                                            onClick={() => updateAdvance(salary._id, "Rejected")}
                                            className="flex justify-center bg-green-800 p-1 text-white rounded-md w-auto ml-1">
                                                Rejected
                                        </button>
                                        <button
                                            onClick={() => updateAdvance(salary._id, "Approved")}
                                            className="flex justify-center bg-green-800 p-1 text-white rounded-md w-auto ml-1">
                                                Approve
                                        </button>
                                        <button
                                            onClick={() => updateAdvance(salary._id, "Disbursed")}
                                            className="flex justify-center bg-green-800 p-1 text-white rounded-md w-auto ml-1">
                                                Disbursed
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    </div>                  
                </div>
            </section>
        </>
    );
};
export default ApproveSalaryAdvance;
