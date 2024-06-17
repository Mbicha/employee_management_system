import React, { useState } from "react";
import {Link} from "react-router-dom";

const Home = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    return (
        <main>
            <section 
                className="flex-col flex h-screen justify-center items-center p-5"
                style={{ backgroundImage: "url('/media/banner.avif')", backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                <article className="text-2xl font-semibold">
                    Welcome to SEMS. Your Ultimate Employee Management Solution
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
