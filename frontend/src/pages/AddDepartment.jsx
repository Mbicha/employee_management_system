import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import http from "../http-common";

const AddDepartment = () => {
    const {id} = useParams()
    const navigate = useNavigate();    
    const [fullNames, setFullNames] = useState([]);
    const [filteredNames, setFilteredNames] = useState([]);
    
    const [formData, setFormData] = useState({
        name: "", head_of_department: ""
    });

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
            if (id) {
                await http.patch(`/departments/${id}`, formData)
            } else {
                await http.post('/departments', formData);
            }            
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

    useEffect(() => {
        const getDepartment = async () => {
            try {
                const response = await http.get(`/departments/${id}`)
                const department = response.data.departments;
                setFormData((prev) => ({
                    ...prev,
                    name: department[0].name,
                    head_of_department: department[0].head_of_department
                }))
            } catch (error) {
                console.log(error);
            }
        }
        getDepartment()
    },[id])

    const handleHeadText = id ? "Edit Department" : "Add Department";
    const handleButtonText = id ? "Update" : "Save";

    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <form className="flex flex-col items-center rounded-lg shadow-md p-2 w-full sm:w-2/3 md:w-1/3 lg:w-1/3">
                    <h1 className="text-center text-green-700 text-2xl mb-4">{ handleHeadText }</h1>

                    <input
                        className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700"
                        type="text"
                        placeholder="Department Name"
                        name='name'
                        value={formData.name}
                        onChange={handleFormChange}/>

                    <label for="head_of_department">Choose Head of Department:</label>

                    <select 
                        name="head_of_department" 
                        id="head_of_department" 
                        className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700"
                        value={formData.head_of_department}
                        onChange={handleFormChange}
                    >
                        {fullNames.map((name, index) => (
                            <option key={index} value={name.full_name}>{name.full_name}</option>
                        ))}
                    </select>
                    
                    <button
                        className="bg-green-700 hover:bg-green-600 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline w-4/5 mb-4"
                        type="button"
                        onClick={handleSubmit}>
                            {handleButtonText}
                    </button>
                    <span><Link to='/departments'>Go Back</Link></span>
                </form>
            </div>
        </div>
    )
}

export default AddDepartment;
