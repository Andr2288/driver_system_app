import { Link } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
    const { authUser, logout } = useAuthStore();

    return (
        <div className="navbar bg-base-100 shadow-lg">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">
                    🚗 Carpooling
                </Link>
            </div>

            <div className="flex-none gap-2">
                {authUser ? (
                    <>
                        {/* User info */}
                        <div className="flex items-center gap-2 mr-4">
                            <User className="size-5" />
                            <span className="font-medium">{authUser.name}</span>
                            <span className="badge badge-primary badge-sm">
                {authUser.role === "DRIVER" ? "Водій" : "Попутник"}
              </span>
                        </div>

                        {/* Logout button */}
                        <button onClick={logout} className="btn btn-ghost btn-circle">
                            <LogOut className="size-5" />
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-ghost">
                            Вхід
                        </Link>
                        <Link to="/signup" className="btn btn-primary">
                            Реєстрація
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;