import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, Users, DollarSign, MapPin } from "lucide-react";
import { useRouteStore } from "../../store/useRouteStore";
import { useTripStore } from "../../store/useTripStore";

const EditTrip = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { routes, fetchMyRoutes, isLoading: routesLoading } = useRouteStore();
  const { myTrips, updateTrip, isUpdating } = useTripStore();

  const [formData, setFormData] = useState({
    routeId: "",
    departureDate: "",
    departureTime: "",
    availableSeats: "",
    pricePerSeat: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyRoutes();
  }, [fetchMyRoutes]);

  useEffect(() => {
    // Знайти рейс в store
    const trip = myTrips.find((t) => t.id === parseInt(id));
    
    if (trip) {
      // Розділити дату і час
      const dateTime = new Date(trip.departureDateTime);
      const date = dateTime.toISOString().split("T")[0];
      const time = dateTime.toTimeString().slice(0, 5);

      setFormData({
        routeId: trip.routeId.toString(),
        departureDate: date,
        departureTime: time,
        availableSeats: trip.availableSeats.toString(),
        pricePerSeat: trip.pricePerSeat.toString(),
      });
      setLoading(false);
    }
  }, [id, myTrips]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Об'єднуємо дату і час в ISO формат
    const departureDateTime = `${formData.departureDate}T${formData.departureTime}:00`;

    const data = {
      routeId: parseInt(formData.routeId),
      departureDateTime,
      availableSeats: parseInt(formData.availableSeats),
      pricePerSeat: parseFloat(formData.pricePerSeat),
    };

    try {
      await updateTrip(parseInt(id), data);
      navigate("/driver/dashboard");
    } catch (error) {
      // Toast handled in store
    }
  };

  // Мінімальна дата - завтра
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  // Знайти поточний рейс для відображення інфо
  const currentTrip = myTrips.find((t) => t.id === parseInt(id));

  if (loading || routesLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!currentTrip) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="alert alert-error max-w-md">
          <span>Рейс не знайдено</span>
          <button onClick={() => navigate("/driver/dashboard")} className="btn btn-sm">
            Повернутися
          </button>
        </div>
      </div>
    );
  }

  if (currentTrip.status !== "PLANNED") {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="alert alert-warning max-w-md">
          <span>Можна редагувати тільки заплановані рейси</span>
          <button onClick={() => navigate("/driver/dashboard")} className="btn btn-sm">
            Повернутися
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            {/* Header */}
            <h2 className="card-title text-3xl font-bold mb-2">
              Редагувати рейс
            </h2>
            <p className="text-base-content/60 mb-6">
              {currentTrip.startPoint} → {currentTrip.endPoint}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Route Selection (read-only для наочності) */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Маршрут</span>
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
                    {routes.map((route) => (
                      <option key={route.id} value={route.id}>
                        {route.startPoint} → {route.endPoint}
                        {route.distance && ` (${route.distance} км)`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Departure Date */}
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

              {/* Departure Time */}
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

              {/* Available Seats */}
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

              {/* Price Per Seat */}
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

              {/* Info Alert */}
              <div className="alert alert-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-current shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm">
                  Можна редагувати тільки заплановані рейси
                </span>
              </div>

              {/* Buttons */}
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
                  className="btn btn-primary flex-1"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Зберегти зміни"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTrip;
