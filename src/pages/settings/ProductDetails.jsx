import React from 'react'

export default function ProductDetails() {
    return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-8">
            <h2 className="text-xl font-bold text-blue-600 mb-4">Product Details</h2>
            <form className="space-y-4">
                <div>
                    <input
                        className="w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:outline-none"
                        placeholder="Product Name"
                    />
                </div>
                <div>
                    <textarea
                        className="w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:outline-none"
                        placeholder="Description"
                        rows={3}
                    />
                </div>
                <div className="flex gap-4">
                    <input
                        type="number"
                        className="w-1/2 border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:outline-none"
                        placeholder="Price"
                    />
                    <input
                        type="number"
                        className="w-1/2 border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:outline-none"
                        placeholder="Stock"
                    />
                </div>
                <div>
                    <input
                        className="w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:outline-none"
                        placeholder="Category"
                    />
                </div>
                <div>
                    <input
                        type="file"
                        className="w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:outline-none"
                    />
                </div>
                <button
                    type="button"
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                    Save
                </button>
            </form>
        </div>
    )
}
