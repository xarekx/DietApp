import { useEffect, useState } from "react"


export function AddRecipeForm() {

    // const newRecipe = {
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
    const [ingredients, setIngredients] = useState(useState(
        {
            product_name:"",
            quantity:null
        }))

    const [productValue, setProductValue] = useState();
    const [quantityValue, setQuantityValue] = useState();


    const [recipeForm, setRecipeForm] = useState(useState({
        title: "",
        ingredients: [{
            product_name: "",
            quantity: 0
        }]
    }));


    const handleChange = (event) => {
        setRecipeForm({
            ...recipeForm,
        [event.target.id]: event.target.value,
      })
    };

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
        setFilteredProducts(products.filter(d => (d.name.toLowerCase().includes(event.target.value))))
    }

    const handleIngredients = (e,product_name, quantity) => {
        e.preventDefault();
        setIngredients([...ingredients, {product_name,quantity}])
        setProductValue()
        setQuantityValue()
        
    }

    // TODO - create recipe form

    return (
    <div className="flex flex-col ms-auto me-auto w-2/3 mt-10 rounded-t shadow-xl bg-white h-fit">
        <form className="flex flex-col text-black">
            <label htmlFor="title" className="p-2">Recipe Name</label>
            <input id="title" type="text" value={recipeForm.title} onChange={handleChange} className="bg-slate-100 ps-2 ms-2"></input>
            <input id="filterIngredients" className="ps-2 ms-2 text-black" type="text" onChange={handleFilter} value={productValue}/>
                <div className="relative">
                    <ul className="absolute w-2/3">
                    {filteredProducts.map((product) => {
                        return(
                        <li className="bg-white p-2" onClick={()=>handleUpdateIngredientsList(product.name)}>{product.name}</li>)})}
                    </ul>
                </div>
            <label htmlFor="quantity">Quantity</label>   
            <input type="number" placeholder="Quantity" onChange={(e)=> setQuantityValue(e.target.value)} defaultValue={0}/>
            <button className="border" onClick={(e)=> handleIngredients(e,productValue,quantityValue)}>Add Ingredient</button>
        </form>
        <div>
            <span>
                Ingredients List
            </span>
            <div>
                <ul>
                    {ingredients.map((ingredient) => {return(<li>{ingredient.product_name} {ingredient.quantity}</li>)})}
                </ul>
                
            </div>
        </div>
    </div>)
  
}