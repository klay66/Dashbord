import { Home, Users, Settings, PanelsTopLeft, Atom, ChevronDown, ChevronUp, BarChart2, Menu, X, ArrowBigLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Sidebar() {
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();

    // روابط الإعدادات الفرعية
    const settingsLinks = [
        { to: "/settings/general-settings", label: "General Settings", icon: <Settings size={16} /> },
        { to: "/settings/product-details", label: "Product Details", icon: <PanelsTopLeft size={16} /> },
        { to: "/settings/currency", label: "Currency", icon: <BarChart2 size={16} /> },
    ];

    // التحقق إذا كان المسار الحالي هو أحد إعدادات القائمة الفرعية
    const isSettingsActive = settingsLinks.some(link => location.pathname === link.to);

    // تحديد إذا كان الجهاز موبايل
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    // إغلاق السايدبار على الموبايل عند تغيير المسار
    useEffect(() => {
        if (isMobile) {
            setIsMobileOpen(false);
        }
    }, [location, isMobile]);

    const toggleSidebar = () => {
        if (isMobile) {
            setIsMobileOpen(!isMobileOpen);
        } else {
            setIsSidebarCollapsed(!isSidebarCollapsed);
        }
    };

    const closeMobileSidebar = () => {
        if (isMobile) {
            setIsMobileOpen(false);
        }
    };

    return (
        <>
            {/* زر القائمة للموبايل */}
            {isMobile && (
                <button
                    onClick={toggleSidebar}
                    className="fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg md:hidden"
                >
                    {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            )}

            {/* overlay للموبايل */}
            {isMobile && isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={closeMobileSidebar}
                />
            )}

            {/* السايدبار */}
            <div className={`
                h-screen bg-white shadow-lg flex flex-col transition-all duration-300
                fixed md:relative z-40
                ${isMobile ? (isMobileOpen ? "left-0" : "-left-64") : ""}
                ${isSidebarCollapsed ? "w-20" : "w-64"}
            `}>
                {/* الهيدر وزر الإغلاق */}
                <div className="flex justify-between items-center p-4 border-b">
                    {!isSidebarCollapsed && (
                        <div className="text-xl font-bold text-blue-600">My Dashboard</div>
                    )}
                    {!isMobile && (
                        <button
                            onClick={toggleSidebar}
                            className="p-1 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100"
                        >
                            {isSidebarCollapsed ? <Menu size={20} className="text-blue-600" /> : <ArrowBigLeft size={20} className="text-blue-600" />}
                        </button>
                    )}
                </div>

                <nav className="flex flex-col gap-2 flex-1 p-2 overflow-y-auto">
                    {/* عنصر الصفحة الرئيسية */}
                    <Link
                        to="/"
                        className={`flex items-center gap-3 p-3 rounded-md transition group
                            ${location.pathname === "/" ? "bg-blue-100 text-blue-700 font-semibold" : "hover:bg-blue-100"}
                            ${isSidebarCollapsed ? "justify-center" : ""}
                        `}
                        title="Home"
                        onClick={closeMobileSidebar}
                    >
                        <Home className="text-blue-600" size={20} />
                        {!isSidebarCollapsed && <span>Home</span>}
                    </Link>

                    {/* عنصر المستخدمين */}
                    <Link
                        to="/users"
                        className={`flex items-center gap-3 p-3 rounded-md transition group
                            ${location.pathname === "/users" ? "bg-blue-100 text-blue-700 font-semibold" : "hover:bg-blue-100"}
                            ${isSidebarCollapsed ? "justify-center" : ""}
                        `}
                        title="Users"
                        onClick={closeMobileSidebar}
                    >
                        <Users className="text-blue-600" size={20} />
                        {!isSidebarCollapsed && <span>Users</span>}
                    </Link>


                    {/* عنصر المشاريع */}
                    <Link
                        to="/projects"
                        className={`flex items-center gap-3 p-3 rounded-md transition group
                            ${location.pathname === "/projects" ? "bg-blue-100 text-blue-700 font-semibold" : "hover:bg-blue-100"}
                            ${isSidebarCollapsed ? "justify-center" : ""}
                        `}
                        title="Projects"
                        onClick={closeMobileSidebar}
                    >
                        <Atom className="text-blue-600" size={20} />
                        {!isSidebarCollapsed && <span>Projects</span>}
                    </Link>

                    {/* قائمة الإعدادات مع القائمة الفرعية */}
                    <div className="mb-2">
                        <div
                            onClick={() => setShowSettingsMenu((prev) => !prev)}
                            className={`flex items-center justify-between w-full p-3 rounded-md transition cursor-pointer
                                ${(isSettingsActive || location.pathname.startsWith("/settings")) ? "bg-blue-100 text-blue-700 font-semibold" : "hover:bg-blue-100"}
                                ${isSidebarCollapsed ? "justify-center" : ""}
                            `}
                            title="Settings"
                        >
                            <div className="flex items-center gap-3">
                                <Settings className="text-blue-600" size={20} />
                                {!isSidebarCollapsed && <span>Settings</span>}
                            </div>
                            {!isSidebarCollapsed && (showSettingsMenu ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                        </div>

                        {/* القائمة الفرعية للإعدادات - تظهر في جميع الأحوال */}
                        <div className={`ml-6 transition-all duration-300 ${showSettingsMenu ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
                            {settingsLinks.map((link) => {
                                const isActive = location.pathname === link.to;
                                return (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        className={`flex items-center gap-2 mt-2 pl-2 pr-3 py-2 rounded-md text-sm transition
                                            ${isActive ? "bg-blue-600 text-white font-semibold" : "text-gray-600 hover:bg-blue-100"}
                                        `}
                                        onClick={closeMobileSidebar}
                                    >
                                        {link.icon}
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* عنصر التقارير */}
                    <Link
                        to="/reports"
                        className={`flex items-center gap-3 p-3 rounded-md transition group
                            ${location.pathname === "/reports" ? "bg-blue-100 text-blue-700 font-semibold" : "hover:bg-blue-100"}
                            ${isSidebarCollapsed ? "justify-center" : ""}
                        `}
                        title="Reports"
                        onClick={closeMobileSidebar}
                    >
                        <BarChart2 className="text-blue-600" size={20} />
                        {!isSidebarCollapsed && <span>Reports</span>}
                    </Link>
                </nav>

                {/* الفوتر */}
                {!isSidebarCollapsed && (
                    <div className="text-sm text-gray-400 p-4 text-center">© 2025 MyApp-Nour Ali</div>
                )}
            </div>
        </>
    );
}