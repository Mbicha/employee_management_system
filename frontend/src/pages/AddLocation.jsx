import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../http-common";

const AddLocation = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        
    })

    const handleFormChange = (event) => {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = async (event) =>{
        
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <form className="flex flex-col items-center rounded-lg shadow-md p-2 w-full sm:w-2/3 md:w-1/3 lg:w-1/3">
                    <h1 className="text-center text-green-700 text-2xl mb-4">Edit Locations</h1>

                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="country">Country:</label>
                        <select 
                            name="country" 
                            id="country" 
                            className="w-1/2"
                            onChange={handleFormChange}
                        >
                            {/* {filterUsers.map((user, index) => (
                                <option key={index} value={user._id}>{user.full_name}</option>
                            ))} */}
                        </select>
                    </div>
                    <input className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700" type="text" placeholder="Enter Address" name='address' onChange={handleFormChange}/>
                    
                    <button className="bg-green-700 hover:bg-green-600 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline w-4/5 mb-4" type="button" onClick={handleSubmit}>Add/Update Location</button>
                    <span><Link to='/employees'>Go Back</Link></span>
                </form>
            </div>
        </>
    )
}

export default AddLocation
