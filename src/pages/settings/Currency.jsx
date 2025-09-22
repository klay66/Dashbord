import React from 'react';

export default function Currency() {
    return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-8">
            <h2 className="text-xl font-bold text-blue-600 mb-4">Currency Settings</h2>
            <form className="space-y-4">
                <div>
                    <select
                        className="w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:outline-none"
                        defaultValue="USD"
                    >
                        <option value="USD">USD - US Dollar</option>
                        <option value="EGP">EGP - Egyptian Pound</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="SAR">SAR - Saudi Riyal</option>
                    </select>
                </div>
                <div>
                    <input
                        className="w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:outline-none"
                        placeholder="Currency Format (مثال: $1,000.00)"
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
    );
}