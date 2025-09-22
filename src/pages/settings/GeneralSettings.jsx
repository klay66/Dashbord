import React from 'react';

export default function GeneralSettings() {
    return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-8">
            <h2 className="text-xl font-bold text-blue-600 mb-4">General Settings</h2>
            <form className="space-y-4">
                <div>
                    <input
                        className="w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:outline-none"
                        placeholder="Dashboard Name"
                    />
                </div>
                <div>
                    <select
                        className="w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:outline-none"
                        defaultValue="English"
                    >
                        <option value="English">English</option>
                        <option value="Arabic">Arabic</option>
                    </select>
                </div>
                <div>
                    <input
                        type="color"
                        className="w-12 h-8 border border-gray-300 rounded-lg"
                        defaultValue="#2563eb"
                    />
                    <span className="ml-2 text-sm text-gray-600">Theme Color</span>
                </div>
                <div>
                    <input
                        className="w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:outline-none"
                        placeholder="Default Project Name"
                    />
                </div>
                <div>
                    <select
                        className="w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:outline-none"
                        defaultValue="User"
                    >
                        <option value="User">Default User Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                    </select>
                </div>
                <div>
                    <input
                        type="number"
                        className="w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:outline-none"
                        placeholder="Default Product Stock"
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