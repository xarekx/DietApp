import React, { useState } from "react";
import { useNavigate } from "react-router-dom";




export function UserRegister({getCookie}) {

    const [ email, setEmail ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ repeatPassword, setRepeatPassword ] = useState('');
    const navigate = useNavigate();

    const submitRegister = (e) => {
        e.preventDefault();
        const csrftoken = getCookie('csrftoken');
        if(password === repeatPassword) {
            fetch("http://127.0.0.1:8000/api/user/register", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                    'X-CSRFToken': csrftoken
                },
                credentials: "include",
                body: JSON.stringify({
                    email:email,
                    username:username,
                    password:password
                })
            }).then((response)=> {
                if (response.ok) {
                    console.log("user registered")
                    navigate('/login');
                } else {
                  console.log(response);
                }
                }).catch((err) => console.error("There was a problem with post request", err))
        } else {
            console.error("Password is not the same");
        }
    }

    return (
    <div className="flex justify-center ms-auto me-auto">
        <div className="py-6 px-8 h-100 mt-20 bg-white rounded shadow-xl w-96">
        <form onSubmit={(e) => submitRegister(e)}>
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
                <input type="password" name="repeat-password" id="repeat-password" placeholder="repeat-password" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600" onChange={e => setRepeatPassword(e.target.value)}/>
            </div>
            <button className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded" type="submit">Sign Up</button>
        </form>
        </div>
    </div>)
}