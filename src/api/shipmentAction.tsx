import axios from "axios";
import {
  ShipmentCreatedDTO,
  ShipmentCreatedHistoryDTO,
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
