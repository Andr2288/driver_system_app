import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, MapPin, Calendar, Users, DollarSign, Trash2, Edit } from "lucide-react";
import { useRouteStore } from "../../store/useRouteStore";
import { useTripStore } from "../../store/useTripStore";
import { useAuthStore } from "../../store/useAuthStore";

const DriverDashboard = () => {
    const navigate = useNavigate();
    const { authUser } = useAuthStore();
    const { routes, isLoading: routesLoading, fetchMyRoutes, deleteRoute } = useRouteStore();
    const { myTrips, isLoading: tripsLoading, fetchMyTrips, deleteTrip } = useTripStore();

    const [activeTab, setActiveTab] = useState("routes");

    useEffect(() => {
        fetchMyRoutes();
        fetchMyTrips();
    }, [fetchMyRoutes, fetchMyTrips]);

    const handleDeleteRoute = async (id) => {
        if (window.confirm("Ви впевнені, що хочете видалити цей маршрут?")) {
            await deleteRoute(id);
        }
    };

    const handleDeleteTrip = async (id) => {
        if (window.confirm("Ви впевнені, що хочете видалити цей рейс?")) {
            await deleteTrip(id);
        }
    };

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleString("uk-UA", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getStatusBadge = (status) => {
        const badges = {
            PLANNED: "badge-info",
            ACTIVE: "badge-success",
            COMPLETED: "badge-neutral",
            CANCELLED: "badge-error",
        };
        return badges[status] || "badge-ghost";
    };

    const getStatusText = (status) => {
        const texts = {
            PLANNED: "Заплановано",
            ACTIVE: "Активний",
            COMPLETED: "Завершено",
            CANCELLED: "Скасовано",
        };
        return texts[status] || status;
    };

    return (
        <div className="min-h-screen bg-base-200 py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Панель водія</h1>
                        <p className="text-base-content/60 mt-1">
                            Вітаємо, {authUser?.name}! 🚗
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => navigate("/driver/create-route")}
                            className="btn btn-primary"
                        >
                            <Plus className="size-5" />
                            Створити маршрут
                        </button>
                        <button
                            onClick={() => navigate("/driver/create-trip")}
                            className="btn btn-success"
                        >
                            <Plus className="size-5" />
                            Створити рейс
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    <div className="stats shadow">
                        <div className="stat">
                            <div className="stat-title">Мої маршрути</div>
                            <div className="stat-value text-primary">{routes.length}</div>
                        </div>
                    </div>
                    <div className="stats shadow">
                        <div className="stat">
                            <div className="stat-title">Мої рейси</div>
                            <div className="stat-value text-success">{myTrips.length}</div>
                        </div>
                    </div>
                    <div className="stats shadow">
                        <div className="stat">
                            <div className="stat-title">Заплановані</div>
                            <div className="stat-value text-info">
                                {myTrips.filter((t) => t.status === "PLANNED").length}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="tabs tabs-boxed mb-6">
                    <button
                        className={`tab ${activeTab === "routes" ? "tab-active" : ""}`}
                        onClick={() => setActiveTab("routes")}
                    >
                        <MapPin className="size-4 mr-2" />
                        Маршрути ({routes.length})
                    </button>
                    <button
                        className={`tab ${activeTab === "trips" ? "tab-active" : ""}`}
                        onClick={() => setActiveTab("trips")}
                    >
                        <Calendar className="size-4 mr-2" />
                        Рейси ({myTrips.length})
                    </button>
                </div>

                {/* Content */}
                {activeTab === "routes" && (
                    <div className="space-y-4">
                        {routesLoading ? (
                            <div className="flex justify-center py-12">
                                <span className="loading loading-spinner loading-lg"></span>
                            </div>
                        ) : routes.length === 0 ? (
                            <div className="card bg-base-100 shadow-lg">
                                <div className="card-body text-center">
                                    <p className="text-base-content/60">
                                        У вас ще немає маршрутів
                                    </p>
                                    <button
                                        onClick={() => navigate("/driver/create-route")}
                                        className="btn btn-primary mt-4"
                                    >
                                        Створити перший маршрут
                                    </button>
                                </div>
                            </div>
                        ) : (
                            routes.map((route) => (
                                <div key={route.id} className="card bg-base-100 shadow-lg">
                                    <div className="card-body">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h3 className="card-title text-xl">
                                                    {route.startPoint} → {route.endPoint}
                                                </h3>
                                                <div className="flex flex-wrap gap-4 mt-4 text-sm text-base-content/60">
                                                    {route.distance && (
                                                        <div className="flex items-center gap-1">
                                                            <MapPin className="size-4" />
                                                            <span>{route.distance} км</span>
                                                        </div>
                                                    )}
                                                    {route.estimatedDuration && (
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="size-4" />
                                                            <span>{route.estimatedDuration} хв</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteRoute(route.id)}
                                                className="btn btn-ghost btn-sm text-error"
                                            >
                                                <Trash2 className="size-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === "trips" && (
                    <div className="space-y-4">
                        {tripsLoading ? (
                            <div className="flex justify-center py-12">
                                <span className="loading loading-spinner loading-lg"></span>
                            </div>
                        ) : myTrips.length === 0 ? (
                            <div className="card bg-base-100 shadow-lg">
                                <div className="card-body text-center">
                                    <p className="text-base-content/60">У вас ще немає рейсів</p>
                                    <button
                                        onClick={() => navigate("/driver/create-trip")}
                                        className="btn btn-success mt-4"
                                    >
                                        Створити перший рейс
                                    </button>
                                </div>
                            </div>
                        ) : (
                            myTrips.map((trip) => (
                                <div key={trip.id} className="card bg-base-100 shadow-lg">
                                    <div className="card-body">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="card-title text-xl">
                                                        {trip.startPoint} → {trip.endPoint}
                                                    </h3>
                                                    <span className={`badge ${getStatusBadge(trip.status)}`}>
                            {getStatusText(trip.status)}
                          </span>
                                                </div>

                                                <div className="flex flex-wrap gap-4 mt-4 text-sm">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="size-4 text-base-content/60" />
                                                        <span>{formatDateTime(trip.departureDateTime)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Users className="size-4 text-base-content/60" />
                                                        <span>{trip.availableSeats} місць</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <DollarSign className="size-4 text-base-content/60" />
                                                        <span>{trip.pricePerSeat} грн/місце</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                {trip.status === "PLANNED" && (
                                                    <button
                                                        onClick={() => navigate(`/driver/edit-trip/${trip.id}`)}
                                                        className="btn btn-ghost btn-sm"
                                                    >
                                                        <Edit className="size-4" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDeleteTrip(trip.id)}
                                                    className="btn btn-ghost btn-sm text-error"
                                                >
                                                    <Trash2 className="size-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DriverDashboard;