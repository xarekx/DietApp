import { useEffect, useState } from "react"


export function AddRecipeForm() {

    //  const newRecipe = {
    //     "id": 2,
    //     "title": "Naleśniki z serem i owocami",
    //     "ingredients": [
    //         {
    //             "product_name": "Ser twarogowy chudy",
    //             "quantity": 125
    //         },
    //         {
    //             "product_name": "Naleśniki",
    //             "quantity": 180
    //         },
    //         {
    //             "product_name": "Jogurt naturalny",
    //             "quantity": 100
    //         },  
    //         {
    //             "product_name": "Truskawki",
    //             "quantity": 75
    //         }
    //     ]
    // }

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(products)
    const [ingredients, setIngredients] = useState([]);
    const [productValue, setProductValue] = useState();
    const [quantityValue, setQuantityValue] = useState();

    const handleUpdateIngredientsList = (product) => {
        setProductValue(product);
        setFilteredProducts([]);

    }

    // get products from products rest api
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/products/")
            .then((res) =>{
                return res.json();
        }).then((data) => {
            setProducts(data);
        })
    },[]);

    const handleFilter = (event) => {
        setFilteredProducts(products.filter(d => (d.name.toLowerCase().includes(event.target.value))));
    }

    const handleIngredients = (e, product_name, quantity) => {
        e.preventDefault();
        setIngredients([...ingredients, {product_name, quantity}]);
        console.log(ingredients);
        setProductValue('');
        setQuantityValue('');
    }

    // TODO - create recipe form

    return (
    <div className="flex flex-row ms-auto me-auto w-2/3 mt-10 rounded-t shadow-xl bg-white h-fit">
        <div className="flex flex-col w-full">
            <form className="text-black font-medium">
                <div className="flex flex-col">
                    <label htmlFor="title" 
                    className="ms-3 mt-2 mb-1 text-sm">Recipe Name</label>
                    
                    <input id="title" type="text"
                    className="outline-blue-500 me-3 ps-3 p-1 ms-3 border border-slate-400 rounded-md" placeholder="Recipe Name"></input>
                </div>
                <div className="flex flex-col float-start w-2/3">
                    <label htmlFor="filterIngredients" 
                    className="ms-3 mt-2 mb-1 text-sm">Products</label>

                    <input id="filterIngredients" 
                    className="outline-blue-500 me-3 ps-3 p-1 ms-3 border border-slate-400 rounded-md float-start" placeholder="Products"type="text" onChange={handleFilter} value={productValue}/>
                        <div className="relative">
                            <ul className="absolute w-2/3">
                            {filteredProducts.map((product) => {
                                return(
                                <li className="bg-white p-2" onClick={(e)=>handleUpdateIngredientsList(product.name)}>{product.name}</li>)})}
                            </ul>
                        </div>
                </div>
                <div className="flex flex-col w-1/3 float-right">
                    <label htmlFor="quantity" className="ms-3 mt-2 mb-1 text-sm">Quantity</label>   
                    <input type="number" placeholder="Quantity" onChange={(e)=> setQuantityValue(e.target.value)} defaultValue={0} 
                    className="outline-blue-500 me-3 ps-3 p-1 ms-3 border border-slate-400 rounded-md"/>
                </div>
                <button className="text-sm text-white border float-right m-3 p-2 rounded-md bg-emerald-500 hover:shadow-md" onClick={(e)=> handleIngredients(e,productValue,quantityValue)}>Add Ingredient</button>
            </form>
            <div className="font-medium text-md mb-4 min-h-80">
                <span className="ms-3">
                    Ingredients List
                </span>
                <table className="w-full border text-black">
                    <thead>
                        <tr className="border">
                            {/* table headers */}
                            <th className="border text-start ps-4 w-2/3">Product</th>
                            <th className="border text-start p-2 w-1/3">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ingredients.map((ingredient, index)=> (
                            <tr key={index}>
                                <td className="border ps-6">{ingredient.product_name}</td>
                                <td className="border ps-6">{ingredient.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>                  
            </div>
            <button className="text-sm text-white border float-right m-3 p-2 rounded-md bg-emerald-500 hover:shadow-md">Create Recipe</button>
        </div>
        
    </div>)
  
}