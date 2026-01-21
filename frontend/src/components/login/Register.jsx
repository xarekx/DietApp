import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    <div class="w-full flex min-h-screen items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md p-8">
        <p className="flex justify-center mb-2 font-bold text-green-600 text-4xl">DietApp</p>
        <p className="flex justify-center text-sm mb-4 text-gray-600">Utwórz nowe konto</p>
        <form onSubmit={(e) => handleRegister(e)}>
            <Box
            sx={{
                maxWidth: '100%',
              }}>
                <TextField fullWidth margin="normal" label="Email" id="email" variant="outlined" size="small" color="success" onChange={(e)=> setEmail(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment>
                            <LoginOutlinedIcon/>
                        </InputAdornment>
                    )
                }}/>
                <TextField fullWidth margin="normal" label="Imię i nazwisko" id="username" variant="outlined" size="small" color="success" onChange={(e)=> setUsername(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment>
                            <PersonOutlineOutlinedIcon/>
                        </InputAdornment>
                    )
                }}/>
                <TextField fullWidth margin="normal" label="Hasło" id="Password" variant="outlined" size="small" color="success" type="password" onChange={(e)=> setPassword(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment>
                            <LockOutlinedIcon/>
                        </InputAdornment>
                    )
                }}/>
                <TextField fullWidth margin="normal" label="Potwierdź hasło" id="repeat-password" variant="outlined" size="small" color="success" type="password" onChange={(e)=> setRepeatPassword(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment>
                            <LockOutlinedIcon/>
                        </InputAdornment>
                    )
                }}/>
            </Box>
            <button className="cursor-pointer py-2 px-4 block mt-6 bg-green-600 hover:bg-green-700 text-white font-bold w-full text-center rounded" type="submit">Zarejestruj się</button>
        </form>
        <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">Masz już konto? <Link to={'/login'} className="text-green-600 hover:text-green-700 font-medium">Zaloguj się</Link></p>
        </div>
        </div>
    </div>)
}