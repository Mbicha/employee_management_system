import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import http from "../http-common";

import NoticeBoard from "../components/NoticeBoard";

const Profile = () => {
    const id = localStorage.getItem("token");
    const [hours, setHours] = useState([]);
    const [profile, setProfile] = useState([]);
    const [location, setLocation] = useState([]);
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        const getHour = () => {
            try {
                let date = new Date();
                setHours(date.getHours())
            } catch (error) {
                console.log(error);
            }
        }
        getHour();
        // Set up interval to update time every second (1000 milliseconds)
        const intervalId = setInterval(getHour, 1000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    },[])

    useEffect(() =>{
        const getEmployee = async () => {
            try {
                const response = await http.get(`/employees/data/employee/${id}`);
                if((response.data.status === "fail") || (employee.length <= 0)){
                    console.log("No data");
                }
                // console.log(response.data.employee[0]);
                setEmployee(response.data.employee[0])
            } catch (error) {
                console.log(error);
            }
        }
        getEmployee()
    },[])

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

    useEffect(() => {
        const getLocation = async () => {
           try {
            const response = await http.get(`/locations/employee/${id}`);
            if(response.data.status === 'fail') {
                console.log("There is No data");
            }
            setLocation(response.data.location)
           } catch (error) {
            console.log(error);
           }
        }
        getLocation()
    },[])

    const checkTime = () =>{
        if(hours > 0 && hours < 12) {
            return "Good Morning"
        } else if (hours >= 12 && hours < 17) {
            return "Good Afternoon"
        } else if (hours >= 17 && hours < 21) {
            return "Good Evening"
        } else {
            return "Good Night"
        }
    }

    const isAdminDirectorHeadOfDepartment = (employee) => {
        if(employee.role === "Admin" || employee.role === "Director" || employee.head_of_department === employee.full_name) {
            return true
        }
    }

    const isAdminDirectorHr = (employee) => {
        if(employee.role === "Admin" || employee.role === "Director" || employee.job_title === "Human Resource") {
            return true
        }
    }

    return(
        <>
            {<section className="flex flex-col w-full md:flex-row lg:flex-row">
                        <div className="flex flex-col w-full border-r-2 border-green-600 p-2 md:w-1/4 lg:1/4 md:h-screen lg:h-screen">
                            <div className="flex flex-col w-full h-3/4 shadow-md">
                                <div className="flex flex-col items-center pb-2 pt-4">
                                    <img 
                                        src="/media/images/profile.png"
                                        className="border rounded-full h-28"                                        
                                        alt="Profile Picture"/>                                              
                                </div>
                                <div className="flex flex-col border-t-2 border-green-800 rounded-md p-2 mt-4">
                                    <span className="font-thin">{ employee.full_name }</span>
                                </div>   

                                {/* Admin, Director, Head of Department */}
                                <div className="flex flex-col border-t-2 border-green-800 rounded-md p-2">
                                    {
                                        isAdminDirectorHeadOfDepartment(employee) ?
                                        (
                                            <>
                                                <Link to={`/add-project`} className="underline">
                                                    Create Project
                                                </Link>
                                                <Link to={`/add-task`} className="underline">
                                                    Create Task
                                                </Link>
                                            </>                            
                                        )
                                        : isAdminDirectorHr(employee) ?
                                        (
                                            <>
                                                <Link to={`/add-employee`} className="underline">
                                                    Add Employee
                                                </Link>
                                                <Link to={`/add-salary`} className="underline">
                                                    Add Salary
                                                </Link>
                                                <Link className="underline">
                                                    Requested Salary Advance
                                                </Link>
                                            </>
                                        ): (
                                            <></>
                                        )
                                    }
                                </div>
                                
                                <div className="flex flex-col border-t-2 border-green-800 rounded-md p-2">
                                    <Link className="underline">Apply Salary Advance</Link>
                                    <Link className="underline">Logout</Link> 
                                </div>                                       
                            </div>                            
                        </div>
                        <div className="flex flex-col w-full md:w-1/2 lg:1/2 md:h-screen lg:h-screen m-1">
                            <div className="flex flex-row justify-between border-b-2 border-green-800 shadow-md p-1 mb-2">
                                <div>
                                    {checkTime()}! {employee.full_name}
                                </div>
                                <Link to={`/edit-personal-data/${id}`} className="flex bg-green-800 mr-2 rounded-md text-white font-serif p-1">
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
                                        {employee.gender}
                                    </li>
                                    <li>
                                        <span className="font-semibold text-green-800">
                                            DOB:  
                                        </span>
                                        {employee.dob}
                                    </li>
                                    <li>
                                        <span className="font-semibold text-green-800">
                                            Marital Status:
                                        </span>
                                        {employee.marital_status}
                                    </li>
                                    <li>
                                        <span className="font-semibold text-green-800">
                                            Health Condition:
                                        </span>
                                        {employee.health_condition}
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
                                        {employee.next_of_kin}
                                    </li>
                                    <li>
                                        <span className="font-semibold text-green-800">
                                            Relationship:  
                                        </span>
                                        {employee.next_of_kin_relationship}
                                    </li>
                                    <li>
                                        <span className="font-semibold text-green-800">
                                            Phone:
                                        </span>
                                        {employee.next_of_kin_contact}
                                    </li>
                                    
                                </ul>
                            </div>

                            <div className="shadow-md rounded-md p-2">
                                <h1 className="sub-header">Employment Details</h1>
                                <hr />
                                <ul key={employee._id} className="flex flex-col max-h-28 overflow-y-auto">
                                        <li>
                                            <span className="font-semibold text-green-800">
                                                Employment Type:  
                                            </span>
                                            {employee.employment_type}
                                        </li>
                                        <li>
                                            <span className="font-semibold text-green-800">
                                                Contract Length:  
                                            </span>
                                            {employee.contract_length} Years
                                        </li>
                                    </ul>
                            </div>
                            {location.map(loc =>(
                                <div className="shadow-md rounded-md p-2">                                
                                    <div className="flex flex-row justify-between">
                                        <h1 className="sub-header">Location</h1>
                                        <hr />
                                        <div className="flex flex-row ml-2">
                                            <Link to={`/add-location`} className="flex bg-green-800 mr-2 rounded-md text-white font-serif p-1">
                                                Add
                                            </Link>               
                                            <Link to={`/add-location/${loc._id}`} className="flex bg-green-800 mr-2 rounded-md text-white font-serif p-1">
                                                Update
                                            </Link>
                                        </div>                     
                                    </div>                                
                                        <ul key={loc._id} className="flex flex-col max-h-28 overflow-y-auto">
                                            <li>
                                                <span className="font-semibold text-green-800">
                                                    Country:  
                                                </span>
                                                {loc.country}
                                            </li>
                                            <li>
                                                <span className="font-semibold text-green-800">
                                                    Address:  
                                                </span>
                                                {loc.address}
                                            </li>
                                        </ul>
                                    
                                </div>
                            ))}  
                            
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
