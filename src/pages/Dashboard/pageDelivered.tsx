import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Button, Checkbox } from "@mui/material";
import {
  createShipmentHistory,
  getShipmentsInTransit,
  updateShipmentDelivered,
} from "../../api/shipmentAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShipmentCreatedHistoryDTO } from "../../api/dto/shipment-dto";

interface Order {
  id: number;
  customer: string;
  address: string;
  status: string;
}

const DeliveredAdmin: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 0,
    pageSize: 10,
  });

  // Maneja la selección de órdenes
  const handleSelectOrder = (orderId: number) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSaveChanges = async () => {
    console.log("selectedOrders", selectedOrders);
    if (selectedOrders.length === 0) return;

    try {
      for (const orderId of selectedOrders) {
        await updateShipmentDelivered(orderId);

        // crear historial
        const shipmentHistoryData: ShipmentCreatedHistoryDTO = {
          shipment_id: Number(orderId),
          status: "Entregado",
        };
        const historyResponse = await createShipmentHistory(
          shipmentHistoryData
        );
        console.log("Respuesta de creación de historial:", historyResponse);
      }

      toast.success("Órdenes marcadas como entregadas", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { marginTop: "80px" },
      });

      // Limpiar selección y recargar datos
      setSelectedOrders([]);
      fetchShipmentsData();
    } catch (error) {
      console.error("Error actualizando estado:", error);
    }
  };

  const fetchShipmentsData = async () => {
    try {
      const userShipments = await getShipmentsInTransit();

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

  useEffect(() => {
    fetchShipmentsData();
  }, []);
  // Definición de columnas del DataGrid
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "email", headerName: "Cliente", width: 200 },
    { field: "address", headerName: "Dirección", width: 250 },
    { field: "currentStatus", headerName: "Estado", width: 150 },
    {
      field: "select",
      headerName: "",
      width: 50,
      sortable: false,
      renderCell: (params) => (
        <Checkbox
          checked={selectedOrders.includes(params.id as number)}
          onChange={() => handleSelectOrder(params.id as number)}
        />
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
      <h2 className="text-lg font-semibold mb-4">Órdenes En transito</h2>
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
        disabled={selectedOrders.length === 0}
      >
        Marcar como Entregado
      </Button>
    </div>
  );
};

export default DeliveredAdmin;
