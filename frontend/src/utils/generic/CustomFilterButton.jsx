import React from 'react';
import { Button } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const CustomFilterButton = () => {
  return (
    <Button variant="outlined"
    size="small"
    sx={{
      color:"#6D5BD0",
      borderColor:"#6D5BD0",
      '&:hover': {
          borderColor: '#6D5BD0',
          backgroundColor: 'rgba(109, 91, 208, 0.04)',
        },
    }}
    startIcon={<FilterAltIcon className='text-[#6D5BD0]' />}>
    Filter</Button>
  );
};

export default CustomFilterButton;