import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export function ProductDetails() {

    const params = useParams();

    const [productDetail, setProductDetail] = useState([]);
   
    useEffect( () => {
        fetch("http://127.0.0.1:8000/api/products/"+params.productId).then((res) =>{
            return res.json();
        }).then((data) => {
            setProductDetail(data);
        })
    });

    return(
    <>
    <div className="flex flex-col p-5">
        <div>
            <span className="font-bold">
                Product Name: 
            </span>
            <span>
                {productDetail.name}
            </span>
        </div>
        <div>
            <span className="font-bold">
                Product Carbohydrates: 
            </span>
            <span>
                {productDetail.carbohydrates}
            </span>
        </div>
        <div>
            <span className="font-bold">
                Product Protein: 
            </span>
            <span>
                {productDetail.protein}
            </span>
        </div>
        <div>
            <span className="font-bold">
                Product Fat: 
            </span>
            <span>
                {productDetail.fat}
            </span>
        </div>
        <div>
            <span className="font-bold">
                Product Calories:
            </span>
            <span>
                {productDetail.calories}
            </span>
        </div>
        <div className="flex pt-5">
            <button>
                Change values
            </button>
        </div>
    </div>
    
    </>);

}