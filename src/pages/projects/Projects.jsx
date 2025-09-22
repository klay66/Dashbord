
import { Eye, Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from 'react-router-dom';

export default function Projects() {
    const [projects, setProjects] = useState([
        { id: 1, name: "Dashboard UI", description: "Admin dashboard for users and settings" },
        { id: 2, name: "E-Commerce", description: "Online shop with payment integration" },
    ]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editProject, setEditProject] = useState(null);
    const [form, setForm] = useState({ name: "", description: "" });

    const openModal = (project = null) => {
        setEditProject(project);
        setForm(project ? { name: project.name, description: project.description } : { name: "", description: "" });
        setModalOpen(true);
    };

    // حفظ مشروع جديد أو تعديل
    const handleSave = (e) => {
        e.preventDefault();
        if (!form.name.trim()) return;
        if (editProject) {
            setProjects(projects.map(p => p.id === editProject.id ? { ...p, ...form } : p));
        } else {
            setProjects([...projects, { id: Date.now(), ...form }]);
        }
        setModalOpen(false);
        setEditProject(null);
        setForm({ name: "", description: "" });
    };

    // حذف مشروع
    const handleDelete = (id) => {
        setProjects(projects.filter(p => p.id !== id));
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow w-full mt-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-blue-600">Projects</h2>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                    onClick={() => openModal()}
                >
                    Add Project
                </button>
            </div>

            <table className="w-full border-collapse rounded-lg overflow-hidden mb-6">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-3 border-b">Name</th>
                        <th className="p-3 border-b">Description</th>
                        <th className="p-3 border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.id} className="hover:bg-gray-50">
                            <td className="p-3 border-b font-semibold">{project.name}</td>
                            <td className="p-3 border-b text-gray-600">{project.description}</td>
                            <td className="p-3 border-b">
                                <span className="flex gap-2">
                                    <Link
                                        to='/products'
                                        className="text-blue-600 hover:underline cursor-pointer"
                                    >
                                        <Eye size={20} />
                                    </Link>
                                    <button
                                        className="text-blue-600 hover:underline cursor-pointer"
                                        onClick={() => openModal(project)}
                                    >
                                        <Pencil size={20} />
                                    </button>
                                    <button
                                        className="text-red-600 hover:underline cursor-pointer"
                                        onClick={() => handleDelete(project.id)}
                                    >
                                        <Trash2 size={20} />
                                    </button>

                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 bg-black/30 backdrop-blur-sm opacity-100 animate-fadeIn">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md transition-all duration-300 opacity-100 scale-100 animate-fadeInModal">
                        <h3 className="text-lg font-bold mb-4 text-blue-600">{editProject ? "Edit Project" : "Add Project"}</h3>
                        <form className="space-y-4" onSubmit={handleSave}>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Project Name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-0 focus:border-gray-300 transition"
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <textarea
                                    placeholder="Description"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-0 focus:border-gray-300 transition"
                                    value={form.description}
                                    onChange={e => setForm({ ...form, description: e.target.value })}
                                    rows={3}
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    onClick={() => { setModalOpen(false); setEditProject(null); }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
