import { JSX, useState } from "react";
import { toast } from "react-toastify";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { IconButton, useMediaQuery } from "@mui/material";
import Button from "../../components/ui/button/Button";
import { useNavigate } from "react-router";

const initialShipments = [
  {
    id: "1",
    trackingId: "ABC123",
    status: "En tránsito",
    weight: "2kg",
    destination: "Madrid",
  },
  {
    id: "2",
    trackingId: "DEF456",
    status: "Entregado",
    weight: "5kg",
    destination: "Barcelona",
  },
  {
    id: "3",
    trackingId: "GHI789",
    status: "Pendiente",
    weight: "3.5kg",
    destination: "Valencia",
  },
  {
    id: "4",
    trackingId: "JKL012",
    status: "En tránsito",
    weight: "7kg",
    destination: "Sevilla",
  },
  {
    id: "5",
    trackingId: "MNO345",
    status: "Cancelado",
    weight: "1kg",
    destination: "Bilbao",
  },
];

export default function TrackingPage() {
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState("");
  const [shipments, setShipments] = useState(initialShipments);
  const [pagination, setPagination] = useState({
    total: initialShipments.length,
    page: 0,
    pageSize: 10,
  });

  const isSmallScreen = useMediaQuery("(max-width: 768px)"); // Detecta pantallas pequeñas

  const handleSearch = async () => {
    if (!searchId.trim()) {
      toast.error("Ingrese un ID de envío válido");
      return;
    }

    const foundShipment = initialShipments.find(
      (s) => s.trackingId === searchId
    );

    if (foundShipment) {
      setShipments([foundShipment]);
      setPagination((prev) => ({ ...prev, total: 1, page: 0 }));
    } else {
      toast.error("No se encontró el envío");
      setShipments([]);
      setPagination((prev) => ({ ...prev, total: 0, page: 0 }));
    }
  };

  const columns = [
    { field: "trackingId", headerName: "ID Envío", flex: 1 },
    !isSmallScreen && { field: "weight", headerName: "Peso (kg)", flex: 1 },
    !isSmallScreen && { field: "destination", headerName: "Destino", flex: 1 },
    !isSmallScreen && { field: "status", headerName: "Estado", flex: 1 },
    {
      field: "details",
      headerName: "Detalles",
      width: 100,
      renderCell: (params: { row: { trackingId: string } }) => (
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
      ),
    },
  ].filter(Boolean) as Array<{
    field: string;
    headerName: string;
    flex: number;
    sortable?: boolean;
    renderCell?: (params: any) => JSX.Element;
  }>;

  // Función para manejar el clic en "Detalles"
  const handleDetails = (shipment: { trackingId: string }) => {
    //toast.info(`Detalles del envío: ${shipment.trackingId}`);
    navigate(`/tracking/${shipment.trackingId}`);
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
      <DataGrid
        slots={{ toolbar: CustomToolbar }} // Usa toolbar sin Export ni Density
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
          "& .MuiDataGrid-root": {
            overflowX: "auto", // Permite desplazamiento horizontal si es necesario
          },
        }}
      />
    </div>
  );
}
