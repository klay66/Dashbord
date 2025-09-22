import { useState } from "react";

export default function Login({ onLogin, goToSignup }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email.trim() || !password.trim()) {
            setError("Please fill in both fields");
            return;
        }

        setLoading(true);

        try {
            // TODO: Replace with actual API call
            // const response = await api.post("/login", { email, password });
            // const token = response.data.token;
            // localStorage.setItem("authToken", token);

            // Simulate API call for now
            await new Promise(resolve => setTimeout(resolve, 1000));

            // For now, just proceed with login
            localStorage.setItem("loggedIn", "true");
            onLogin();

        } catch (err) {
            setError(err?.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm bg-white shadow-lg rounded-2xl border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                    Login
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-600 text-white py-2 rounded-lg font-semibold hover:bg-brand-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Logging in...
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>


                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Login
                </button>

                <p className="text-sm text-center text-gray-600 mt-4">
                    Don’t have an account?{" "}
                    <button
                        type="button"
                        onClick={goToSignup}
                        className="text-brand-600 hover:underline font-medium"
                    >
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    );
}
