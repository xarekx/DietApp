import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    <div className="w-full flex min-h-screen items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md p-8">
        <p className="flex justify-center mb-2 font-bold text-green-600 text-4xl">DietApp</p> 
        <p className="flex justify-center text-sm mb-4 text-gray-600">Zaloguj się do swojego konta</p>
        <form onSubmit={(e) => handleLogin(e)}>
          <Box
            sx={{
              maxWidth: '100%',
            }}
          >
          <TextField fullWidth margin="normal" label="Email" id="email" variant="outlined" color="success" size="small" 
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LoginOutlinedIcon/>
              </InputAdornment>
            ),
          }} onChange={e => setEmail(e.target.value)}/>
          <TextField fullWidth margin="normal" id="Password" label="Hasło" variant="outlined" type="password" size="small" color="success" onChange={e => setPassword(e.target.value)} 
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon/>
              </InputAdornment>
            )
          }}/>
          </Box>
          <button className="cursor-pointer py-2 px-4 block mt-6 bg-green-600 text-white font-bold text-center rounded w-full hover:bg-green-700" type="submit">Zaloguj się</button>
        </form>
        {/* <a href="#" className="text-sm font-thin text-gray-800 hover:underline mt-4 inline-block hover:text-indigo-600 float-right">Forget Password</a> */}
        <div className="mt-6 text-center">
          <p>Nie masz konta? <Link to={"/register"} className="text-green-600 hover:text-green-700 font-medium">Zarejestruj się</Link></p>
        </div>
      </div>
      
  </div>
    );
}