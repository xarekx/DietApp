import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Box, InputAdornment, TextField } from "@mui/material";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

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
            .then((res)=> {
                if (res.ok) {
                    console.log("user registered")
                    navigate('/login');
                } else {
                    console.log(res);
                }
            })
            .catch((err) => console.error("There was a problem with post request", err))
        } else {
            console.error("Password is not the same");
        }
    }

    return (
    <div className="flex h-[70vh] justify-center items-center login-center">
        <div className="py-6 px-4 h-100 mt-20 bg-white rounded shadow-xl w-[85vw] sm:w-[65vw] md:w-[45vw] lg:w-[30vw] 2xl:w-[20vw]">
        <span className="flex justify-center text-base mb-4"><b>Create your Account</b></span>
        <form onSubmit={(e) => handleRegister(e)}>
            <Box
            sx={{
                maxWidth: '100%',
              }}>
                <TextField fullWidth margin="normal" label="Email" id="email" variant="outlined" size="small" onChange={(e)=> setEmail(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment>
                            <LoginOutlinedIcon/>
                        </InputAdornment>
                    )
                }}/>
                <TextField fullWidth margin="normal" label="Username" id="username" variant="outlined" size="small" onChange={(e)=> setUsername(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment>
                            <PersonOutlineOutlinedIcon/>
                        </InputAdornment>
                    )
                }}/>
                <TextField fullWidth margin="normal" label="Password" id="Password" variant="outlined" size="small" type="password" onChange={(e)=> setPassword(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment>
                            <LockOutlinedIcon/>
                        </InputAdornment>
                    )
                }}/>
                <TextField fullWidth margin="normal" label="Repeat Password" id="repeat-password" variant="outlined" size="small" type="password" onChange={(e)=> setRepeatPassword(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment>
                            <LockOutlinedIcon/>
                        </InputAdornment>
                    )
                }}/>
            </Box>
            <button className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 hover:bg-indigo-600 text-white font-bold w-full text-center rounded" type="submit">Sign Up</button>
        </form>
        </div>
    </div>)
}