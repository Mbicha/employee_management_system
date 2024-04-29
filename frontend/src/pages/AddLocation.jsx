import React, { useState, useEffect } from "react";
import { Link, json, useNavigate } from "react-router-dom";
import http from "../http-common";

const AddLocation = () => {
    const id = localStorage.getItem("token");
    const navigate = useNavigate();
    // const [countries, setCountries] = useState([]);
    const [formData, setFormData] = useState({
        user_id: id, country: "", address: ""
    })

    // const getCountries = async () => {
    //     try {
    //         const response = await fetch("../../data/country.json");
    //         const data = await response.json();
    //         console.log(data);
    //         setCountries(data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const handleFormChange = (event) => {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = async (event) =>{
        try {
            await http.post("/locations", formData);
            navigate(`/profile/${id}`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <form className="flex flex-col items-center rounded-lg shadow-md p-2 w-full sm:w-2/3 md:w-1/3 lg:w-1/3">
                    <h1 className="text-center text-green-700 text-2xl mb-4">Edit Location</h1>

                    <input className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700" type="text" placeholder="Enter Country" name='country' onChange={handleFormChange}/>
                    
                    <input className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700" type="text" placeholder="Enter Address" name='address' onChange={handleFormChange}/>
                    
                    <button className="bg-green-700 hover:bg-green-600 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline w-4/5 mb-4" type="button" onClick={handleSubmit}>Add/Update Location</button>
                    <span><Link to={`/profile/${id}`}>Go Back</Link></span>
                </form>
            </div>
        </>
    )
}

export default AddLocation
