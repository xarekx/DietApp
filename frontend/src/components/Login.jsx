import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



export function UserLogin({getCookie, userStatus}) {

  const [ email, setEmail ] = useState('');
  // const [ userStatus, setUserStatus ] = useState(false);
  const [ password, setPassword ] = useState('');
  const navigate = useNavigate();

  const submitLogin = (e) => {
    e.preventDefault();
    const csrftoken = getCookie('csrftoken');
    fetch("http://127.0.0.1:8000/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': csrftoken
            },
            credentials: 'include',
            body: JSON.stringify({
              email: email,
              password: password
            })
        }
      ).then((response) => {
        if (response.ok) {
          userStatus(true);
          navigate('/');
        } else {
          console.log('Incorrect email or password.');
        }
        }
      ).catch((err) => console.error("There was a problem with post request", err))
  }
   
  return (
      <div className="flex justify-center ms-auto me-auto">
        <div className="py-6 px-8 h-80 mt-20 bg-white rounded shadow-xl">
          <form onSubmit={(e) => submitLogin(e)}>
            <div>
              <label htmlFor="email" className="block text-gray-800 font-bold">Email:</label>
              <input type="text" name="email" id="email" placeholder="@email" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600" onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-800 font-bold">Password</label>
              <input type="password" name="password" id="password" placeholder="Password" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600" onChange={e => setPassword(e.target.value)} />
              <a href="#" className="text-sm font-thin text-gray-800 hover:underline mt-2 inline-block hover:text-indigo-600">Forget Password</a>
            </div>
            <button className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded" type="submit">Login</button>
          </form>
        </div>
      </div>
    );
}