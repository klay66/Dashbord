export default function Home() {
    return (
        <div className="p-6  bg-gray-100 min-h-screen space-y-6">
            <h2 className="text-2xl font-bold text-blue-600">Home</h2>
            <p className="text-gray-600 mb-4">Welcome to the dashboard homepage!</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow text-center">
                    <p className="text-gray-500">Users</p>
                    <h2 className="text-2xl font-bold">120</h2>
                </div>
                <div className="bg-white p-6 rounded-xl shadow text-center">
                    <p className="text-gray-500">Projects</p>
                    <h2 className="text-2xl font-bold">45</h2>
                </div>
                <div className="bg-white p-6 rounded-xl shadow text-center">
                    <p className="text-gray-500">Revenue</p>
                    <h2 className="text-2xl font-bold">$5,000</h2>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-lg font-bold mb-4 text-blue-600">
                    Activities Overview
                </h2>
                <div className="h-52 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600">
                    Chart Placeholder
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-4">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 text-blue-600">Name</th>
                                <th className="py-2 text-blue-600">Status</th>
                                <th className="py-2 text-blue-600">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="py-2">Dashboard App</td>
                                <td className="py-2 text-green-600 font-medium">Active</td>
                                <td className="py-2">02/09/2025</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2">E-commerce Platform</td>
                                <td className="py-2 text-yellow-600 font-medium">Pending</td>
                                <td className="py-2">01/09/2025</td>
                            </tr>
                            <tr>
                                <td className="py-2">Portfolio Website</td>
                                <td className="py-2 text-red-600 font-medium">Closed</td>
                                <td className="py-2">30/08/2025</td>
                            </tr>
                        </tbody>
                    </table>
                </h2>
            </div>
        </div>
    );
}
