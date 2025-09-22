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
import Projects from "./pages/projects/Projects";
import Products from "./pages/projects/products/Products";
import ProductDetails from "./pages/projects/products/ProductDetails";
import GeneralSettings from "./pages/settings/GeneralSettings";
import Currency from "./pages/settings/Currency";
import ProductDetailsSettings from "./pages/settings/ProductDetails";
import Reports from "./pages/Reports";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem("loggedIn") === "true");
  const [authPage, setAuthPage] = useState("login"); // login or signup

  if (!loggedIn) {
    return (
      <HeroUIProvider>
        {authPage === "login" ? (
          <Login
            onLogin={() => {
              setLoggedIn(true);
              localStorage.setItem("loggedIn", "true");
            }}
            goToSignup={() => setAuthPage("signup")}
          />
        ) : (
          <Signup
            onSignup={() => {
              setLoggedIn(true);
              localStorage.setItem("loggedIn", "true");
            }}
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
            <Navbar onLogout={() => {
              setLoggedIn(false);
              localStorage.removeItem("loggedIn");
            }} />
            <div className="p-6 flex-1 bg-gray-100 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/settings/general-settings" element={<GeneralSettings />} />
                <Route path="/settings/product-details" element={<ProductDetailsSettings />} />
                <Route path="/settings/currency" element={<Currency />} />
                <Route path="/reports" element={<Reports />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </HeroUIProvider>
  );
}
