import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import http from "../http-common";

const AddLocation = () => {
    const {id} = useParams();
    const loc_id = localStorage.getItem("token");
    const navigate = useNavigate();
    const [location, setLocation] = useState({});
    const [formData, setFormData] = useState({
        user_id: loc_id, country: "", address: ""
    })

    const handleFormChange = (event) => {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    useEffect(() =>{
        const getLocation = async () => {
            try {
                if (id) {
                    const response = await http.get(`/locations/${id}`)
                    setFormData((prev) => ({
                        ...prev,
                        user_id: loc_id,
                        country: response.data.location.country,
                        address: response.data.location.address
                    }))
                }                
            } catch (error) {
                console.log(error);
            }
        }
        getLocation()
    },[id, loc_id])
    console.log(location);

    const handleSubmit = async (event) =>{
        try {
            if(id){
                await http.patch(`/locations/${id}`, formData)
            } else {
                await http.post("/locations", formData);                
            }
            navigate(`/profile/${loc_id}`);
        } catch (error) {
            console.log(error);
        }
    }

    const updateButtonText = id ? "Update Location" : "Save Location";
    const updateHeadText = id ? "Edit Location" : "Add Location"

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <form className="flex flex-col items-center rounded-lg shadow-md p-2 w-full sm:w-2/3 md:w-1/3 lg:w-1/3">
                    <h1 className="text-center text-green-700 text-2xl mb-4">{updateHeadText}</h1>

                    <input
                        className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700"
                        type="text"
                        placeholder="Enter Country"
                        name='country'
                        value={formData.country}
                        onChange={handleFormChange}/>
                    
                    <input
                        className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700"
                        type="text"
                        placeholder="Enter Address"
                        name='address'
                        value={formData.address}
                        onChange={handleFormChange}/>
                    
                    <button
                        className="bg-green-700 hover:bg-green-600 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline w-4/5 mb-4"
                        type="button"
                        onClick={handleSubmit}>
                            {updateButtonText}
                    </button>
                    <span><Link to={`/profile/${loc_id}`}>Go Back</Link></span>
                </form>
            </div>
        </>
    )
}

export default AddLocation
