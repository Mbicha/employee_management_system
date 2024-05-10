import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import http from "../http-common";

const EditPersonalData = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        gender: "",
        marital_status: "",
        date_of_birth: "",
        next_of_kin: "",
        next_of_kin_contact: "",
        next_of_kin_relationship: "",
        health_condition: "",
        what_condition: ""
    })

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const getPersonalDetails = async () => {
            try {
                if(id) {
                    const response = await http.get(`/users/data/${id}`)
                    const user = response.data.personalDetails;
                    setFormData((prev) => ({
                        ...prev,
                        gender: user.gender,
                        marital_status: user.marital_status,
                        date_of_birth: formatDate(user.date_of_birth),
                        next_of_kin: user.next_of_kin,
                        next_of_kin_contact: user.next_of_kin_contact,
                        next_of_kin_relationship: user.next_of_kin_relationship,
                        health_condition: user.health_condition,
                        what_condition: user.what_condition
                    }))                                    
                }                
            } catch (error) {
                console.log(error);
            }
        }
        getPersonalDetails()
    },[])   

    // const handleButtonText = id ? "Update" : "Save";
    const handleFormChange = (event) => {
        setFormData((prev) => (
            {
                ...prev,
                [event.target.name]: event.target.value
            }
        ))
    }

    const handleSubmit = async (event) => {
        try {
            if(id){
                await http.patch(`/users/data/${id}`, formData);
                navigate(`/profile/${id}`)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <form className="flex flex-col items-center rounded-lg shadow-md p-2 w-full sm:w-2/3 md:w-1/3 lg:w-1/3">
                    <h1 className="text-center text-green-700 text-2xl mb-4">
                        Edit Personal Details
                    </h1>
                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="gender">Gender:</label>
                        <select 
                            name="gender" 
                            id="gender" 
                            className="w-1/2"
                            value={formData.gender}
                            onChange={handleFormChange}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>                        
                    </div>

                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="marital_status">Marital Status:</label>
                        <select 
                            name="marital_status" 
                            id="marital_status" 
                            className="w-1/2"
                            value={formData.marital_status}
                            onChange={handleFormChange}
                        >
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>                            
                            <option value="Separated">Separated</option>
                            <option value="Divorced">Divorced</option>
                            <option value="Come we stay">Come we stay</option>
                        </select>                        
                    </div>              
                    
                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="start_date">D.O.B:</label>
                        <input className="w-1/2"
                        type="date"
                        name='date_of_birth'
                        value={formData.date_of_birth}
                        onChange={handleFormChange}/>
                    </div>

                    <input
                        className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700"
                        type="text"
                        placeholder="Next of Kin"
                        name='next_of_kin'
                        value={formData.next_of_kin}
                        onChange={handleFormChange}/>
                    
                    <input
                        className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700"
                        type="text"
                        placeholder="Next of Kin Contact"
                        name='next_of_kin_contact'
                        value={formData.next_of_kin_contact}
                        onChange={handleFormChange}/>

                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="next_of_kin_relationship">
                            Next of Kin Relationship:
                        </label>
                        <select 
                            name="next_of_kin_relationship" 
                            id="next_of_kin_relationship" 
                            className="w-1/2"
                            value={formData.next_of_kin_relationship}
                            onChange={handleFormChange}
                        >
                            <option value="Spouse">Spouse</option>
                            <option value="Father">Father</option>
                            <option value="Mother">Mother</option>
                            <option value="Son">Son</option>
                            <option value="Doughter">Doughter</option>
                            <option value="Relative">Relative</option>
                            <option value="Dating">Dating</option>
                            <option value="Prefer not say">Prefer not say</option>
                        </select>                        
                    </div>

                    <div className="flex flex-row justify-between border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700">
                        <label for="health_condition">Health Condition:</label>
                        <select 
                            name="health_condition" 
                            id="health_condition" 
                            className="w-1/2"
                            value={formData.health_condition}
                            onChange={handleFormChange}
                        >
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>                        
                    </div>
                    <input
                        className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700"
                        type="text"
                        placeholder="What Condition?"
                        name='what_condition'
                        value={formData.what_condition}
                        onChange={handleFormChange}/>
                    <button
                        className="bg-green-700 hover:bg-green-600 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline w-4/5 mb-4"
                        type="button"
                        onClick={handleSubmit}>
                            Update
                    </button>
                    <span><Link to={`/profile/${id}`}>Go Back</Link></span>
                </form>
            </div>
        </div>
    )
}

export default EditPersonalData;
