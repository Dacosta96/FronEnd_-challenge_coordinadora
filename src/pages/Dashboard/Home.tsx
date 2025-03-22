import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Select, MenuItem } from "@mui/material";

interface Order {
  id: string;
  customer: string;
  address: string;
  status: string;
  route?: string;
}

const initialOrders: Order[] = [
  {
    id: "1",
    customer: "Juan Pérez",
    address: "Calle 123",
    status: "Pendiente",
  },
  {
    id: "2",
    customer: "María López",
    address: "Avenida 456",
    status: "Pendiente",
  },
];

const routes = ["Ruta 1", "Ruta 2", "Ruta 3"];

const OrdersAdmin: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [editedOrders, setEditedOrders] = useState<Record<string, string>>({});

  // Maneja cambios en la selección de ruta
  const handleRouteChange = (orderId: string, newRoute: string) => {
    setEditedOrders((prev) => ({ ...prev, [orderId]: newRoute }));
  };

  // Guarda los cambios y simula envío al backend
  const handleSaveChanges = () => {
    const updatedOrders = orders.map((order) => ({
      ...order,
      route: editedOrders[order.id] || order.route,
    }));

    setOrders(updatedOrders);
    setEditedOrders({}); // Limpia los cambios después de guardar
    console.log("Datos enviados al backend:", updatedOrders);
  };

  // Definición de columnas del DataGrid
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "customer", headerName: "Cliente", width: 200 },
    { field: "address", headerName: "Dirección", width: 250 },
    { field: "status", headerName: "Estado", width: 150 },
    {
      field: "route",
      headerName: "Asignar Ruta",
      width: 200,
      renderCell: (params) => (
        <Select
          value={editedOrders[params.id as string] ?? params.value ?? ""}
          onChange={(e) =>
            handleRouteChange(params.id as string, e.target.value)
          }
          size="small"
          fullWidth
        >
          <MenuItem value="">Selecciona una ruta</MenuItem>
          {routes.map((route) => (
            <MenuItem key={route} value={route}>
              {route}
            </MenuItem>
          ))}
        </Select>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h2 className="text-lg font-semibold mb-4">Órdenes Pendientes</h2>
      <DataGrid rows={orders} columns={columns} pageSizeOptions={[5, 10]} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveChanges}
        sx={{ mt: 2 }}
        disabled={Object.keys(editedOrders).length === 0}
      >
        Guardar cambios
      </Button>
    </div>
  );
};

export default OrdersAdmin;
