import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import http from "../http-common";
import Dialog from "../components/Dialog";

const RequestSalaryAdvance = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const user_id = localStorage.getItem("token");
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isSuccess, setSuccess] = useState(false)
    const [salary, setSalary] = useState([]);
    const [formData, setFormData] = useState({
        salary_advance: 0.0, advance_status: "Requested"
    })

    const handleFormChange = (event) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    useEffect(() => {
        const getSalaryById = async () => {
            try {
                const response = await http.get(`/salaries/${id}`)
                setSalary(response.data.salary)
            } catch (error) {
                console.log(error);
            }
        }
        getSalaryById()
    },[id])

    const handleCloseDialog = () => {
        return setDialogOpen(false);
    }

    const checkAdvanceLimit = () => {
        return formData.salary_advance <= salary.salary/2
    }

    const handleSubmit = async (event) =>{
        try {
            if(id && checkAdvanceLimit()) {
                await http.patch(`/salaries/${id}`, formData)
                navigate(`/profile/${user_id}`)
                setSuccess(true)
                setDialogOpen(true)
            }
        } catch (error) {
            setSuccess(false)
            setDialogOpen(true)
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <form className="flex flex-col items-center rounded-lg shadow-md p-2 w-full sm:w-2/3 md:w-1/3 lg:w-1/3">
                    <h1 className="text-center text-green-700 text-2xl mb-4">Apply Salary Advance</h1>

                    <label htmlFor="attention" className="flex justify-center border-b-2 bg-red-500 text-white border-gray-400 w-4/5 p-2 mb-4">
                        You can only request upto half of your salary
                    </label>
                    <input
                        className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700"
                        type="text"
                        placeholder="Amount"
                        name='salary_advance'
                        onChange={handleFormChange}/>

                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="advance_status">Status:</label>
                        <select 
                            name="advance_status"
                            id="advance_status" 
                            className="w-1/2"
                            onChange={handleFormChange}
                        >
                            <option value="Requested">Requested</option>
                            <option value="Approved">Approved</option>
                            <option value="Disbursed">Disbursed</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div> 
                    
                    <button 
                        className="bg-green-700 hover:bg-green-600 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline w-4/5 mb-4"
                        type="button"
                        onClick={handleSubmit}>
                        Save
                    </button>
                    
                    <span><Link to='/employees'>Go Back</Link></span>
                </form>
            </div>
            {
                <Dialog 
                    isOpen={isDialogOpen}
                    title={isSuccess ? "Success" : "Error"}
                    message={isSuccess ? "Account Created Successfully" : "There was an Error"}
                    imageSrc={isSuccess ? "/media/gif/success.gif" : "/media/gif/fail.gif"}
                    onConfirm={handleCloseDialog}
                />
            }
        </>
    )
}

export default RequestSalaryAdvance
