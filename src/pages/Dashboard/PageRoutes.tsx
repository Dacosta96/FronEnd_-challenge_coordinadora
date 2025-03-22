import React from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

interface Route {
  id: string;
  departureTime: string;
  sector: string;
  city: string;
  driver: string;
}

const routes: Route[] = [
  {
    id: "1",
    departureTime: "08:00 AM",
    sector: "Norte",
    city: "Ciudad A",
    driver: "Carlos Gómez",
  },
  {
    id: "2",
    departureTime: "09:30 AM",
    sector: "Sur",
    city: "Ciudad B",
    driver: "Ana Rodríguez",
  },
  {
    id: "3",
    departureTime: "11:00 AM",
    sector: "Oriente",
    city: "Ciudad C",
    driver: "Luis Fernández",
  },
];

const AvailableRoutes: React.FC = () => {
  const columns: GridColDef[] = [
    { field: "departureTime", headerName: "Hora de Salida", flex: 1 },
    { field: "sector", headerName: "Sector", flex: 1 },
    { field: "city", headerName: "Ciudad", flex: 1 },
    { field: "driver", headerName: "Conductor", flex: 1 },
  ];

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
