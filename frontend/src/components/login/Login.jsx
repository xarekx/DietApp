import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Box, InputAdornment, TextField } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';


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
    <div className="flex h-[70vh] justify-center items-center me-auto ms-auto">
    <div className="py-6 px-4 h-80 bg-white rounded shadow-xl w-[85vw] sm:w-[65vw] md:w-[45vw] lg:w-[30vw] 2xl:w-[20vw]">
      <span className="flex justify-center mb-4 text-base">
        <b>Login to your Account</b>
      </span>
      <form onSubmit={(e) => handleLogin(e)}>
        <Box
          sx={{
            maxWidth: '100%',
          }}
        >
        <TextField fullWidth margin="normal" label="Email" id="email" variant="outlined" size="small" 
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LoginOutlinedIcon/>
            </InputAdornment>
          ),
        }} onChange={e => setEmail(e.target.value)}/>
        <TextField fullWidth margin="normal" id="Password" label="Password" variant="outlined" type="password" size="small" onChange={e => setPassword(e.target.value)} 
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockOutlinedIcon/>
            </InputAdornment>
          )
        }}/>
        </Box>
        <button className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold text-center rounded w-full hover:bg-indigo-700" type="submit">Login</button>
      </form>
      <a href="#" className="text-sm font-thin text-gray-800 hover:underline mt-4 inline-block hover:text-indigo-600 float-right">Forget Password</a>
    </div>
  </div>
    );
}