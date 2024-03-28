import { useEffect, useState } from "react"
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';


export function AddRecipeForm() {

    const [recipeForm, setRecipeForm] = useState({
        title: "",
        ingredients: [] 
    })

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [ingredients, setIngredients] = useState([]);
    const [productValue, setProductValue] = useState("");
    const [quantityValue, setQuantityValue] = useState(0);
    const [postRequestValue, setPostRequestValue] = useState(false);

    console.log(recipeForm);

    const handleTitleChange = (event) => {
        setRecipeForm({
            ...recipeForm,
        [event.target.id]: event.target.value,
      })
    };

    const clearInputs = () => {
        const productInput = document.getElementById("filterIngredients");
        const quantityInput = document.getElementById("quantityInput");
        productInput.value = "";
        quantityInput.value = 0;
    }

    const handleUpdateIngredientsList = (product) => {
        setProductValue(product);
        setFilteredProducts([]);
    }

    const fetchProducts = () => {
        fetch("http://127.0.0.1:8000/api/products/")
            .then((res) =>{
                return res.json();
        }).then((data) => {
            setProducts(data);
        })
    }

    // get products from products rest api
    useEffect(() => {
        fetchProducts();
    },[]);

    const handleFilter = (event) => {
        if (event.target.value === '' ){
            setFilteredProducts([])
        } else {
            setFilteredProducts(products.filter(d => (d.name.toLowerCase().startsWith(event.target.value))));
        }
        
    }

    const handleIngredients = (e, product, quantity) => {
        e.preventDefault();

        const newIngredient = {
            product: product,
            quantity: quantity
        };

        setRecipeForm(prevForm => ({
            ...prevForm,
            ingredients: [...prevForm.ingredients, newIngredient]
        }));
        
        setIngredients([...ingredients, newIngredient]);
        setProductValue("");
        clearInputs();
        
    }

    const handleCreateRecipe = () => {
        fetch("http://127.0.0.1:8000/api/recipes/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(recipeForm)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Obsługa odpowiedzi
            console.log('Recipe created:', data);
            setPostRequestValue(true);
            setTimeout(function() {
                setPostRequestValue(false);
            }, 2000)
            setIngredients([]);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    };

    const handleDeleteProductFromRecipe = (productId) => {
        const updatedIngredients = ingredients.filter(ingredient => ingredient.product.id !== productId);
        setIngredients(updatedIngredients);
        setRecipeForm(prevForm => ({
            ...prevForm,
            ingredients: recipeForm.ingredients.filter(ingredient => ingredient.product.id !== productId)
        }));
    }

    return (
    <div className="flex flex-row ms-auto me-auto w-2/3 mt-10 rounded-t shadow-xl bg-white h-fit">
        <div className="flex flex-col w-full">
            <form className="text-black font-medium">
                <div className="flex flex-col">
                    <label htmlFor="title" 
                    className="ms-3 mt-2 mb-1 text-sm">Recipe Name</label>
                    
                    <input id="title" type="text"
                    className="outline-blue-500 me-3 ps-3 p-1 ms-3 border border-slate-400 rounded-md" placeholder="Recipe Name" onChange={handleTitleChange}>
                    </input>

                </div>
                <div className="flex flex-col float-start w-2/3">
                    <label htmlFor="filterIngredients" 
                    className="ms-3 mt-2 mb-1 text-sm">Products</label>

                    <input id="filterIngredients" 
                    className="outline-blue-500 me-3 ps-3 p-1 ms-3 border border-slate-400 rounded-md float-start" placeholder="Products" type="text" onChange={handleFilter} autoComplete="off" value={productValue.name}/>
                        <div className="relative">
                            <ul className="absolute w-2/3">
                            {filteredProducts.map((product) => {
                                return(
                                <li className="bg-white p-2" key={product.id} onClick={()=>handleUpdateIngredientsList(product)}>{product.name}</li>
                                )})}
                            </ul>
                        </div>
                </div>
                <div className="flex flex-col w-1/3 float-right">
                    <label htmlFor="quantity" className="ms-3 mt-2 mb-1 text-sm">Quantity</label>   
                    <input id="quantityInput" type="number" placeholder="Quantity" onChange={(e)=> setQuantityValue(e.target.value)} defaultValue={0} 
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ingredients.map((ingredient, index)=> (
                            <tr key={index}>
                                <td className="border ps-6">{ingredient.product.name}</td>
                                <td className="border ps-6">{ingredient.quantity}</td>
                                <td className="border flex justify-between">
                                    <EditIcon className="text-emerald-600 hover:cursor-pointer"/>
                                    <ClearIcon className="text-red-600 hover:cursor-pointer" onClick={() => handleDeleteProductFromRecipe(ingredient.product.id)}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>                  
            </div>
            <button 
                className="text-sm text-white border float-right m-3 p-2 rounded-md bg-emerald-500 hover:shadow-md" 
                onClick={handleCreateRecipe}>Create Recipe
            </button>
            {postRequestValue ? 
            ( 
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Here is a gentle confirmation that your action was successful.
            </Alert>
            )
            :null}
            
        </div>
        
    </div>)
  
}