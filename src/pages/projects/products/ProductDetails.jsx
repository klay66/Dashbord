import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, ShoppingCart, Heart, Share2 } from "lucide-react";
import api from "../../../api/axios";
import Loading from "../../../components/Loading";

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/products/${id}`);
                const productData = {
                    id: res.data.id,
                    name: res.data.title,
                    price: res.data.price,
                    description: res.data.description,
                    category: res.data.category,
                    image: res.data.image,
                    rating: res.data.rating?.rate || 0,
                    reviewCount: res.data.rating?.count || 0,
                    stock: res.data.rating?.count || 0,
                };
                setProduct(productData);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("Product not found");
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
                <Loading />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-blue-600 hover:text-brand-800 mb-6 transition cursor-pointer"
                >
                    <ArrowLeft size={20} />
                    Back to Products
                </button>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                        {/* Product Image */}
                        <div className="space-y-4">
                            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-contain p-4"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="text-gray-400 text-8xl">🛒</span>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button className="flex-1 flex items-center justify-center gap-2 bg-brand-600 text-white py-3 rounded-lg hover:bg-brand-700 transition">
                                    <ShoppingCart size={20} />
                                    Add to Cart
                                </button>
                                <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                                    <Heart size={20} />
                                </button>
                                <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            <div>
                                <span className="px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-sm font-medium">
                                    {product.category}
                                </span>
                                <h1 className="text-3xl font-bold text-gray-900 mt-4">{product.name}</h1>

                                {/* Rating */}
                                <div className="flex items-center gap-2 mt-3">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className={`${i < Math.floor(product.rating)
                                                    ? "text-yellow-400 fill-current"
                                                    : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600">
                                        {product.rating} ({product.reviewCount} reviews)
                                    </span>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="text-4xl font-bold text-brand-600">
                                ${product.price}
                            </div>

                            {/* Stock Status */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Stock:</span>
                                <span className={`px-2 py-1 rounded text-sm font-medium ${product.stock > 10
                                    ? 'bg-green-100 text-green-700'
                                    : product.stock > 0
                                        ? 'bg-yellow-100 text-yellow-700'
                                        : 'bg-red-100 text-red-700'
                                    }`}>
                                    {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                                </span>
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                            </div>

                            {/* Product Details */}
                            <div className="border-t pt-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="text-sm text-gray-500">Product ID</span>
                                        <p className="font-medium">{product.id}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">Category</span>
                                        <p className="font-medium capitalize">{product.category}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">Price</span>
                                        <p className="font-medium">${product.price}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">Stock</span>
                                        <p className="font-medium">{product.stock} units</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
