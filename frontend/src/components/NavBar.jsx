import React, { useContext } from "react";
import { Link } from "react-router-dom";


const NavBar = () => {

    return (
        <div>
            <header className="bg-black text-white py-4">
                <div className="min-w-full mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <h4 className="text-3xl text-green-800">SE<span className="text-white">MS</span></h4>
                    </div>
                    <div className="hidden md:flex flex-row">
                        <div className="ml-4 py-2 px-2 rounded hover:bg-green-700"><Link to="/">Home</Link></div>
                        <div className="ml-4 py-2 px-2 rounded hover:bg-green-700"><Link to="/departments">Departments</Link></div>
                        <div className="ml-4 py-2 px-2 rounded hover:bg-green-700"><Link to="/contact-us">Contact Us</Link></div>
                        <div className="ml-4 py-2 px-2 rounded hover:bg-green-700"><Link to="/account">Account</Link></div>                        
                        <div className="ml-4 py-2 px-2 rounded hover:bg-green-700"><Link to="/deptdata">Test</Link></div>
                    </div>
                    <div className="md:hidden">
                        <button className="flex items-center px-3 py-2 border rounded text-green-700 border-gray-600 hover:text-white hover:border-white">
                            <svg className="h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                        </button>
                    </div>
                </div>
                <div className="md:hidden hidden">
                    <div className="block py-2 px-4 rounded hover:bg-green-700"><Link to="/">Home</Link></div>
                    <div className="block py-2 px-4 rounded hover:bg-green-700"><Link to="/departments">Departments</Link></div>
                    <div className="block py-2 px-4 rounded hover:bg-green-700"><Link to="/contact-us">Contact Us</Link></div>
                    <div className="ml-4 py-2 px-2 rounded hover:bg-green-700"><Link to="/account">Account</Link></div>
                </div>
            </header>
        </div>
        
    )
}

export default NavBar;
