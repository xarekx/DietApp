import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

export function UserLogin({userStatus}) {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const navigate = useNavigate();

  const submitLogin = useFetch("http://127.0.0.1:8000/api/user/login",'POST', {email: email, password: password})

  const handleLogin = (e) => {
    e.preventDefault();
    submitLogin()
    .then((res) => {
      if (res.ok) {
          return res.json();
      } else {
          console.log('Incorrect email or password.');
          throw new Error('Incorrect email or password.');
      }
    })
    .then((data) => {
      const username = data.user.username;
      localStorage.setItem('username', username);

      userStatus(true);
      navigate('/');
    })
    .catch((err) => console.error("There was a problem with post request", err));
  }
  
return (
    <div className="flex h-[70vh] justify-center items-center  me-auto ms-auto">
    <div className="py-6 px-8 h-80 bg-white rounded shadow-xl w-[85vw] sm:w-[65vw] md:w-[45vw] lg:w-[30vw] 2xl:w-[20vw]">
      <form onSubmit={(e) => handleLogin(e)}>
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