import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { getRoutes } from "../../api/shipmentAction";

interface Route {
  id: string;
  departureTime: string;
  sector: string;
  city: string;
  driver: string;
}

const AvailableRoutes: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "origin", headerName: "Origen", flex: 1 },
    { field: "destination", headerName: "Sector", flex: 1 },
    { field: "estimatedTime", headerName: "Timpo promedio(hr)", flex: 1 },
  ];

  const fetchRoutesData = async () => {
    try {
      const responseRoutes = await getRoutes();
      setRoutes(responseRoutes);
    } catch (error) {
      console.error("Error obteniendo datos:", error);
    }
  };
  useEffect(() => {
    fetchRoutesData();
  }, []);
  return (
    <div style={{ height: 500, width: "100%" }}>
      <h2 className="text-lg font-semibold mb-4">Rutas Disponibles</h2>
      <DataGrid
        rows={routes}
        columns={columns}
        pageSizeOptions={[5, 10]}
        slots={{ toolbar: GridToolbar }} // Activa los filtros y exportación
        disableColumnSelector={false} // Permite elegir columnas visibles
        disableDensitySelector={false} // Permite cambiar la densidad de las filas
      />
    </div>
  );
};

export default AvailableRoutes;
