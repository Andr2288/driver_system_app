import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { login, isLoggingIn } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    {/* Header */}
                    <h2 className="card-title text-3xl font-bold text-center justify-center mb-2">
                        Вхід
                    </h2>
                    <p className="text-center text-base-content/60 mb-6">
                        Введіть свої дані для входу
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 size-5 text-base-content/40" />
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="input input-bordered w-full pl-10"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Пароль</span>
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 size-5 text-base-content/40" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="input input-bordered w-full pl-10 pr-10"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-3.5"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-5 text-base-content/40" />
                                    ) : (
                                        <Eye className="size-5 text-base-content/40" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={isLoggingIn}
                        >
                            {isLoggingIn ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                "Увійти"
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="divider">АБО</div>

                    {/* Sign Up Link */}
                    <p className="text-center text-base-content/60">
                        Немає акаунту?{" "}
                        <Link to="/signup" className="link link-primary font-medium">
                            Зареєструватися
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;