export interface ShipmentCreatedDTO {
  userId: number;
  weight: number;
  dimensions: string;
  destinationAddress: {
    regionCode: string;
    administrativeArea: string;
    locality: string;
    postalCode: string;
    addressLines: string[];
  };
}

export interface ShipmentDetailsDTO {
  id: number;
  tracking_id: string;
  user_id: number;
  weight: string;
  dimensions: string;
  product_type: string;
  destination_address: DestinationAddressDTO;
  google_map_address: null;
  current_status: string;
  created_at: string;
  shipmentStatusHistory: ShipmentStatusHistoryDTO[];
  shipmentMetrics: ShipmentMetricDTO[];
}

export interface DestinationAddressDTO {
  locality: string;
  postalCode: string;
  regionCode: string;
  addressLines: string[];
  administrativeArea: string;
}

export interface ShipmentMetricDTO {
  id: number;
  shipmentId: number;
  deliveryTimeMinutes: number;
}

export interface ShipmentStatusHistoryDTO {
  id: number;
  shipmentId: number;
  status: string;
  updatedAt: string;
}

export interface ShipmentCreatedHistoryDTO {
  shipment_id: number;
  status: string;
}
