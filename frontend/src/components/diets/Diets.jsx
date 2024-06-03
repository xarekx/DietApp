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
        <div className="flex flex-col lg:w-11/12 ms-auto pe-[5vw] h-fit text-xs lg:text-lg">
        <GeneratePdf/>
            <div className="grid lg:grid-cols-7 gap-x-4 text-center w-5/6 md:w-2/3 lg:w-full mt-[4vh] shadow-2xl">
                {diets.map((diet, index) => {
                    return(
                        <>
                        <div className="flex flex-col border-dotted border-r-[1px] border-slate-300" >
                            <span>{diet.day}</span>
                            <div className="flex flex-col max-w-sm rounded shadow-lg md:text-xs lg:text-sm">
                                <img className="w-full" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
                                <div className="">
                                    <div className="font-bold m-1 mb-4 text-center md:p-0.5 lg:p-1 h-6 md:h-14 md:m-2 lg:m-1">{diet.breakfast && diet.breakfast.title ? diet.breakfast.title : 'null'}</div>
                                </div>
                            </div>

                            <div className="flex flex-col max-w-sm rounded shadow-lg md:text-xs lg:text-sm">
                                <img className="w-full" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
                                <div className="">
                                    <div className="font-bold m-1 mb-4 text-center md:p-0.5 lg:p-1 h-6 md:h-14 md:m-2 lg:m-1">{diet.second_breakfast && diet.second_breakfast.title ? diet.second_breakfast.title : 'null'}</div>
                                </div>
                            </div>

                            <div className="flex flex-col max-w-sm rounded shadow-lg md:text-xs lg:text-sm">
                                <img className="w-full" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
                                <div className="">
                                    <div className="font-bold m-1 mb-4 text-center md:p-0.5 lg:p-1 h-6 md:h-14 md:m-2 lg:m-1">{diet.lunch && diet.lunch.title ? diet.lunch.title : 'null'}</div>
                                </div>
                            </div>

                            <div className="flex flex-col max-w-sm rounded shadow-lg md:text-xs lg:text-sm">
                                <img className="w-full" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
                                <div className="">
                                    <div className="font-bold m-1 mb-4 text-center md:p-0.5 lg:p-1 h-6 md:h-14 md:m-2 lg:m-1">{diet.afternoon_meal && diet.afternoon_meal.title ? diet.afternoon_meal.title : 'null'}</div>
                                </div>
                            </div>

                            <div className="flex flex-col max-w-sm rounded shadow-lg md:text-xs lg:text-sm">
                                <img className="w-full" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
                                <div className="">
                                    <div className="font-bold m-1 mb-4 text-center md:p-0.5 lg:p-1 h-6 md:h-14 md:m-2 lg:m-1">{diet.dinner && diet.dinner.title ? diet.dinner.title : 'null'}</div>
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