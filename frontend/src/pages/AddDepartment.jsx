import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../http-common";
import Login from "./Login";

const AddDepartment = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "", head_of_department: ""
    });
    const [fullNames, setFullNames] = useState([]);
    const [filteredNames, setFilteredNames] = useState([]);

    const handleFormChange = (event) => {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    const handleNameFilter = (event) => {
        const input = event.target.value.toLowerCase();
        const filtered = fullNames.filter(name =>
            name.full_name.toLowerCase().includes(input)
        );
        setFilteredNames(filtered);
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {            
            await http.post('/departments', formData);
            console.log("Saved");
            navigate('/departments');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const getUserFullNames = async () => {
            try {
                const response = await http.get('/users/data/users/full-name');
                setFullNames(response.data.users)
            } catch (error) {
                console.log(error);
            }
        }

        getUserFullNames()
    }, []);

    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <form className="flex flex-col items-center rounded-lg shadow-md p-2 w-full sm:w-2/3 md:w-1/3 lg:w-1/3">
                    <h1 className="text-center text-green-700 text-2xl mb-4">Account</h1>

                    <input className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700" type="text" placeholder="Department Name" name='name' onChange={handleFormChange}/>

                    <label for="head_of_department">Choose Head of Department:</label>

                    <select 
                        name="head_of_department" 
                        id="head_of_department" 
                        className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700"
                        onChange={handleFormChange}
                    >
                        {fullNames.map((name, index) => (
                            <option key={index} value={name.full_name}>{name.full_name}</option>
                        ))}
                    </select>
                    
                    <button className="bg-green-700 hover:bg-green-600 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline w-4/5 mb-4" type="button" onClick={handleSubmit}>Add Employee</button>
                    <span><Link to='/departments'>Go Back</Link></span>
                </form>
            </div>
        </div>
    )
}

export default AddDepartment;
