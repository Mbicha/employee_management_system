import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import http from "../http-common";

import NoticeBoard from "../components/NoticeBoard";

const Profile = () => {
    const {id} = useParams();

    const [profile, setProfile] = useState([]);

    useEffect(() =>{
        const getProfile = async () => {
            try {
                const response = await http.get(`/users/data/${id}`)
                setProfile(response.data.personalDetails)
            } catch (error) {
                console.log(error);
            }
        }

        getProfile()
    },[])

    return(
        <>
            {<section className="flex flex-col w-full md:flex-row lg:flex-row">
                        <div className="flex flex-col w-full border-r-2 border-green-600 md:w-1/4 lg:1/4 md:h-screen lg:h-screen">
                            <div className="flex flex-col w-full h-3/4 shadow-md">
                                <div className="flex flex-col">
                                    <h2 className="h-4 m-2">
                                        <span className="font-bold">
                                            Department:
                                        </span>
                                        Info
                                    </h2>
                                    <h2 className="h-4 m-2">
                                        <span className="font-bold">
                                            Head of Department:
                                        </span>

                                        Head
                                        </h2>
                                    <h2 className="h-4 m-2">
                                        <span className="font-bold">
                                            No. of Employees:
                                        </span>
                                        8
                                    </h2>                            
                                </div>              
                            </div>
                        </div>
                        <div className="flex flex-col w-full md:w-1/2 lg:1/2 md:h-screen lg:h-screen m-1">
                            <div className="flex flex-row justify-between border-b-2 border-green-800 shadow-md p-1 mb-2">
                                <div>
                                    Greetings! {profile.first_name} {profile.last_name}
                                </div>
                                <Link className="flex bg-green-800 mr-2 rounded-md text-white font-serif p-1">
                                    Update
                                </Link>
                            </div>
                            <div className="shadow-md rounded-md p-2">
                                <h1 className="sub-header">Personal Details</h1>
                                <hr />
                                <ul className="flex flex-col max-h-28 overflow-y-auto">
                                    <li>
                                        <span className="font-semibold text-green-800">
                                            Gender:  
                                        </span>
                                        {profile.gender}
                                    </li>
                                    <li>
                                        <span className="font-semibold text-green-800">
                                            DOB:  
                                        </span>
                                        {profile.date_of_birth}
                                    </li>
                                    <li>
                                        <span className="font-semibold text-green-800">
                                            Marital Status:
                                        </span>
                                        {profile.marital_status}
                                    </li>
                                    <li>
                                        <span className="font-semibold text-green-800">
                                            Health Condition:
                                        </span>
                                        {profile.health_condition}
                                    </li>                                        
                                </ul>
                            </div>
                            <div className="shadow-md rounded-md p-2">
                                <h1 className="sub-header">Next of Kin</h1>
                                <hr />
                                <ul className="flex flex-col max-h-28 overflow-y-auto">
                                    <li>
                                        <span className="font-semibold text-green-800">
                                            Name:  
                                        </span>
                                        {profile.next_of_kin}
                                    </li>
                                    <li>
                                        <span className="font-semibold text-green-800">
                                            Relationship:  
                                        </span>
                                        {profile.next_of_kin_relationship}
                                    </li>
                                    <li>
                                        <span className="font-semibold text-green-800">
                                            Phone:
                                        </span>
                                        {profile.next_of_kin_contact}
                                    </li>
                                    
                                </ul>
                            </div>

                            <div className="shadow-md rounded-md p-2">
                                <h1 className="sub-header">Employment Details</h1>
                            </div>

                            <div className="shadow-md rounded-md p-2">
                                <div className="flex flex-row justify-between">
                                    <h1 className="sub-header">Location</h1>
                                    <Link className="flex bg-green-800 mr-2 rounded-md text-white font-serif p-1">
                                        Update Location
                                    </Link>
                                </div>
                                
                            </div>
                            
                        </div>
                        <div className="flex flex-col w-full scrollable md:w-1/4 lg:1/4 md:h-screen lg:h-screen">
                            <NoticeBoard/>
                        </div>
                    </section>
            }
        </>
    )
}

export default Profile;
