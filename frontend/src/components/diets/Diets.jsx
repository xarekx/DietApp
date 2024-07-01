import React from "react";
import { useEffect, useState } from "react";
import { GeneratePdf } from "./GeneratePDF";
import { useFetch } from "../../hooks/useFetch";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function DietsData() {

    const [diets, setDiets] = useState([]);
    const [countWeeks, setCountWeeks] = useState({ weeks_count: 0, diet_days: [] });
    const [selectedWeek, setSelectedWeek ] = useState('Week 1');
    const fetchData = useFetch('http://127.0.0.1:8000/api/diets','GET');
    const fetchWeeks = useFetch('http://127.0.0.1:8000/api/diets/count-weeks','GET');
    
    useEffect(() => {
        fetchData()
        .then(res =>res.json())
        .then(data => setDiets(data))
        .catch(error => console.error('Error fetching products: ', error));
        // eslint-disable-next-line
    },[])

    useEffect(() => {
        fetchWeeks()
        .then(res =>res.json())
        .then(data => setCountWeeks(data))
        .catch(error => console.error('Error fetching products: ', error));
        // eslint-disable-next-line
    },[])

    const handleChange = (event) => {
        setSelectedWeek(event.target.value);
      };


    const generateItems = (length) => {
        return Array.from({ length }, (_, index) => (
          <MenuItem key={index} value={`Week ${index +1}`}>Week {index + 1}</MenuItem>
        ));
      };

    const generateDate = (dateArray, weekNumber) => {
        const weekNum = parseInt(weekNumber.split(" ")[1], 10);
        const start = (weekNum - 1) * 7;
        const end = weekNum * 7;
        return dateArray.slice(start, end).map((item, index) => (
            <span className="font-bold text-base rounded-md pb-2 pt-2 mb-4 border-[1px] border-slate-400" key={index}>{item}</span>
        ));
       
        
    }

    return (
        <>
        <div className="flex flex-col w-full lg:w-11/12 ms-2 me-2 h-fit text-xs lg:text-lg">
            <div className="mt-4">
                <Box sx={{ maxWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="week-select">Weeks</InputLabel>
                            <Select labelId="week-select-label" id="week-select" value={selectedWeek} label="Week" onChange={handleChange}>
                                {generateItems(countWeeks.weeks_count)}
                            </Select>
                    </FormControl>
                </Box>
            </div>
            <GeneratePdf/>
            <div className="grid lg:grid-cols-7 gap-y-8 gap-x-4 text-center md:ms-auto w-full mt-[4vh] ">
            {generateDate(countWeeks.diet_days, selectedWeek)}   
                {diets.map((diet, index) => {
                    return(
                        <>
                        <div className="flex flex-col border-dotted border-r-[1px] gap-y-4" key={index}>  
                                               
                            <div className="flex lg:flex-col rounded shadow-lg md:text-xs border-[1px] border-slate-300">
                                <img className="w-[100px] h-[75px] md:w-fit md:h-[98px] lg:w-full lg:h-full rounded-md" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
                                <div className="">
                                    <div className="font-semibold mt-2 m-1 mb-4 text-center md:p-0.5 lg:p-1 h-6 md:min-h-20 md:m-2 lg:m-1">{diet.breakfast && diet.breakfast.title ? diet.breakfast.title : 'null'}</div>
                                </div>
                            </div>

                            <div className="flex lg:flex-col rounded shadow-lg md:text-xs border-[1px] border-slate-300">
                                <img className="w-[100px] h-[75px] md:w-fit md:h-[98px] lg:w-full lg:h-full rounded-md" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
                                <div className="">
                                    <div className="font-semibold mt-2 m-1 mb-4 text-center md:p-0.5 lg:p-1 h-6 md:min-h-20 md:m-2 lg:m-1">{diet.second_breakfast && diet.second_breakfast.title ? diet.second_breakfast.title : 'null'}</div>
                                </div>
                            </div>

                            <div className="flex lg:flex-col rounded shadow-lg md:text-xs border-[1px] border-slate-300">
                                <img className="w-[100px] h-[75px] md:w-fit md:h-[98px] lg:w-full lg:h-full rounded-md" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
                                <div className="">
                                    <div className="font-semibold mt-2 m-1 mb-4 text-center md:p-0.5 lg:p-1 h-6 md:min-h-20 md:m-2 lg:m-1">{diet.lunch && diet.lunch.title ? diet.lunch.title : 'null'}</div>
                                </div>
                            </div>

                            <div className="flex lg:flex-col rounded shadow-lg md:text-xs border-[1px] border-slate-300">
                                <img className="w-[100px] h-[75px] md:w-fit md:h-[98px] lg:w-full lg:h-full rounded-md" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
                                <div className="">
                                    <div className="font-semibold mt-2 m-1 mb-4 text-center md:p-0.5 lg:p-1 h-6 md:min-h-20 md:m-2 lg:m-1">{diet.afternoon_meal && diet.afternoon_meal.title ? diet.afternoon_meal.title : 'null'}</div>
                                </div>
                            </div>

                            <div className="flex lg:flex-col rounded shadow-lg md:text-xs border-[1px] border-slate-300">
                                <img className="w-[100px] h-[75px] md:w-fit md:h-[98px] lg:w-full lg:h-full rounded-md" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
                                <div className="">
                                    <div className="font-semibold mt-2 m-1 mb-4 text-center md:p-0.5 lg:p-1 h-6 md:min-h-20 md:m-2 lg:m-1">{diet.dinner && diet.dinner.title ? diet.dinner.title : 'null'}</div>
                                </div>
                            </div>
                        </div>
                        </>
                    )
                })}
            </div>
        </div>
    </>
    )
}