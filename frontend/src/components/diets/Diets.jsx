import React from "react";
import { useEffect, useState } from "react";
import { GeneratePdf } from "./GeneratePDF";



export function DietsData({getCookie}) {

    const [diets, setDiets] = useState([]);

    useEffect(() => {
        const csrftoken = getCookie('csrftoken');
        fetch('http://127.0.0.1:8000/api/diets', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': csrftoken
            },
            credentials: "include"
        })
        .then(res =>res.json())
        .then(data => setDiets(data))
        .catch(error => console.error('Error fetching products: ', error));

    }, [getCookie])


    return (
        <>
        <div className="flex flex-col w-full lg:w-11/12 ms-2 me-2 h-fit text-xs lg:text-lg">
        <GeneratePdf getCookie={getCookie}/>
            <div className="grid lg:grid-cols-7 gap-y-8 gap-x-4 text-center md:ms-auto w-full mt-[4vh] ">
                {diets.map((diet, index) => {
                    return(
                        <>
                        <div className="flex flex-col border-dotted border-r-[1px] gap-y-4" key={index}>
                            <span className="font-bold text-base rounded-md pb-2 pt-2 mb-4 border-[1px] border-slate-400">{diet.day}</span>
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