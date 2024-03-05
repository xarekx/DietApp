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
    const [ingredients, setIngredients] = useState([])


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
        setIngredients([...ingredients, product.id]);
        setFilteredProducts([]);

        let filterIngredients = document.getElementById("filterIngredients");
        filterIngredients.value = "";

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

    return (
    <div className="flex flex-col ms-auto me-auto w-2/3 mt-10 rounded-t shadow-xl bg-white h-fit">
        <form className="flex flex-col text-black">
            <label htmlFor="title" className="p-2">Recipe Name</label>
            <input id="title" type="text" value={recipeForm.title} onChange={handleChange} className="bg-slate-100 ps-2 ms-2"></input>
            <input id="filterIngredients" className="ps-2 ms-2" type="text" onChange={handleFilter}/>
                <div className="relative">
                    <ul className="absolute w-full">
                    {filteredProducts.map((product) => {
                        return(
                        <li className="bg-white p-2" onClick={()=>handleUpdateIngredientsList(product)}>{product.name}</li>)})}
                    </ul>
                </div>
        </form>
        <div>
            <span>
                Ingredients List
            </span>
            <div>
                <ul>
                    <li>{ingredients}</li>
                </ul>
                
            </div>
        </div>
    </div>)
  
}