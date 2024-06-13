import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

export function UserRegister() {

    const [ email, setEmail ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ repeatPassword, setRepeatPassword ] = useState('');
    const navigate = useNavigate();

    const submitRegister = useFetch("http://127.0.0.1:8000/api/user/register", 'POST', {email:email, username:username, password:password})

    const handleRegister = (e) => {
        e.preventDefault();
        if(password === repeatPassword) {
            submitRegister()
            .then((response)=> {
                if (response.ok) {
                    console.log("user registered")
                    navigate('/login');
                } else {
                    console.log(response);
                }
            })
            .catch((err) => console.error("There was a problem with post request", err))
        } else {
            console.error("Password is not the same");
        }
    }

    return (
    <div className="flex h-[70vh] justify-center items-center  me-auto ms-auto">
        <div className="py-6 px-8 h-100 mt-20 bg-white rounded shadow-xl w-[85vw] sm:w-[65vw] md:w-[45vw] lg:w-[30vw] 2xl:w-[20vw]">
        <form onSubmit={(e) => handleRegister(e)}>
            <div>
                <label htmlFor="email" className="block text-gray-800 font-bold">Email:</label>
                <input type="text" name="email" id="email" placeholder="@email" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600" onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="email" className="block text-gray-800 font-bold">Username:</label>
                <input type="text" name="username" id="username" placeholder="username" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600" onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password" className="block text-gray-800 font-bold">Password</label>
                <input type="password" name="password" id="password" placeholder="Password" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600" onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="mb-6">
                <label htmlFor="repeat-password" className="block text-gray-800 font-bold">Password</label>
                <input type="password" name="repeat-password" id="repeat-password" placeholder="Repeat password" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600" onChange={e => setRepeatPassword(e.target.value)}/>
            </div>
            <button className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded" type="submit">Sign Up</button>
        </form>
        </div>
    </div>)
}