import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../http-common";
import Dialog from "../components/Dialog";

const Account = () => {
    const navigate = useNavigate();
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    const [formData, setFormData] = useState({
        first_name: "", last_name: "", email: "", phone: "", password: "", confirm_password: ""
    });

    const handleFormChange = (event) => {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    const handleConfirm = () => {
        setDialogOpen(false);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setDialogOpen(true)
        try {            
            await http.post('/user/register', formData);
            setIsSuccess(true);
            if(!isDialogOpen) {
                navigate('/login');
            }            
        } catch (error) {            
            setIsSuccess(false);
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

                    <input className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700" type="password" placeholder="Confirm Password" name='confirm_password' onChange={handleFormChange}/>

                    <button
                        className="bg-green-700 hover:bg-green-600 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline w-4/5 mb-4"
                        type="button"
                        onClick={handleSubmit}>
                            Register
                    </button>
                    <span>Already have an account? <Link to='/login'>Login</Link></span>
                </form>
            </div>
            {/* Dialog component */}
            {
                <Dialog 
                    isOpen={isDialogOpen}
                    title={isSuccess ? "Success" : "Error"}
                    message={isSuccess ? "Account Created Successfully" : "There was an Error"}
                    imageSrc={isSuccess ? "/media/gif/success.gif" : "/media/gif/fail.gif"}
                    onConfirm={handleConfirm}
                />
            }
            
        </div>
    )
}

export default Account;
