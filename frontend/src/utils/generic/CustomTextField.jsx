import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const CustomTextField = ({onChange, value}) => {
  return (
    <TextField
      variant="outlined"
      onChange={onChange}
      value={value}
      label="Search"
      fullWidth
      size="small"
      sx={{
        '& .MuiInputLabel-root': {
          color: '#6D5BD0', // kolor tekstu label
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#6D5BD0', // kolor tekstu label podczas focusa
        },
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
          borderColor: '#6D5BD0', // kolor obramowania tekstu
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#6D5BD0', // kolor obramowania podczas focusa
        },
        
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlinedIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CustomTextField;