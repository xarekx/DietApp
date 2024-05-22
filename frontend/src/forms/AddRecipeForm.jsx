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
    const [editModalToggle, setEditModalToggle] = useState(false);
    const [selectedIngredientIndex, setSelectedIngredientIndex] = useState(null);

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

    // get products from database
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

    // post request - creating new recipe
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
            // handle response
            console.log('Recipe created:', data);
            setPostRequestValue(true);
            setTimeout(function() {
                setPostRequestValue(false);
            }, 2000)
            setIngredients([]);
            setRecipeForm({
                title: "",
                ingredients: [] 
            });
            // clear input value of recipe title
            const recipeNameInput = document.getElementById("title");
            recipeNameInput.value = "";
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    };

    console.log(recipeForm);

    const handleDeleteProductFromRecipe = (productId) => {
        const updatedIngredients = ingredients.filter(ingredient => ingredient.product.id !== productId);
        
        setIngredients(updatedIngredients);

        setRecipeForm(prevForm => ({
            ...prevForm,
            ingredients: updatedIngredients
        }));   
    }

    // set editing ingredient 
    const handleUpdateQuantity = (productId) => {

        setEditModalToggle(true);

        const ingredientIndex = ingredients.findIndex(ingredient => ingredient.product.id === productId);
        
        setSelectedIngredientIndex(ingredientIndex);
        
    }

    // set new value of quantity
    const saveQuantity = (event) => {
        event.preventDefault();

        if (selectedIngredientIndex !== -1)  {
            // creating copy of ingredient object
            const updatedIngredient = {...ingredients[selectedIngredientIndex]};
        
            // update value of quantity from the quantity modal input
            updatedIngredient.quantity = event.currentTarget.quantity.value;

            // find changed ingredient in the ingredients
            const updatedIngredients = [...ingredients];
            updatedIngredients[selectedIngredientIndex] = updatedIngredient;

            // update ingredients
            setIngredients(updatedIngredients);

            // update form to post data 
            setRecipeForm(prevForm => ({
                ...prevForm,
                ingredients:updatedIngredients
            })); 
        }

        setEditModalToggle(false);
    }

    return (
    <div className="flex flex-row md:ms-auto md:me-auto w-full m-2 md:w-2/3 mt-10 rounded-t shadow-xl bg-white h-fit">
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
                <button className="text-xs md:text-sm text-white border float-right m-3 p-2 rounded-md bg-emerald-500 hover:shadow-md" onClick={(e)=> handleIngredients(e,productValue,quantityValue)}>Add Ingredient</button>
            </form>
            <div className="font-medium text-md mb-4 h-40 md:min-h-80">
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
                                    <EditIcon className="text-emerald-600 hover:cursor-pointer" onClick={()=>handleUpdateQuantity(ingredient.product.id)}/>
                                    {editModalToggle ? 
                                    (
                                        <>
                                            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                                <div className="relative w-auto my-6 mx-auto max-w-sm">
                                                    {/*content*/}
                                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                        {/*header*/}
                                                        <div className="flex p-5 border-b border-solid border-blueGray-200 rounded-t w-full justify-center">
                                                            <h3 className="text-3xl font-semibold">
                                                            Edit Product
                                                            </h3>
                                                        </div>
                                                        {/*body*/}
                                                        <div className="relative p-6 flex-auto">
                                                            <form onSubmit={(event)=> saveQuantity(event)} className="flex flex-col">
                                                                <label htmlFor="quantity">Name</label>
                                                                <input id="quantity" type="text" defaultValue={ingredients[selectedIngredientIndex].quantity} className="bg-slate-100"></input>
                                                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                                    <button
                                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                        type="button" onClick={() => setEditModalToggle(false)}>
                                                                        Close
                                                                    </button>
                                                                    <button
                                                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                        type="submit"
                                                                        >
                                                                        Save Changes
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                        {/*footer*/}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                        </>
                                    ): false
                                }
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