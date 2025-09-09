export default function Navbar() {
    return (
        <div className="h-14 bg-white shadow flex items-center justify-between px-6">
            <h1 className="text-lg font-semibold">Dashboard</h1>
            <div className="flex items-center gap-4">
                <span className="text-gray-600">Welcome to the Dashboard</span>
                <img
                    src="https://i.pravatar.cc/40"
                    alt="User"
                    className="w-10 h-10 rounded-full"
                />
            </div>
        </div>
    );
}
