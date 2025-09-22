import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import Loading from "../../../components/Loading";
import { Eye } from "lucide-react";

const categories = [
    { label: "All", value: "all" },
    { label: "Clothing", value: "men's clothing" },
    { label: "Girls Clothing", value: "women's clothing" },
    { label: "Electronics", value: "electronics" },
    { label: "Accessories", value: "jewelery" },
];

export default function Products() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [activeCat, setActiveCat] = useState("all");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await api.get("/products");
                const formatted = res.data.map((p) => ({
                    id: p.id,
                    name: p.title,
                    price: p.price,
                    stock: p.rating?.count || 0,
                    image: p.image,
                    category: p.category,
                }));
                setProducts(formatted);
                setFiltered(formatted);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching products:", err);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleFilter = (cat) => {
        setActiveCat(cat);
        if (cat === "all") {
            setFiltered(products);
        } else {
            setFiltered(products.filter((p) => p.category === cat));
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-blue-600">Products</h2>
                    <p className="text-gray-600">Manage your product inventory</p>
                </div>
            </div>

            {/* Filter Buttons */}
            <div className="bg-white p-4 rounded-xl shadow">
                <div className="flex flex-wrap gap-3 justify-center">
                    {categories.map((cat) => (
                        <button
                            key={cat.value}
                            onClick={() => handleFilter(cat.value)}
                            className={`px-5 py-2 rounded-full font-semibold transition shadow-sm text-sm
                ${activeCat === cat.value
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "bg-white text-blue-600 border border-blue-300 hover:bg-blue-50"
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-lg font-bold text-blue-600 mb-4">Products List</h3>
                {loading ? (
                    <div className="p-8 text-center">
                        <Loading />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="p-3 border-b font-medium text-gray-700">Product</th>
                                    <th className="p-3 border-b font-medium text-gray-700">Category</th>
                                    <th className="p-3 border-b font-medium text-gray-700">Price</th>
                                    <th className="p-3 border-b font-medium text-gray-700">Stock</th>
                                    <th className="p-3 border-b font-medium text-gray-700 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((product) => (
                                    <tr
                                        key={product.id}
                                        className="hover:bg-gray-50 transition hover:shadow-sm"
                                    >
                                        {/* Product */}
                                        <td className="p-3 border-b">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-12 w-12">
                                                    {product.image ? (
                                                        <img
                                                            className="h-12 w-12 rounded-lg object-cover shadow-md transition-transform duration-200 hover:scale-105"
                                                            src={product.image}
                                                            alt={product.name}
                                                        />
                                                    ) : (
                                                        <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center shadow-inner">
                                                            <span className="text-gray-400 text-sm">🛒</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="ml-3">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {product.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Category */}
                                        <td className="p-3 border-b">
                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                                {product.category}
                                            </span>
                                        </td>

                                        {/* Price */}
                                        <td className="p-3 border-b text-sm font-semibold text-gray-900">
                                            ${product.price}
                                        </td>

                                        {/* Stock */}
                                        <td className="p-3 border-b">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${product.stock > 10
                                                        ? "bg-green-100 text-green-700"
                                                        : product.stock > 0
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {product.stock}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="p-3 border-b text-center">
                                            <button
                                                onClick={() => navigate(`/product/${product.id}`)}
                                                className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition cursor-pointer"
                                            >
                                                <Eye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
