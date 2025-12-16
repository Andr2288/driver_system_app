import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, ArrowRight, Ruler, Clock } from "lucide-react";
import { useRouteStore } from "../../store/useRouteStore.js";

const CreateRoute = () => {
  const navigate = useNavigate();
  const { createRoute, isCreating } = useRouteStore();

  const [formData, setFormData] = useState({
    startPoint: "",
    endPoint: "",
    distance: "",
    estimatedDuration: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      startPoint: formData.startPoint,
      endPoint: formData.endPoint,
      distance: formData.distance ? parseFloat(formData.distance) : null,
      estimatedDuration: formData.estimatedDuration
        ? parseInt(formData.estimatedDuration)
        : null,
    };

    try {
      await createRoute(data);
      navigate("/driver/dashboard");
    } catch (error) {
      // Toast handled in store
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            {/* Header */}
            <h2 className="card-title text-3xl font-bold mb-2">
              Створити маршрут
            </h2>
            <p className="text-base-content/60 mb-6">
              Додайте новий маршрут для ваших рейсів
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Start Point */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Початкова точка <span className="text-error">*</span>
                  </span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 size-5 text-base-content/40" />
                  <input
                    type="text"
                    placeholder="Київ"
                    className="input input-bordered w-full pl-10"
                    value={formData.startPoint}
                    onChange={(e) =>
                      setFormData({ ...formData, startPoint: e.target.value })
                    }
                    required
                    maxLength={255}
                  />
                </div>
              </div>

              {/* End Point */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Кінцева точка <span className="text-error">*</span>
                  </span>
                </label>
                <div className="relative">
                  <ArrowRight className="absolute left-3 top-3.5 size-5 text-base-content/40" />
                  <input
                    type="text"
                    placeholder="Львів"
                    className="input input-bordered w-full pl-10"
                    value={formData.endPoint}
                    onChange={(e) =>
                      setFormData({ ...formData, endPoint: e.target.value })
                    }
                    required
                    maxLength={255}
                  />
                </div>
              </div>

              {/* Distance */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Відстань (км){" "}
                    <span className="text-xs text-base-content/60">
                      (опціонально)
                    </span>
                  </span>
                </label>
                <div className="relative">
                  <Ruler className="absolute left-3 top-3.5 size-5 text-base-content/40" />
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="540.5"
                    className="input input-bordered w-full pl-10"
                    value={formData.distance}
                    onChange={(e) =>
                      setFormData({ ...formData, distance: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Estimated Duration */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Тривалість (хвилини){" "}
                    <span className="text-xs text-base-content/60">
                      (опціонально)
                    </span>
                  </span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3.5 size-5 text-base-content/40" />
                  <input
                    type="number"
                    min="0"
                    placeholder="360"
                    className="input input-bordered w-full pl-10"
                    value={formData.estimatedDuration}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        estimatedDuration: e.target.value,
                      })
                    }
                  />
                </div>
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
                  disabled={isCreating}
                >
                  {isCreating ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Створити маршрут"
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

export default CreateRoute;
