import { useEffect, useState } from "react";
import api from "../api/axios";
import { Pencil, Trash2, UserPlus, Search, Filter, Download, Eye } from "lucide-react";
import Loading from './../components/Loading';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    // ✅ جلب البيانات من API عند فتح الصفحة
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const res = await api.get("/users");
                const formattedUsers = res.data.map((u) => ({
                    id: u.id,
                    name: `${u.name.firstname} ${u.name.lastname}`,
                    email: u.email,
                    role: "User",
                    status: "Active",
                }));
                setUsers(formattedUsers);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching users:", err);
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // ✅ البحث والتصفية
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ✅ Delete
    const handleDelete = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    // ✅ Add
    const handleAdd = () => {
        setCurrentUser(null);
        setIsEditing(false);
        setIsOpen(true);
    };

    // ✅ Edit
    const handleEdit = (user) => {
        setCurrentUser(user);
        setIsEditing(true);
        setIsOpen(true);
    };

    // ✅ Save (Add / Update)
    const handleSave = (values) => {
        if (isEditing) {
            setUsers(users.map((u) => (u.id === values.id ? values : u)));
        } else {
            setUsers([...users, { ...values, id: Date.now() }]);
        }
        setIsOpen(false);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-blue-600">Users Management</h2>
                    <p className="text-gray-600">Manage your system users and permissions</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <UserPlus size={20} />
                    Add User
                </button>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white p-4 rounded-xl shadow mb-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search users by name or email..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                            <Filter size={18} />
                            Filter
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                            <Download size={18} />
                            Export
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white p-6 rounded-xl shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500">Total Users</p>
                            <h2 className="text-2xl font-bold mt-1">{users.length}</h2>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <UserPlus className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500">Active Users</p>
                            <h2 className="text-2xl font-bold mt-1">{users.filter(u => u.status === "Active").length}</h2>
                        </div>
                        <div className="bg-green-100 p-3 rounded-lg">
                            <Eye className="text-green-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500">Admins</p>
                            <h2 className="text-2xl font-bold mt-1">{users.filter(u => u.role === "Admin").length}</h2>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-lg">
                            <UserPlus className="text-purple-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-500">Inactive</p>
                            <h2 className="text-2xl font-bold mt-1">{users.filter(u => u.status === "Inactive").length}</h2>
                        </div>
                        <div className="bg-red-100 p-3 rounded-lg">
                            <Eye className="text-red-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-lg font-bold text-blue-600 mb-4">Users List</h3>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-3 border-b font-medium text-gray-700">Name</th>
                                <th className="p-3 border-b font-medium text-gray-700">Email</th>
                                <th className="p-3 border-b font-medium text-gray-700">Role</th>
                                <th className="p-3 border-b font-medium text-gray-700">Status</th>
                                <th className="p-3 border-b font-medium text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="p-6 text-center">
                                        <Loading />
                                    </td>
                                </tr>
                            ) : filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="p-3 border-b font-medium">{user.name}</td>
                                        <td className="p-3 border-b text-gray-600">{user.email}</td>
                                        <td className="p-3 border-b">
                                            <span className={`px-2 py-1 rounded text-sm ${user.role === "Admin"
                                                ? "bg-purple-100 text-purple-700"
                                                : "bg-blue-100 text-blue-700"
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-3 border-b">
                                            <span className={`px-2 py-1 rounded text-sm ${user.status === "Active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="p-3 border-b">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => handleEdit(user)}
                                                    className="text-blue-600 hover:text-blue-800 transition"
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="text-red-600 hover:text-red-800 transition"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center p-4 text-gray-500">
                                        No users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal لإضافة/تعديل المستخدم */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 bg-black/30 backdrop-blur-sm opacity-100 animate-fadeIn">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
                        <div className="p-6 border-b">
                            <h3 className="text-lg font-bold text-blue-600">
                                {isEditing ? "Edit User" : "Add User"}
                            </h3>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="Enter name"
                                    value={currentUser?.name || ""}
                                    onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="Enter email"
                                    value={currentUser?.email || ""}
                                    onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    value={currentUser?.role || ""}
                                    onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
                                >
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    value={currentUser?.status || "Active"}
                                    onChange={(e) => setCurrentUser({ ...currentUser, status: e.target.value })}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        <div className="p-6 border-t flex justify-end gap-3">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleSave(currentUser)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                {isEditing ? "Update" : "Add"} User
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}