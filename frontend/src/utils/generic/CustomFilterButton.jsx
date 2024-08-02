import React, { useState } from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const CustomFilterButton = ({sortOption}) => {
  const [toggleModal, setToggleModal] = useState(false);

  const handleFilterSort = (event) => {
    sortOption(event.target.value);
  }

  const radioModal = () => {
    return (
      <div className='absolute top-56 bg-white p-4 border rounded-md'>
        <div className=''>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label" size='small' sx={{ color: "#6D5BD0", display: 'block' }}>SORT BY:</FormLabel>
            <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
              <FormControlLabel
                value="name"
                labelPlacement='end'
                control={<Radio size='small' sx={{color:"#6D5BD0", '&.Mui-checked': {
                  color:"#6D5BD0"
                }}} />}
                label="Name"
                onClick={(event)=>handleFilterSort(event)}
                sx={{
                  '.MuiFormControlLabel-root': {
                    margin: '0',
                    display: 'flex',
                    justifyContent: 'space-between',
                  },
                  '.MuiFormControlLabel-label': {
                    textAlign: 'left',
                    fontSize: '0.875rem',
                  },
                }}
              />
              <FormControlLabel
                value="category"
                labelPlacement='end'
                control={<Radio size='small' sx={{color:"#6D5BD0", '&.Mui-checked': {
                  color:"#6D5BD0"
                }}} />}
                label="Category"
                onClick={(event)=>handleFilterSort(event)}
                sx={{
                  '.MuiFormControlLabel-root': {
                    margin: '0',
                    display: 'flex',
                    justifyContent: 'space-between',
                  },
                  '.MuiFormControlLabel-label': {
                    textAlign: 'left',
                    fontSize: '0.875rem',
                  },
                }}
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    );
  }

  return (
    <>
      <Button variant="outlined"
        size="small"
        onClick={() => setToggleModal(!toggleModal)}
        sx={{
          color: "#6D5BD0",
          borderColor: "#6D5BD0",
          '&:hover': {
            borderColor: '#6D5BD0',
            backgroundColor: 'rgba(109, 91, 208, 0.04)',
          },
        }}
        startIcon={<FilterAltIcon className='text-[#6D5BD0]' />}>
        Filter</Button>
      {toggleModal && radioModal()}
    </>
  );
};

export default CustomFilterButton;
