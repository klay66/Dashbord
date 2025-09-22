import React, { useState } from "react"
export default function Settings() {
    const [profile, setProfile] = useState({
        name: "Omar Khaled",
        email: "omar@example.com",
        language: "en",
        darkMode: false,
    });

    // تفعيل الوضع الليلي فعلياً
    React.useEffect(() => {
        // الوضع الليلي ملغي
    }, [profile.darkMode]);
    const [password, setPassword] = useState("");

    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow mt-8 text-gray-900">
            <h2 className="text-xl font-bold text-blue-600 mb-6">Settings</h2>

            {/* تعديل بيانات الحساب */}
            <div className="mb-6">
                <h3 className="font-semibold mb-2">Profile</h3>
                <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    placeholder="Name"
                    className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                />
                <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    placeholder="Email"
                    className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                />
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
            </div>

            {/* تغيير كلمة المرور */}
            <div className="mb-6">
                <h3 className="font-semibold mb-2">Change Password</h3>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="New Password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                />
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Change Password</button>
            </div>

            {/* اختيار اللغة */}
            <div className="mb-6">
                <h3 className="font-semibold mb-2">Language</h3>
                <select
                    name="language"
                    value={profile.language}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
                >
                    <option value="en">English</option>
                    <option value="ar">Arabic</option>
                </select>
            </div>

            {/* الوضع الليلي/النهاري */}
            <div className="mb-2 flex items-center justify-between">
                <span className="font-semibold">Dark Mode</span>
                <label className="flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={profile.darkMode}
                        onChange={e => setProfile({ ...profile, darkMode: e.target.checked })}
                        className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2">{profile.darkMode ? "On" : "Off"}</span>
                </label>
            </div>
        </div>
    );
}
