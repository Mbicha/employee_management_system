import React, { useState } from "react";
import {Link} from "react-router-dom";

const Home = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    return (
        <main>
            <section className="flex-col flex h-screen justify-center items-center p-5">
                <article className="text-2xl">
                    Welcome to Smart Employee Management System. Login to enjoy our services
                </article>
                <div className="mt-2">
                    <button type="button" className="p-2 w-20 bg-green-800 rounded-lg m-1 text-white"><Link to='/account'>Register</Link></button>
                    <button type="button" className="p-2 w-20 bg-green-800 rounded-lg m-1 text-white"><Link to='/login'>Login</Link></button>
                </div>
            </section>
        </main>
    )
}

export default Home;
