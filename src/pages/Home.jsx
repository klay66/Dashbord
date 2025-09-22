import {
    TrendingUp,
    Users,
    FolderKanban,
    BarChart2,
    Target,
    ChevronDown,
    ArrowUpRight,
    Eye,
    MoreHorizontal,
    Filter,
    Download
} from "lucide-react";

export default function Home() {
    return (
        <div className="p-6 bg-gray-100 min-h-screen space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-blue-600">Home</h2>
                    <p className="text-gray-600">Welcome to the dashboard homepage!</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50">
                        <Filter size={18} />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <Download size={18} />
                        Export
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500">Users</p>
                            <h2 className="text-2xl font-bold mt-1">120</h2>
                            <div className="flex items-center mt-2 text-sm text-green-500">
                                <TrendingUp size={14} className="mr-1" />
                                <span>+12% this week</span>
                            </div>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <Users className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500">Projects</p>
                            <h2 className="text-2xl font-bold mt-1">45</h2>
                            <div className="flex items-center mt-2 text-sm text-green-500">
                                <TrendingUp size={14} className="mr-1" />
                                <span>+5% this week</span>
                            </div>
                        </div>
                        <div className="bg-green-100 p-3 rounded-lg">
                            <FolderKanban className="text-green-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500">Revenue</p>
                            <h2 className="text-2xl font-bold mt-1">$5,000</h2>
                            <div className="flex items-center mt-2 text-sm text-green-500">
                                <TrendingUp size={14} className="mr-1" />
                                <span>+8.2% this week</span>
                            </div>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-lg">
                            <BarChart2 className="text-purple-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500">Conversion Rate</p>
                            <h2 className="text-2xl font-bold mt-1">4.5%</h2>
                            <div className="flex items-center mt-2 text-sm text-red-500">
                                <TrendingUp size={14} className="mr-1" style={{ transform: 'rotate(45deg)' }} />
                                <span>-1.2% this week</span>
                            </div>
                        </div>
                        <div className="bg-orange-100 p-3 rounded-lg">
                            <Target className="text-orange-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts and Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Activities Overview */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-blue-600">Activities Overview</h2>
                        <div className="flex items-center text-sm text-gray-500">
                            <span className="mr-2">This week</span>
                            <ChevronDown size={16} />
                        </div>
                    </div>
                    <div className="h-52 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
                        <div className="text-center text-gray-500">
                            <BarChart2 size={32} className="mx-auto mb-2 text-blue-400" />
                            <p>Interactive chart coming soon</p>
                        </div>
                    </div>
                </div>

                {/* Recent Projects */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-blue-600">Recent Projects</h2>
                        <button className="text-sm text-blue-600 flex items-center">
                            View all <ArrowUpRight size={16} className="ml-1" />
                        </button>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <div>
                                <h3 className="font-medium">Dashboard App</h3>
                                <p className="text-sm text-gray-500">Updated 2 hours ago</p>
                            </div>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg">
                            <div>
                                <h3 className="font-medium">E-commerce Platform</h3>
                                <p className="text-sm text-gray-500">Updated yesterday</p>
                            </div>
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Pending</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg">
                            <div>
                                <h3 className="font-medium">Portfolio Website</h3>
                                <p className="text-sm text-gray-500">Updated 2 days ago</p>
                            </div>
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Closed</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white p-6 rounded-xl shadow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-blue-600">Recent Activity</h2>
                    <MoreHorizontal size={20} className="text-gray-400" />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="py-3 font-medium text-gray-700">Name</th>
                                <th className="py-3 font-medium text-gray-700">Status</th>
                                <th className="py-3 font-medium text-gray-700">Date</th>
                                <th className="py-3 font-medium text-gray-700">Views</th>
                                <th className="py-3 font-medium text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b hover:bg-gray-50">
                                <td className="py-3 font-medium">Dashboard App</td>
                                <td className="py-3">
                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                                </td>
                                <td className="py-3">02/09/2025</td>
                                <td className="py-3">
                                    <div className="flex items-center">
                                        <Eye size={14} className="mr-1 text-gray-500" />
                                        <span>1.2K</span>
                                    </div>
                                </td>
                                <td className="py-3">
                                    <button className="text-blue-600 text-sm font-medium">View</button>
                                </td>
                            </tr>
                            <tr className="border-b hover:bg-gray-50">
                                <td className="py-3 font-medium">E-commerce Platform</td>
                                <td className="py-3">
                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Pending</span>
                                </td>
                                <td className="py-3">01/09/2025</td>
                                <td className="py-3">
                                    <div className="flex items-center">
                                        <Eye size={14} className="mr-1 text-gray-500" />
                                        <span>892</span>
                                    </div>
                                </td>
                                <td className="py-3">
                                    <button className="text-blue-600 text-sm font-medium">View</button>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="py-3 font-medium">Portfolio Website</td>
                                <td className="py-3">
                                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Closed</span>
                                </td>
                                <td className="py-3">30/08/2025</td>
                                <td className="py-3">
                                    <div className="flex items-center">
                                        <Eye size={14} className="mr-1 text-gray-500" />
                                        <span>2.4K</span>
                                    </div>
                                </td>
                                <td className="py-3">
                                    <button className="text-blue-600 text-sm font-medium">View</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}