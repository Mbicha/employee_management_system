import React from "react";

import NoticeBoard from "../components/NoticeBoard";

const EmployeeData = () => {
    return (
        <>
            <section className="flex flex-col w-full md:flex-row lg:flex-row">
                <div className="flex flex-col items-center w-full h-min bg-green-800 md:w-1/3 md:h-screen lg:w-1/3 lg:h-screen p-2">
                    <img src="" alt="" srcset="" className="w-24 h-24 border rounded-full mb-2"/>
                    <div className="flex flex-col w-full h-3/4">
                        <div className="flex flex-col">
                            <h2 className="h-4 m-2"><span className="font-bold">Name:</span> Charles Mbithi</h2>
                            <h2 className="h-4 m-2"><span className="font-bold">Email:</span> charlesmbithi@gmail.com</h2>
                            <h2 className="h-4 m-2"><span className="font-bold">Phone:</span> +254 792-907-708</h2>                            
                        </div>
                        <div className="flex flex-col justify-center">
                            <button className="bg-green-400 ">
                                Logout
                            </button>
                        </div>                        
                    </div>
                </div>
                <div className="grid grid-rows-2 grid-flow-row gap-y-0.5 h-full md:w-2/3 lg:w-2/3 p-2">
                    <div className="row-span-1">
                        Greetings Charles Mbithi
                    </div>
                    <hr className="my-0"/>
                    <div className="row-span-1">
                        <div className="flex flex-col w-max-full md:flex-row lg:flex-row">
                            <div className="flex flex-col w-full md:w-2/3 lg:w-2/3 bg-red-700 p-2">

                            </div>
                            <div className="flex flex-col w-full md:w-1/3 lg:w-1/3 bg-yellow-400 p-2">
                                <h2><span className="font-bold">Department:<br></br></span>
                                    IT
                                </h2>
                                <hr/>
                                <NoticeBoard/>
                            </div>
                        </div>
                    </div>
                    <hr className="my-0"/>
                </div>
            </section>
        </>
    )
}

export default EmployeeData;
