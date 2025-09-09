import { useEffect, useState } from "react";
import api from "../api/axios"; // axios instance
import { Pencil, Trash2, UserPlus } from "lucide-react";
import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Select,
    SelectItem,
} from "@heroui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    // ✅ validation
    const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        role: Yup.string().required("Role is required"),
        status: Yup.string().required("Status is required"),
    });

    // ✅ جلب البيانات من API عند فتح الصفحة
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get("/users"); // Fake Store API
                const formattedUsers = res.data.map((u) => ({
                    id: u.id,
                    name: `${u.name.firstname} ${u.name.lastname}`,
                    email: u.email,
                    role: "User", // API مفيهوش role، فهنديله قيمة افتراضية
                    status: "Active", // مؤقت لحد ما الباك يجهز
                }));
                setUsers(formattedUsers);
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        };
        fetchUsers();
    }, []);

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
        <div className="bg-white p-6 rounded-xl shadow relative z-0">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-blue-600">Users</h2>
                <button onClick={handleAdd} className="text-blue-600 hover:text-blue-800">
                    <UserPlus size={30} className="cursor-pointer" />
                </button>
            </div>

            {/* جدول عرض المستخدمين */}
            <table className="w-full border-collapse rounded-lg overflow-hidden mb-6">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-3 border-b">Name</th>
                        <th className="p-3 border-b">Email</th>
                        <th className="p-3 border-b">Role</th>
                        <th className="p-3 border-b">Status</th>
                        <th className="p-3 border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="p-3 border-b">{user.name}</td>
                                <td className="p-3 border-b">{user.email}</td>
                                <td className="p-3 border-b">{user.role}</td>
                                <td className="p-3 border-b">
                                    <span
                                        className={`px-2 py-1 rounded text-sm ${user.status === "Active"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>
                                <td className="p-3 border-b">
                                    <span className="flex items-center gap-3">
                                        <Pencil
                                            className="cursor-pointer text-blue-600"
                                            onClick={() => handleEdit(user)}
                                        />
                                        <button
                                            type="button"
                                            className="text-red-600 cursor-pointer"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            <Trash2 />
                                        </button>
                                    </span>
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

            {/* المودال */}
            <Modal
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                placement="center"
                portal={true}
                classNames={{
                    backdrop: "bg-black/50 backdrop-blur-sm",
                }}
            >
                <ModalContent className="fixed z-[2000] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg p-4 w-full max-w-lg">
                    <ModalHeader className="text-blue-600 font-bold">
                        {isEditing ? "Edit User" : "Add User"}
                    </ModalHeader>

                    <Formik
                        enableReinitialize={true}
                        initialValues={
                            currentUser || { id: null, name: "", email: "", role: "", status: "Active" }
                        }
                        validationSchema={schema}
                        onSubmit={handleSave}
                    >
                        {({ values, setFieldValue }) => (
                            <Form>
                                <ModalBody>
                                    {/* Name */}
                                    <div className="mb-4 p-3 border border-gray-300 rounded-lg bg-white shadow-sm">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                            Name
                                        </label>
                                        <Field
                                            id="name"
                                            name="name"
                                            as={Input}
                                            variant="bordered"
                                            placeholder="Enter name"
                                            className="w-full"
                                        />
                                        <ErrorMessage name="name" component="p" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    {/* Email */}
                                    <div className="mb-4 p-3 border border-gray-300 rounded-lg bg-white shadow-sm">
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Email
                                        </label>
                                        <Field
                                            id="email"
                                            name="email"
                                            as={Input}
                                            type="email"
                                            variant="bordered"
                                            placeholder="Enter email"
                                            className="w-full"
                                        />
                                        <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    {/* Role */}
                                    <div className="mb-4 p-3 border border-gray-300 rounded-lg bg-white shadow-sm">
                                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                                            Role
                                        </label>
                                        <Field
                                            id="role"
                                            name="role"
                                            as={Input}
                                            variant="bordered"
                                            placeholder="Enter role"
                                            className="w-full"
                                        />
                                        <ErrorMessage name="role" component="p" className="text-red-500 text-sm mt-1" />
                                    </div>

                                    {/* Status */}
                                    <div className="mb-4 p-3 border border-gray-300 rounded-lg bg-white shadow-sm">
                                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                                            Status
                                        </label>
                                        <Select
                                            id="status"
                                            selectedKeys={[values.status]}
                                            onSelectionChange={(keys) => setFieldValue("status", Array.from(keys)[0])}
                                            variant="bordered"
                                            portal={false}
                                            classNames={{
                                                trigger: "border border-gray-300 bg-gray-50 shadow-sm rounded-lg w-full",
                                            }}
                                        >
                                            <SelectItem key="Active">Active</SelectItem>
                                            <SelectItem key="Inactive">Inactive</SelectItem>
                                        </Select>
                                        <ErrorMessage name="status" component="p" className="text-red-500 text-sm mt-1" />
                                    </div>
                                </ModalBody>

                                <ModalFooter className="flex justify-between">
                                    <Button
                                        variant="flat"
                                        onPress={() => setIsOpen(false)}
                                        className="bg-blue-600 p-2 rounded-lg text-amber-50"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className="bg-blue-600 p-2 rounded-lg text-amber-50"
                                        color="primary"
                                        type="submit"
                                    >
                                        {isEditing ? "Update" : "Add"}
                                    </Button>
                                </ModalFooter>
                            </Form>
                        )}
                    </Formik>
                </ModalContent>
            </Modal>
        </div>
    );
}
