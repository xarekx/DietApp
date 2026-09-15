import { X } from "lucide-react";

export default function AddProductModal({ open, onClose, onSuccess}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between p-6 mb-3">
                <h3 className="font-semibold text-xl">Dodaj nowy produkt</h3>
                <X size={24} className="w-6 h-6 hover:bg-slate-100 cursor-pointer rounded-md"/>
                </div>
                <hr className="w-full"/>
                <form className="p-4 space-y-4">
                    <div>
                        <label className="block text-md font-medium text-gray-800 mb-1">Nazwa produktu*</label>
                        <input type="text" placeholder="np. Kurczak pierś" className="w-full px-3 py-2 border border-green-300 rounded-lg"></input>
                    </div>
                    
                </form>
            </div>
        </div>
    )

}