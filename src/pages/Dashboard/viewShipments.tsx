import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { getAllShipments } from "../../api/shipmentAction";

interface Order {
  id: string;
  customer: string;
  address: string;
  status: string;
  route?: string;
}

const ViewShipments: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 0,
    pageSize: 10,
  });

  const fetchShipmentsData = async () => {
    try {
      const shipments = await getAllShipments();
      console.log("shipments", shipments);
      const mappedOrders = shipments.map((order: any) => ({
        ...order,
        address:
          order.googleMapAddress?.formattedAddress ||
          order.destinationAddress?.administrativeArea ||
          "Dirección no disponible",
      }));

      setOrders(mappedOrders);
      setPagination((prev) => ({
        ...prev,
        total: shipments.length,
      }));
    } catch (error) {
      console.error("Error obteniendo datos:", error);
    }
  };

  useEffect(() => {
    fetchShipmentsData();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "productType", headerName: "Tipo", width: 200 },
    { field: "weight", headerName: "Peso (Kg)", width: 250 },
    { field: "address", headerName: "Dirección", width: 250 },
    { field: "currentStatus", headerName: "Estado", width: 150 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <h2 className="text-lg font-semibold mb-4">Envíos</h2>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          slots={{ toolbar: GridToolbar }}
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
            "& .MuiDataGrid-root": { overflowX: "auto" },
          }}
        />
      </div>
    </div>
  );
};

export default ViewShipments;
