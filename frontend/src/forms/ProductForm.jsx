import { useState } from "react"


export function ProductForm() {

    const [toggle, setToggle] = useState(false)

    const [form, setForm] = useState(useState({
        name: "",
        protein: 0,
        carbohydrates: 0,
        fat: 0,
        calories: 0
    }))
    
    const handleChange = (event) => {
        setForm({
            ...form,
        [event.target.id]: event.target.value,
    });
    };

    const handleSubmit = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name: form.name,
                protein: form.protein,
                carbohydrates: form.carbohydrates,
                fat: form.fat,
                calories: form.calories  })
        };
        fetch('http://127.0.0.1:8000/api/products/', requestOptions)
            .then(response => response.json())
            .then(form => this.setState({ formId: form.id }));
    }

  return (
    <>
      <button 
            onClick={() => setToggle(!toggle)} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Product
      </button>
      {toggle && (
        <form onSubmit={handleSubmit} className="flex flex-col bg-slate-500">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" value={form.name} onChange={handleChange}></input>
            <label htmlFor="protein">Protein</label>
            <input id="protein" type="number" value={form.protein} onChange={handleChange}></input>
            <label htmlFor="carbohydrates">Carbohydrates</label>
            <input id="carbohydrates" type="number" value={form.carbohydrates} onChange={handleChange}></input>
            <label htmlFor="fat">Fat</label>
            <input id="fat" type="number" value={form.fat} onChange={handleChange}></input>
            <label htmlFor="calories">Calories</label>
            <input id="calories" type="number" value={form.calories} onChange={handleChange}></input>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Dodaj</button>
        </form>
      )}
    </>
  )
}