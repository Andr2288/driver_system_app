import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Users, DollarSign, MapPin } from "lucide-react";
import { useRouteStore } from "../../store/useRouteStore.js";
import { useTripStore } from "../../store/useTripStore.js";

const CreateTrip = () => {
  const navigate = useNavigate();
  const { routes, fetchMyRoutes, isLoading: routesLoading } = useRouteStore();
  const { createTrip, isCreating } = useTripStore();

  const [formData, setFormData] = useState({
    routeId: "",
    departureDate: "",
    departureTime: "",
    availableSeats: "",
    pricePerSeat: "",
  });

  useEffect(() => {
    fetchMyRoutes();
  }, [fetchMyRoutes]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const departureDateTime = `${formData.departureDate}T${formData.departureTime}:00`;

    const data = {
      routeId: parseInt(formData.routeId),
      departureDateTime,
      availableSeats: parseInt(formData.availableSeats),
      pricePerSeat: parseFloat(formData.pricePerSeat),
    };

    try {
      await createTrip(data);
      navigate("/driver/dashboard");
    } catch (error) {
    }
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">

            <h2 className="card-title text-3xl font-bold mb-2">
              Створити рейс
            </h2>
            <p className="text-base-content/60 mb-6">
              Додайте новий рейс на одному з ваших маршрутів
            </p>

            {routesLoading ? (
              <div className="flex justify-center py-12">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : routes.length === 0 ? (
              <div className="alert alert-warning">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div>
                  <h3 className="font-bold">У вас немає маршрутів</h3>
                  <div className="text-xs">
                    Спочатку створіть маршрут, щоб додати рейс
                  </div>
                </div>
                <button
                  onClick={() => navigate("/driver/create-route")}
                  className="btn btn-sm btn-primary"
                >
                  Створити маршрут
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Маршрут <span className="text-error">*</span>
                    </span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 size-5 text-base-content/40 z-10" />
                    <select
                      className="select select-bordered w-full pl-10"
                      value={formData.routeId}
                      onChange={(e) =>
                        setFormData({ ...formData, routeId: e.target.value })
                      }
                      required
                    >
                      <option value="">Оберіть маршрут</option>
                      {routes.map((route) => (
                        <option key={route.id} value={route.id}>
                          {route.startPoint} → {route.endPoint}
                          {route.distance && ` (${route.distance} км)`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Дата відправлення <span className="text-error">*</span>
                    </span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3.5 size-5 text-base-content/40" />
                    <input
                      type="date"
                      className="input input-bordered w-full pl-10"
                      value={formData.departureDate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          departureDate: e.target.value,
                        })
                      }
                      min={getMinDate()}
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Час відправлення <span className="text-error">*</span>
                    </span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3.5 size-5 text-base-content/40" />
                    <input
                      type="time"
                      className="input input-bordered w-full pl-10"
                      value={formData.departureTime}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          departureTime: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Кількість місць <span className="text-error">*</span>
                    </span>
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3.5 size-5 text-base-content/40" />
                    <input
                      type="number"
                      min="1"
                      max="8"
                      placeholder="3"
                      className="input input-bordered w-full pl-10"
                      value={formData.availableSeats}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          availableSeats: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <label className="label">
                    <span className="label-text-alt text-base-content/60">
                      Від 1 до 8 місць
                    </span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Ціна за місце (грн) <span className="text-error">*</span>
                    </span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3.5 size-5 text-base-content/40" />
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="350.00"
                      className="input input-bordered w-full pl-10"
                      value={formData.pricePerSeat}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pricePerSeat: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => navigate("/driver/dashboard")}
                    className="btn btn-ghost flex-1"
                  >
                    Скасувати
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success flex-1"
                    disabled={isCreating}
                  >
                    {isCreating ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Створити рейс"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
