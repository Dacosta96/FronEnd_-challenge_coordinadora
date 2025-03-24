import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Button, Select, MenuItem } from "@mui/material";
import {
  createRouteAssignment,
  createShipmentHistory,
  getRoutes,
  getShipmentsWaiting,
  updateShipmentStatus,
} from "../../api/shipmentAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShipmentCreatedHistoryDTO } from "../../api/dto/shipment-dto";

interface Order {
  id: string;
  customer: string;
  address: string;
  status: string;
  route?: string;
}

const OrdersAdmin: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [routes, setRoutes] = useState<{ id: string; destination: string }[]>(
    []
  );
  const [editedOrders, setEditedOrders] = useState<Record<string, string>>({});
  const [pagination, setPagination] = useState({
    total: 0,
    page: 0,
    pageSize: 10,
  });

  // Maneja cambios en la selección de ruta
  const handleRouteChange = (orderId: string, newRoute: string) => {
    setEditedOrders((prev) => ({ ...prev, [orderId]: newRoute }));
  };
  console.log("editedOrders", editedOrders);

  const handleSaveChanges = async () => {
    try {
      for (const [orderId, routeId] of Object.entries(editedOrders)) {
        // Primero, actualizar el estado del envío
        await updateShipmentStatus(Number(orderId), "IN_TRANSIT");

        // Luego, asignar la ruta al envío
        await createRouteAssignment(Number(orderId), Number(routeId));

        // crear historial
        const shipmentHistoryData: ShipmentCreatedHistoryDTO = {
          shipment_id: Number(orderId),
          status: "En Transito",
        };
        const historyResponse = await createShipmentHistory(
          shipmentHistoryData
        );
        console.log("Respuesta de creación de historial:", historyResponse);
      }
      toast.success("Asignaciones creadas correctamente", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { marginTop: "80px" },
      });

      console.log(
        "Todos los envíos actualizados y asignaciones de ruta creadas correctamente."
      );
    } catch (error) {
      console.error("Error en el proceso de actualización:", error);
    }

    setEditedOrders({});
    fetchShipmentsData();
    fetchRoutes();
  };

  const fetchShipmentsData = async () => {
    try {
      const userShipments = await getShipmentsWaiting();

      // Mapeo de direcciones
      const mappedOrders = userShipments.map((order: any) => ({
        ...order,
        address:
          order.googleMapAddress?.formattedAddress ||
          order.destinationAddress?.administrativeArea ||
          "Dirección no disponible",
      }));

      setOrders(mappedOrders);
      setPagination((prev) => ({
        ...prev,
        total: mappedOrders.length,
      }));
    } catch (error) {
      console.error("Error obteniendo datos:", error);
    }
  };
  const fetchRoutes = async () => {
    try {
      const responseRoutes = await getRoutes();
      // Guardar id y destination en un array de objetos
      const destinations = responseRoutes.map(
        (route: { id: string; destination: string }) => ({
          id: route.id,
          destination: route.destination,
        })
      );

      setRoutes(destinations);
    } catch (error) {
      console.error("Error obteniendo datos:", error);
    }
  };
  useEffect(() => {
    fetchShipmentsData();
    fetchRoutes();
  }, []);
  // Definición de columnas del DataGrid
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "email", headerName: "Cliente", width: 200 },
    { field: "address", headerName: "Dirección", width: 250 },
    { field: "currentStatus", headerName: "Estado", width: 150 },
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
            <MenuItem key={route.id} value={route.id}>
              {route.destination}
            </MenuItem>
          ))}
        </Select>
      ),
    },
  ];
  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h2 className="text-lg font-semibold mb-4">Órdenes Pendientes</h2>
      <DataGrid
        slots={{ toolbar: CustomToolbar }}
        rows={orders}
        columns={columns}
        pageSizeOptions={[10, 20, 50, 100]}
        paginationModel={{
          page: pagination.page,
          pageSize: pagination.pageSize,
        }}
        onPaginationModelChange={(newPagination) =>
          setPagination((prev) => ({
            ...prev,
            page: newPagination.page,
            pageSize: newPagination.pageSize,
          }))
        }
        rowCount={pagination.total}
        paginationMode="client"
        sx={{
          maxHeight: "65vh",
          "& .MuiDataGrid-root": { overflowX: "auto" },
        }}
      />
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
