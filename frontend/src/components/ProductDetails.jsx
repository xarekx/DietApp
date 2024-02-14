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

    return(<div>{productDetail.name}</div>);

}