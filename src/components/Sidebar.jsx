import { Home, BarChart2, Settings } from "lucide-react";
import { Link } from "react-router-dom";

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
                    to="/reports"
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-100"
                >
                    <BarChart2 size={20} />
                    <span>Reports</span>
                </Link>
                <Link
                    to="/settings"
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-100"
                >
                    <Settings size={20} />
                    <span>Settings</span>
                </Link>
            </nav>

            <div className="text-sm text-gray-400 mt-4">© 2025 MyApp</div>
        </div>
    );
}
