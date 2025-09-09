import { Home, Users, Settings, PanelsTopLeft } from "lucide-react";
import { Link } from "react-router-dom";
// import logo from "../image/logo.png";
export default function Sidebar() {
    return (
        <div className="h-screen w-64 bg-white shadow-lg flex flex-col p-4">
            <div className="text-2xl font-bold text-blue-600 mb-8">My Dashboard</div>

            <nav className="flex flex-col gap-2 flex-1">
                <Link
                    to="/"
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-100"
                >
                    <Home size={20} />
                    <span>Home</span>
                </Link>
                <Link
                    to="/users"
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-100"
                >
                    <Users size={20} />
                    <span>Users</span>
                </Link>
                <Link
                    to="/settings"
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-100"
                >
                    <Settings size={20} />
                    <span>Settings</span>
                </Link>
                <Link
                    to="/projects"
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-100"
                >
                    <PanelsTopLeft size={20} />
                    <span>Projects</span>
                </Link>
            </nav>

            <div className="text-sm text-gray-400 mt-4">© 2025 MyApp-Nour Ali</div>
        </div>
    );
}
