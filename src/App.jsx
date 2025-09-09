import { useState } from "react";
import { HeroUIProvider } from "@heroui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Projects from "./pages/Projects";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authPage, setAuthPage] = useState("login"); // login or signup

  if (!loggedIn) {
    return (
      <HeroUIProvider>
        {authPage === "login" ? (
          <Login
            onLogin={() => setLoggedIn(true)}
            goToSignup={() => setAuthPage("signup")}
          />
        ) : (
          <Signup
            onSignup={() => setLoggedIn(true)}
            goToLogin={() => setAuthPage("login")}
          />
        )}
      </HeroUIProvider>
    );
  }

  return (
    <HeroUIProvider>
      <Router>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <div className="p-6 flex-1 bg-gray-100 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/projects" element={<Projects />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </HeroUIProvider>
  );
}
