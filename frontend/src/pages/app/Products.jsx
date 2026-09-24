import { useState, useMemo } from "react";
import { useProductCategories, useProducts } from "../../api/hooks";
import { Search, Plus } from "lucide-react";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import Select from '@mui/material/Select';
import AddProductModal from "../../components/products/AddProductModal";

export function Products() {

    const [selectedProductCategory, setSelectedProductCategory] = useState("");
    const [query, setQuery] = useState("")
    const [isAddOpen, setIsAddOpen] = useState(false);

    const { data: productCategory = [] } = useProductCategories();
    const { data: products, refetch: refetchProducts } = useProducts();

    const filteredProducts = useMemo(()=> {
        return (products ?? []).filter((product) => {
            const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
            const matchesCategory = selectedProductCategory ? product.category === selectedProductCategory : true;

            return matchesQuery && matchesCategory
        });
    }, [products, query, selectedProductCategory])

    return (
       <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="mb-6">
                <div className="flex justify-between mb-4 gap-4">
                    <h2 className="text-3xl mb-2">Produkty</h2>
                    <button className="bg-green-600 border px-4 py-2 rounded-xl text-white flex items-center justify-center gap-2 hover:bg-green-700 transition-colors sm:w-auto" onClick={()=> setIsAddOpen(true)}>
                        <Plus  size={24} className="w-5 h-5"/>Dodaj Produkt
                    </button>
                    <AddProductModal open={isAddOpen} onClose={() => setIsAddOpen(false)} onSuccess={() => refetchProducts()}/>
                </div>

                <div className="flex flex-col gap-4 mb-6 sm:flex-row">
                    <div className="relative flex-1">
                        <Search className="absolute w-5 h-5 left-3 top-1/2 transform -translate-y-1/2 text-gray-500 "/>
                        <input type="text" placeholder="Szukaj produktu" value={query} onChange={(e) => setQuery(e.target.value)} className="w-full border border-gray-300 rounded-xl py-2 pr-4 px-10 focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>

                    <div className="flex flex-shrink-0" >
                    <FormControl
                        sx={{
                            minWidth: 200,
                            '& .MuiOutlinedInput-root': {
                            borderRadius: '0.75rem', // rounded-xl
                            '& fieldset': {
                                borderColor: '#d1d5db', // gray-300
                            },
                            '&:hover fieldset': {
                                borderColor: '#9ca3af', // gray-400
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#22c55e', // green-500
                                borderWidth: 2,
                            },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                            color: '#22c55e',
                            },
                        }}
                        size="small"
                        >
                        <InputLabel id="category">Kategorie</InputLabel>
                        <Select
                            id="category"
                            label="Kategorie"
                            value={selectedProductCategory}
                            onChange={(e) => setSelectedProductCategory(e.target.value)}
                            size="small"
                        >   <MenuItem value="">Wszystkie</MenuItem>
                            {productCategory.map((productCategory, index) => (
                            <MenuItem value={productCategory.id} key={index}>
                                {productCategory.name}
                            </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    </div>

                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2">
                {filteredProducts.length === 0 && (
                    <p className="col-span-full text-center text-gray-500">
                        Brak wyników dla {query}
                    </p>
                )}

                {filteredProducts.map((product) => {
                    return (
                    <div className="border border-gray-200 rounded-lg shadow-lg p-4 bg-white" key={product.id}>
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    {product.name}
                                </h3>
                                <span className="text-sm text-gray-500">
                                    {product.category_name}
                                </span>
                            </div>
                            <span className="bg-green-200 p-1 text-xs rounded-lg text-green-800">
                                100g
                            </span>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-2 text-sm">
                            <div className="bg-gray-50 rounded p-2">
                                <span className="text-xs text-gray-500">
                                    Kalorie:
                                </span>
                                <p className="text-xs font-semibold">
                                    {product.calories} kcal
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded p-2">
                                <span className="text-xs text-gray-500">
                                    Białko:
                                </span>
                                <p className="text-xs font-semibold">
                                    {product.protein}g
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded p-2">
                                <span className="text-xs text-gray-500">
                                    Węglowodany:
                                </span>
                                <p className="text-xs font-semibold">
                                    {product.carbohydrates}g
                                </p>
                            </div>
                            <div className="bg-gray-50 rounded p-2">
                                <span className="text-xs text-gray-500">
                                    Tłuszcze:
                                </span>
                                <p className="text-xs font-semibold">
                                    {product.fat}g
                                </p>
                            </div>
                        </div>
                    </div>
                )})}
            </div>
       </div>
    );
}