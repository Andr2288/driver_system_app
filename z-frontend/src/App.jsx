import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

import DriverDashboard from "./pages/driver/DriverDashboard.jsx";
import CreateRoute from "./pages/driver/CreateRoute.jsx";
import CreateTrip from "./pages/driver/CreateTrip.jsx";
import EditTrip from "./pages/driver/EditTrip.jsx";

import PassengerDashboard from "./pages/passenger/PassengerDashboard.jsx";

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
                <Route
                    path="/signup"
                    element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
                />
                <Route
                    path="/login"
                    element={!authUser ? <LoginPage /> : <Navigate to="/" />}
                />

                <Route
                    path="/"
                    element={
                        authUser ? (
                            authUser.role === "DRIVER" ? (
                                <Navigate to="/driver/dashboard" />
                            ) : (
                                <Navigate to="/passenger/dashboard" />
                            )
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                <Route
                    path="/driver/dashboard"
                    element={
                        <ProtectedRoute allowedRoles={["DRIVER"]}>
                            <DriverDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/driver/create-route"
                    element={
                        <ProtectedRoute allowedRoles={["DRIVER"]}>
                            <CreateRoute />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/driver/create-trip"
                    element={
                        <ProtectedRoute allowedRoles={["DRIVER"]}>
                            <CreateTrip />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/driver/edit-trip/:id"
                    element={
                        <ProtectedRoute allowedRoles={["DRIVER"]}>
                            <EditTrip />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/passenger/dashboard"
                    element={
                        <ProtectedRoute allowedRoles={["PASSENGER"]}>
                            <PassengerDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>

            <Toaster position="top-center" />
        </div>
    );
};

export default App;