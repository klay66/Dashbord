export default function Navbar({ onLogout }) {
    return (
        <div className="h-14 bg-white shadow flex items-center justify-between px-6">
            <h1 className="text-lg font-semibold text-blue-600">Dashboard</h1>
            <div className="flex items-center gap-4">
                <button
                    onClick={onLogout}
                    className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 cursor-pointer text-sm"
                >
                    Logout
                </button>
                <img
                    src="https://i.pravatar.cc/40"
                    alt="User"
                    className="w-10 h-10 rounded-full"
                />

            </div>
        </div>
    );
}
