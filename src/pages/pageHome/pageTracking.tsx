import { JSX, useState, useEffect } from "react";
//import { toast } from "react-toastify";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { IconButton, useMediaQuery } from "@mui/material";
import Button from "../../components/ui/button/Button";
import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { getUserByEmail } from "../../api/usersAction";
import {
  getShipmentById,
  getShipmentsByUserId,
} from "../../api/shipmentAction";

export default function TrackingPage() {
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress || "No disponible";
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState("");
  const [shipments, setShipments] = useState<
    { id: string; [key: string]: any }[]
  >([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 0,
    pageSize: 10,
  });
  const [userId, setUserId] = useState<number | null>(null);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const fetchUserData = async () => {
    try {
      if (userEmail !== "No disponible") {
        const user_id = await getUserByEmail(userEmail);
        setUserId(user_id.id);
        if (user_id) {
          const userShipments = await getShipmentsByUserId(user_id.id);

          // Mapeo de estados en inglés a español
          const statusTranslation: Record<string, string> = {
            WAITING: "Pendiente",
            delivered: "Entregado",
            in_transit: "En tránsito",
            canceled: "Cancelado",
            failed: "Fallido",
          };

          // Asegurar que cada objeto tenga formattedAddress y current_status traducido
          const transformedShipments = userShipments.map((shipment: any) => ({
            ...shipment,
            formattedAddress:
              shipment.google_map_address?.formattedAddress || "No disponible",
            current_status:
              statusTranslation[shipment.current_status] || "Desconocido",
          }));

          setShipments(transformedShipments);
          setPagination((prev) => ({
            ...prev,
            total: transformedShipments.length,
          }));
        }
      }
    } catch (error) {
      console.error("Error obteniendo datos:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, [userEmail]);

  const handleSearch = async () => {
    if (!searchId.trim()) {
      fetchUserData();
      return;
    }
    try {
      const response = await getShipmentById(searchId, userId || 0);
      setShipments(response);
    } catch (error) {
      console.error("Error obteniendo datos:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID Envío", width: 100 },
    !isSmallScreen && { field: "weight", headerName: "Peso (kg)", width: 200 },
    !isSmallScreen && {
      field: "formattedAddress",
      headerName: "Destino",
      flex: 1,
    },
    !isSmallScreen && {
      field: "current_status",
      headerName: "Estado",
      flex: 1,
    },
    {
      field: "details",
      headerName: "Detalles",
      width: 100,
      renderCell: (params: any) => {
        console.log("Fila de datos:", params.row);
        return (
          <IconButton color="primary" onClick={() => handleDetails(params.row)}>
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 3H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
              <path d="M7 9h10v2H7zM7 13h7v2H7z" />
            </svg>
          </IconButton>
        );
      },
    },
  ].filter(Boolean) as Array<{
    field: string;
    headerName: string;
    flex: number;
    sortable?: boolean;
    renderCell?: (params: any) => JSX.Element;
  }>;

  // Función para manejar el clic en "Detalles"
  const handleDetails = (shipment: any) => {
    //toast.info(`Detalles del envío: ${shipment.trackingId}`);
    navigate(`/tracking/${shipment.id}`);
  };

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );

  return (
    <div className="w-full h-full max-h-[80vh] mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-lg overflow-auto">
      <h2 className="text-2xl font-bold text-center mb-4">
        Seguimiento de Envíos
      </h2>

      {/* Buscador */}
      <div className="flex flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Ingrese ID de envío"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="w-auto max-w-xs flex-grow p-2 border rounded"
        />
        <Button
          size="md"
          variant="outline"
          onClick={handleSearch}
          className="whitespace-nowrap"
        >
          Buscar
        </Button>
      </div>

      {/* Tabla de envíos */}
      {shipments.length === 0 ? (
        <p>Cargando envíos...</p>
      ) : (
        <DataGrid
          slots={{ toolbar: CustomToolbar }}
          rows={shipments}
          columns={columns}
          getRowId={(row) => row.id}
          pageSizeOptions={[10, 20, 50, 100]}
          paginationModel={{
            page: pagination.page,
            pageSize: pagination.pageSize,
          }}
          rowCount={pagination.total}
          paginationMode="client"
          sx={{
            maxHeight: "65vh",
            "& .MuiDataGrid-root": { overflowX: "auto" },
          }}
        />
      )}
    </div>
  );
}
