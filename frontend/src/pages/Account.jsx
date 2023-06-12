import React, { useState } from "react";
import { Link } from "react-router-dom";
import http from "../http-common";

const Account = () => {
    const [formData, setFormData] = useState({
        first_name: "", last_name: "", email: "", phone: "", password: ""
    });

    const handleFormChange = (event) => {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            await http.post('/user', formData, options);
            console.log("Saved");
            event.target.reset();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <form className="flex flex-col items-center rounded-lg shadow-md p-2 w-full sm:w-2/3 md:w-1/3 lg:w-1/3">
                    <h1 className="text-center text-green-700 text-2xl mb-4">Account</h1>

                    <input className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700" type="text" placeholder="First Name" name='first_name' onChange={handleFormChange}/>

                    <input className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700" type="text" placeholder="Last Name" name='last_name' onChange={handleFormChange}/>

                    <input className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700" type="email" placeholder="Email" name='email' onChange={handleFormChange}/>

                    <input className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700" type="text" placeholder="Phone" name='phone' onChange={handleFormChange}/>

                    <input className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700" type="password" placeholder="Password" name='password' onChange={handleFormChange}/>

                    <button className="bg-green-700 hover:bg-green-600 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline w-4/5 mb-4" type="button" onClick={handleSubmit}>Register</button>
                    <span>Already have an account? <Link to='/'>Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Account;
