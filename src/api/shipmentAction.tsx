import axios from "axios";
import {
  ShipmentCreatedDTO,
  ShipmentCreatedHistoryDTO,
  ShipmentCreatedMetricsDTO,
} from "./dto/shipment-dto";

const API_URL = import.meta.env.VITE_PUBLIC_URL_API;

export const createShipment = async (
  dataShipment: ShipmentCreatedDTO
): Promise<any> => {
  try {
    console.log("Creating shipment", dataShipment);
    const response = await axios.post(`${API_URL}shipments`, dataShipment);
    console.log("response", response);
    if (response.status !== 201) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.error("Error creating shipment", error);
  }
  return null;
};

export const getShipmentsByUserId = async (userId: string): Promise<any> => {
  try {
    console.log("Getting shipments", userId);
    const response = await axios.get(`${API_URL}shipments/user/${userId}`);
    console.log("response", response);
    if (response.status !== 200) {
      console.error("Error getting shipments");
      return { shipments: [] };
    }
    return response.data;
  } catch (error) {
    console.error(error);
    console.error("Error getting shipments");
  }
  return { shipments: [] };
};

export const getShipmentById = async (
  shipmentId: string,
  userId: number
): Promise<any> => {
  try {
    console.log("Getting shipment", { shipmentId, userId });

    // Llamada a la API con ambos parámetros
    const response = await axios.get(
      `${API_URL}shipments/${shipmentId}?user_id=${userId}`
    );
    if (response.status !== 200) {
      console.error("Error getting shipment");
      return { shipments: [] };
    }
    return response.data;
  } catch (error) {
    console.error(error);
    console.error("Error getting shipment");
  }
  return { shipments: [] };
};

export const createShipmentHistory = async (
  dataShipment: ShipmentCreatedHistoryDTO
): Promise<any> => {
  try {
    console.log("Creating history", dataShipment);
    const response = await axios.post(`${API_URL}history`, dataShipment);
    console.log("response history", response);
    if (response.status !== 201) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.error("Error creating shipment history", error);
  }
  return null;
};

export const createShipmentMetrics = async (
  dataMetrics: ShipmentCreatedMetricsDTO
): Promise<any> => {
  try {
    console.log("Creating metrics", dataMetrics);
    const response = await axios.post(`${API_URL}history/metrics`, dataMetrics);
    console.log("response metrics", response);
    if (response.status !== 201) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.error("Error creating shipment metrics", error);
  }
  return null;
};

export const getAllShipments = async (): Promise<any> => {
  try {
    // Llamada a la API con ambos parámetros
    const response = await axios.get(`${API_URL}shipments`);
    if (response.status !== 200) {
      console.error("Error getting shipment");
      return { shipments: [] };
    }
    return response.data;
  } catch (error) {
    console.error(error);
    console.error("Error getting shipment");
  }
  return { shipments: [] };
};

//////////////Assignment /////////////////////

export const getShipmentsWaiting = async (): Promise<any> => {
  try {
    const response = await axios.get(`${API_URL}shipments/waiting`);
    if (response.status !== 200) {
      console.error("Error getting shipments");
      return { shipments: [] };
    }
    return response.data;
  } catch (error) {
    console.error(error);
    console.error("Error getting shipments");
  }
  return { shipments: [] };
};

export const getRoutes = async (): Promise<any> => {
  try {
    const response = await axios.get(`${API_URL}shipments/routes`);
    if (response.status !== 200) {
      console.error("Error getting routes");
      return { routes: [] };
    }
    return response.data;
  } catch (error) {
    console.error(error);
    console.error("Error getting routes");
  }
  return { routes: [] };
};

export const updateShipmentStatus = async (
  id: number,
  status: string
): Promise<any> => {
  try {
    console.log("Updating shipment status", { id, status });
    const response = await axios.put(`${API_URL} /${id}`, { status });
    console.log("response", response);

    if (response.status !== 200) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.error("Error updating shipment status", error);
  }
  return null;
};

export const createRouteAssignment = async (
  shipmentId: number,
  routeId: number
): Promise<any> => {
  try {
    console.log("Creating route assignment", { shipmentId, routeId });
    const response = await axios.post(`${API_URL}shipments/assignment-route`, {
      shipmentId,
      routeId,
    });
    console.log("response", response);

    if (response.status !== 201) {
      return null;
    }

    return response.data;
  } catch (error) {
    console.error("Error creating route assignment", error);
  }
  return null;
};

///// reports //////

export const getIndicators = async (): Promise<any> => {
  try {
    const response = await axios.get(`${API_URL}shipments/indicators`);
    if (response.status !== 200) {
      console.error("Error getting indicators");
      return { routes: [] };
    }
    return response.data.data;
  } catch (error) {
    console.error(error);
    console.error("Error getting indicators");
  }
  return { routes: [] };
};

export const getgraphics01 = async (): Promise<any> => {
  try {
    const response = await axios.get(`${API_URL}shipments/daily-count`);
    if (response.status !== 200) {
      console.error("Error getting daily-count");
      return { routes: [] };
    }
    return response.data.data;
  } catch (error) {
    console.error(error);
    console.error("Error getting daily-count");
  }
  return { routes: [] };
};
