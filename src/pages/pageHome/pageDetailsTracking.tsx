import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Button from "../../components/ui/button/Button";

interface ShipmentEvent {
  date: string;
  status: string;
  location: string;
}

const mockFetchShipmentDetails = async (trackingId: string) => {
  // Simula una respuesta de API con historial de eventos
  const mockData: Record<string, ShipmentEvent[]> = {
    ABC123: [
      { date: "2024-07-01", status: "En bodega", location: "Madrid" },
      { date: "2024-07-03", status: "En tránsito", location: "Barcelona" },
      { date: "2024-07-05", status: "Entregado", location: "Valencia" },
    ],
    DEF456: [
      { date: "2024-07-02", status: "Procesado", location: "Bilbao" },
      { date: "2024-07-04", status: "En camino", location: "Sevilla" },
    ],
  };
  return new Promise<ShipmentEvent[]>((resolve) =>
    setTimeout(() => resolve(mockData[trackingId] || []), 1000)
  );
};

export default function ShipmentDetails() {
  const { trackingId } = useParams<{ trackingId: string }>();
  const navigate = useNavigate();
  const [history, setHistory] = useState<ShipmentEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!trackingId) {
      toast.error("ID de envío no válido");
      navigate("/");
      return;
    }

    mockFetchShipmentDetails(trackingId)
      .then((data) => {
        setHistory(data);
        if (data.length === 0) {
          toast.warn("No se encontraron eventos para este envío");
        }
      })
      .catch(() => toast.error("Error al cargar detalles del envío"))
      .finally(() => setLoading(false));
  }, [trackingId, navigate]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-4">
        Detalles del Envío: {trackingId}
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Cargando historial...</p>
      ) : history.length > 0 ? (
        <ul className="space-y-4">
          {history.map((event, index) => (
            <li key={index} className="border p-3 rounded-lg shadow-sm">
              <p className="text-lg font-semibold">{event.status}</p>
              <p className="text-sm text-gray-600">
                {event.date} - {event.location}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">Sin eventos registrados.</p>
      )}

      <div className="text-center mt-6">
        <Button size="md" variant="outline" onClick={() => navigate(-1)}>
          Volver
        </Button>
      </div>
    </div>
  );
}
