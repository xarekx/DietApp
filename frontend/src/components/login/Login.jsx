import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLogin } from "../../api/hooks";
import { Alert, Box, InputAdornment, TextField } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { getFieldErrors, getErrorMessage } from "../../api/errors";

export function UserLogin() {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const navigate = useNavigate();
  const login = useLogin();

  const fieldErrors = getFieldErrors(login.error);
  const hasFieldErrors = Object.keys(fieldErrors).length > 0;
  const formError = hasFieldErrors ? '' : getErrorMessage(login.error);
  const credentialsError = login.error?.status === 401;

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    if (login.isError) login.reset();
  }

  const handleLogin = (e) => {
    e.preventDefault();
    login.mutate({email, password}, {
      onSuccess: () => {
        navigate('/app/products');
      }
    })
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
          }} value={email} onChange={handleChange(setEmail)} error={credentialsError || !!fieldErrors.email} helperText={fieldErrors.email} autoComplete="email" />
          <TextField fullWidth margin="normal" id="password" label="Hasło" variant="outlined" type="password" size="small" color="success" 
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon/>
              </InputAdornment>
            )
          }} value={password} onChange={handleChange(setPassword)} error={credentialsError || !!fieldErrors.password} helperText={fieldErrors.password} autoComplete="current-password" />
          {formError && <Alert severity="error" sx={{mt: 1}}>{formError}</Alert>}
          </Box>
          <button className="cursor-pointer py-2 px-4 block mt-6 bg-green-600 text-white font-bold text-center rounded w-full hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed" type="submit" disabled={login.isPending}>{login.isPending ? 'Logowanie...': 'Zaloguj się'}</button>
        </form>
        <div className="mt-6 text-center">
          <p>Nie masz konta? <Link to={"/register"} className="text-green-600 hover:text-green-700 font-medium">Zarejestruj się</Link></p>
        </div>
      </div>
      
  </div>
    );
}