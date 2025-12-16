import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "PASSENGER", // За замовчуванням попутник
    });

    const { signup, isSigningUp } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 py-8">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    {/* Header */}
                    <h2 className="card-title text-3xl font-bold text-center justify-center mb-2">
                        Реєстрація
                    </h2>
                    <p className="text-center text-base-content/60 mb-6">
                        Створіть новий акаунт
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Role Selection */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Я хочу бути</span>
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    className={`btn ${
                                        formData.role === "PASSENGER"
                                            ? "btn-primary"
                                            : "btn-outline"
                                    }`}
                                    onClick={() => setFormData({ ...formData, role: "PASSENGER" })}
                                >
                                    🧍 Попутник
                                </button>
                                <button
                                    type="button"
                                    className={`btn ${
                                        formData.role === "DRIVER" ? "btn-primary" : "btn-outline"
                                    }`}
                                    onClick={() => setFormData({ ...formData, role: "DRIVER" })}
                                >
                                    🚗 Водій
                                </button>
                            </div>
                        </div>

                        {/* Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Ім'я</span>
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-3.5 size-5 text-base-content/40" />
                                <input
                                    type="text"
                                    placeholder="Іван"
                                    className="input input-bordered w-full pl-10"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    required
                                    minLength={2}
                                    maxLength={50}
                                />
                            </div>
                        </div>

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

                        {/* Phone */}
                        <div className="form-control">
                            <label className="label">
                <span className="label-text font-medium">
                  Телефон <span className="text-xs text-base-content/60">(опціонально)</span>
                </span>
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3.5 size-5 text-base-content/40" />
                                <input
                                    type="tel"
                                    placeholder="+380501234567"
                                    className="input input-bordered w-full pl-10"
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData({ ...formData, phone: e.target.value })
                                    }
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
                                    minLength={6}
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
                            <label className="label">
                <span className="label-text-alt text-base-content/60">
                  Мінімум 6 символів
                </span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={isSigningUp}
                        >
                            {isSigningUp ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                "Зареєструватися"
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="divider">АБО</div>

                    {/* Login Link */}
                    <p className="text-center text-base-content/60">
                        Вже є акаунт?{" "}
                        <Link to="/login" className="link link-primary font-medium">
                            Увійти
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;