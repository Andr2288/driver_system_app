import { useEffect, useState } from "react";
import { Search, MapPin, Calendar, Users, DollarSign, User, X } from "lucide-react";
import { useTripStore } from "../../store/useTripStore";
import { useAuthStore } from "../../store/useAuthStore";

const PassengerDashboard = () => {
  const { authUser } = useAuthStore();
  const { trips, isLoading, fetchAvailableTrips, searchTrips } = useTripStore();

  const [searchParams, setSearchParams] = useState({
    startPoint: "",
    endPoint: "",
  });

  const [isSearching, setIsSearching] = useState(false);

  // Завантажити всі рейси при завантаженні
  useEffect(() => {
    fetchAvailableTrips();
  }, [fetchAvailableTrips]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);

    if (!searchParams.startPoint && !searchParams.endPoint) {
      await fetchAvailableTrips();
    } else {
      await searchTrips(searchParams.startPoint, searchParams.endPoint);
    }

    setIsSearching(false);
  };

  const handleReset = () => {
    setSearchParams({ startPoint: "", endPoint: "" });
    fetchAvailableTrips();
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

        <div className="mb-8">
          <h1 className="text-3xl font-bold">Доступні рейси</h1>
          <p className="text-base-content/60 mt-1">
            Вітаємо, {authUser?.name}! Знайдіть свій рейс 🚗
          </p>
        </div>

        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title text-xl mb-4">
              <Search className="size-5" />
              Пошук рейсів
            </h2>

            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Початкова точка</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 size-5 text-base-content/40" />
                    <input
                      type="text"
                      placeholder="Київ, Харків..."
                      className="input input-bordered w-full pl-10"
                      value={searchParams.startPoint}
                      onChange={(e) =>
                        setSearchParams({
                          ...searchParams,
                          startPoint: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Кінцева точка</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 size-5 text-base-content/40" />
                    <input
                      type="text"
                      placeholder="Львів, Одеса..."
                      className="input input-bordered w-full pl-10"
                      value={searchParams.endPoint}
                      onChange={(e) =>
                        setSearchParams({
                          ...searchParams,
                          endPoint: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    <>
                      <Search className="size-5" />
                      Знайти рейси
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn-ghost"
                  disabled={isSearching}
                >
                  <X className="size-5" />
                  Скинути
                </button>
              </div>

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
                  Залиште поля порожніми, щоб побачити всі доступні рейси
                </span>
              </div>
            </form>
          </div>
        </div>

        {!isLoading && (
          <div className="stats shadow mb-6 w-full">
            <div className="stat">
              <div className="stat-title">Знайдено рейсів</div>
              <div className="stat-value text-primary">{trips.length}</div>
              <div className="stat-desc">
                {searchParams.startPoint || searchParams.endPoint
                  ? "За вашим запитом"
                  : "Всього доступних"}
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : trips.length === 0 ? (
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center py-12">
                <h3 className="text-2xl font-bold mb-2">
                  Рейсів не знайдено 😔
                </h3>
                <p className="text-base-content/60">
                  Спробуйте змінити параметри пошуку або перевірте пізніше
                </p>
                <button
                  onClick={handleReset}
                  className="btn btn-primary mt-4"
                >
                  Показати всі рейси
                </button>
              </div>
            </div>
          ) : (
            trips.map((trip) => (
              <div key={trip.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Route Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="card-title text-2xl">
                          {trip.startPoint} → {trip.endPoint}
                        </h3>
                        <span className={`badge ${getStatusBadge(trip.status)}`}>
                          {getStatusText(trip.status)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                        <div className="flex items-center gap-2">
                          <Calendar className="size-5 text-primary" />
                          <div>
                            <div className="text-xs text-base-content/60">
                              Дата і час
                            </div>
                            <div className="font-medium">
                              {formatDateTime(trip.departureDateTime)}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <User className="size-5 text-primary" />
                          <div>
                            <div className="text-xs text-base-content/60">
                              Водій
                            </div>
                            <div className="font-medium">{trip.driverName}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Users className="size-5 text-success" />
                          <div>
                            <div className="text-xs text-base-content/60">
                              Вільних місць
                            </div>
                            <div className="font-medium">
                              {trip.availableSeats}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <DollarSign className="size-5 text-success" />
                          <div>
                            <div className="text-xs text-base-content/60">
                              Ціна за місце
                            </div>
                            <div className="font-medium text-success">
                              {trip.pricePerSeat} грн
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex lg:flex-col gap-2">
                      <div className="badge badge-lg badge-primary">
                        {trip.pricePerSeat} грн
                      </div>
                      {/* TODO: Додати кнопку бронювання в майбутньому */}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PassengerDashboard;
