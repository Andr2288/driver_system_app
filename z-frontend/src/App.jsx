import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

import { useAuthStore } from "./store/useAuthStore.js";

const App = () => {
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            <Navbar />

            <Routes>
                {/* Public routes */}
                <Route
                    path="/signup"
                    element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
                />
                <Route
                    path="/login"
                    element={!authUser ? <LoginPage /> : <Navigate to="/" />}
                />

                {/* Home route - redirect based on auth */}
                <Route
                    path="/"
                    element={
                        authUser ? (
                            <div className="flex items-center justify-center h-screen">
                                <h1 className="text-4xl font-bold">
                                    Вітаємо, {authUser.name}! 👋
                                </h1>
                            </div>
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                {/* TODO: Driver routes - будемо додавати далі */}
                {/* TODO: Passenger routes - будемо додавати далі */}

                {/* 404 */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>

            <Toaster position="top-center" />
        </div>
    );
};

export default App;