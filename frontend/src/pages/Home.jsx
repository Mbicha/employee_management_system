import React, { useState } from "react";
import {Link} from "react-router-dom";

const Home = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    return (
        <main>
            <section className="sm:flex-row flex flex-col justify-center p-5">
                <article className="flex flex-col justify-center items-center">
                    Welcome to Smart Employee Management System. Login to enjoy our services
                </article>
                <div className="flex flex-col justify-center border border-spacing-1 m-4 items-center">
                    <form className="flex flex-col items-center rounded-lg shadow-md p-2 w-full sm:w-2/3 md:w-full lg:w-full">
                        <h1 className="text-center text-green-700 text-2xl mb-4">Login</h1>
                        <input className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700" type="email" placeholder="Email" name='email'/>

                        <input className="border-b-2 border-gray-400 w-4/5 p-2 mb-4 focus:outline-none focus:border-green-700" type="password" placeholder="Password" name='password'/>

                        <button className="bg-green-700 hover:bg-green-600 text-white font-bold p-2 rounded focus:outline-none focus:shadow-outline w-4/5 mb-4" type="button">Login</button>
                        <span>Don't have an account? <Link to='/account'>Register</Link></span>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default Home;
