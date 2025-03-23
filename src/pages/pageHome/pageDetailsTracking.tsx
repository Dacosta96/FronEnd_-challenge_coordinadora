import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Button from "../../components/ui/button/Button";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import AutoRefreshCounter from "./AutoRefreshCounter";
import axios from "axios";
import { Skeleton } from "@mui/material";
import { ShipmentDetailsDTO } from "../../api/dto/shipment-dto";

const queryClient = new QueryClient();

export default function ShipmentDetailsWrap() {
  return (
    <QueryClientProvider client={queryClient}>
      <ShipmentDetails />
    </QueryClientProvider>
  );
}

async function getShipmentDetails(
  trackingId: string
): Promise<ShipmentDetailsDTO> {
  const response = await axios.get(
    `http://localhost:4000/api/shipments/${trackingId}/details`
  );
  console.log("response details", response);
  return response.data;
}

/** Componente de Skeleton para mostrar mientras carga/refresca */
function ShipmentDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {/* Columna Izquierda */}
      <div className="space-y-4">
        {/* Tarjeta 1: Información General */}
        <div className="border p-4 rounded-lg shadow-sm space-y-2">
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="50%" />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="rectangular" height={24} />
        </div>
        {/* Tarjeta 2: Dirección Destino */}
        <div className="border p-4 rounded-lg shadow-sm space-y-2">
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="rectangular" height={24} />
        </div>
      </div>
      {/* Columna Derecha */}
      <div className="space-y-4">
        {/* Tarjeta 3: Historial de Estados */}
        <div className="border p-4 rounded-lg shadow-sm space-y-2">
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="50%" />
          <Skeleton variant="rectangular" height={24} />
        </div>
        {/* Tarjeta 4: Métricas */}
        <div className="border p-4 rounded-lg shadow-sm space-y-2">
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="rectangular" height={24} />
          <Skeleton variant="rectangular" height={24} />
        </div>
      </div>
    </div>
  );
}

function ShipmentDetails() {
  const { trackingId } = useParams<{ trackingId: string }>();
  const navigate = useNavigate();

  const {
    data: shipment,
    isLoading,
    isRefetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["shipment", trackingId],
    queryFn: () => getShipmentDetails(trackingId || "-1"),
    enabled: !!trackingId,
  });

  useEffect(() => {
    if (isError) {
      toast.error("No se pudo cargar el historial del envío.");
    }
  }, [isError, shipment]);

  const isLoadingOrRefetching = isLoading || isRefetching;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-4">
        Detalles del Envío: {trackingId}
      </h2>

      {/* Botón/contador para auto-refresh */}
      <div className="flex items-end justify-end">
        <AutoRefreshCounter seconds={10} size={40} onRefresh={refetch} />
      </div>

      {/* Loading Skeleton */}
      {isLoadingOrRefetching && <ShipmentDetailsSkeleton />}

      {/* Contenido principal cuando ya tenemos data */}
      {!isLoadingOrRefetching && shipment?.id && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Columna Izquierda */}
          <div className="space-y-4">
            {/* Tarjeta: Información General */}
            <div className="border p-4 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">
                Información General
              </h3>
              <p>
                <span className="font-medium">Tracking ID:</span>{" "}
                {shipment.tracking_id}
              </p>
              <p>
                <span className="font-medium">Usuario ID:</span>{" "}
                {shipment.user_id}
              </p>
              <p>
                <span className="font-medium">Peso:</span> {shipment.weight} kg
              </p>
              <p>
                <span className="font-medium">Dimensiones:</span>{" "}
                {shipment.dimensions}
              </p>
              <p>
                <span className="font-medium">Tipo de Producto:</span>{" "}
                {shipment.product_type}
              </p>
              <p>
                <span className="font-medium">Estado Actual:</span>{" "}
                {shipment.current_status}
              </p>
              <p>
                <span className="font-medium">Fecha de Creación:</span>{" "}
                {new Date(shipment.created_at).toLocaleString()}
              </p>
              {shipment.google_map_address && (
                <p>
                  <span className="font-medium">Dirección Google Maps:</span>{" "}
                  {shipment.google_map_address}
                </p>
              )}
            </div>

            {/* Tarjeta: Dirección de Destino */}
            <div className="border p-4 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">
                Dirección de Destino
              </h3>
              {shipment.destination_address ? (
                <div className="space-y-1">
                  <p>
                    <span className="font-medium">Localidad:</span>{" "}
                    {shipment.destination_address.locality}
                  </p>
                  <p>
                    <span className="font-medium">Código Postal:</span>{" "}
                    {shipment.destination_address.postalCode}
                  </p>
                  <p>
                    <span className="font-medium">Región:</span>{" "}
                    {shipment.destination_address.regionCode}
                  </p>
                  <p>
                    <span className="font-medium">Área Administrativa:</span>{" "}
                    {shipment.destination_address.administrativeArea}
                  </p>
                  <p>
                    <span className="font-medium">Líneas de dirección:</span>{" "}
                    {shipment.destination_address.addressLines?.join(", ")}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">
                  No se encontró dirección de destino.
                </p>
              )}
            </div>
          </div>

          {/* Columna Derecha */}
          <div className="space-y-4">
            {/* Tarjeta: Historial de Estados */}
            <div className="border p-4 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">
                Historial de Estados
              </h3>
              {shipment.shipmentStatusHistory?.length ? (
                <ul className="space-y-3">
                  {shipment.shipmentStatusHistory.map((event) => (
                    <li
                      key={event.id}
                      className="p-2 border rounded bg-gray-50 text-gray-700"
                    >
                      <p>
                        <span className="font-medium">Estado:</span>{" "}
                        {event.status}
                      </p>
                      <p>
                        <span className="font-medium">Fecha/Hora:</span>{" "}
                        {new Date(event.updatedAt).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">
                  Sin eventos registrados en el historial.
                </p>
              )}
            </div>

            {/* Tarjeta: Métricas */}
            <div className="border p-4 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Métricas</h3>
              {shipment.shipmentMetrics?.length ? (
                <ul className="space-y-3">
                  {shipment.shipmentMetrics.map((metric) => (
                    <li
                      key={metric.id}
                      className="p-2 border rounded bg-gray-50 text-gray-700"
                    >
                      <p>
                        <span className="font-medium">ID Métrica:</span>{" "}
                        {metric.id}
                      </p>
                      <p>
                        <span className="font-medium">
                          Tiempo de Entrega (min):
                        </span>{" "}
                        {metric.deliveryTimeMinutes}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">
                  Sin métricas registradas para este envío.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sin datos */}
      {!isLoadingOrRefetching && (!shipment?.id || shipment?.id === 0) && (
        <p className="text-center text-gray-500 mt-4">
          No se encontraron datos del envío.
        </p>
      )}

      {/* Botón para volver */}
      <div className="text-center mt-6">
        <Button size="md" variant="outline" onClick={() => navigate(-1)}>
          Volver
        </Button>
      </div>
    </div>
  );
}
