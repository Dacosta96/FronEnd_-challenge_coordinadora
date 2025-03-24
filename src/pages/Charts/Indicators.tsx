import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import {
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaPercent,
  FaBalanceScale,
} from "react-icons/fa";
import { getIndicators } from "../../api/shipmentAction";

const KPIComponent: React.FC = () => {
  const [indicators, setIndicators] = useState<{
    statusCounts?: { DELIVERED: number; IN_TRANSIT: number; WAITING: number };
    totalShipments?: number;
    totalWeight?: string;
  }>({});

  const fetchShipmentsData = async () => {
    try {
      const data = await getIndicators();
      console.log("indicators", data);
      setIndicators(data);
    } catch (error) {
      console.error("Error obteniendo datos:", error);
    }
  };

  useEffect(() => {
    fetchShipmentsData();
  }, []);

  // Extraer datos con valores por defecto
  const totalShipments = indicators.totalShipments ?? 0;
  const statusCounts = indicators.statusCounts ?? {
    DELIVERED: 0,
    IN_TRANSIT: 0,
    WAITING: 0,
  };
  const totalWeight = indicators.totalWeight ?? "N/A";

  // Calcular el porcentaje de entregados
  const deliveryPercentage =
    totalShipments > 0
      ? ((statusCounts.DELIVERED / totalShipments) * 100).toFixed(2) + "%"
      : "0%";

  // Configuración de los KPI con datos dinámicos
  const indicatorsConfig = [
    { title: "Total Envíos", value: totalShipments, icon: <FaBox size={24} /> },
    {
      title: "Envíos en Espera",
      value: statusCounts.WAITING,
      icon: <FaTruck size={24} />,
    },
    {
      title: "En Tránsito",
      value: statusCounts.IN_TRANSIT,
      icon: <FaTruck size={24} />,
    },
    {
      title: "Entregados",
      value: statusCounts.DELIVERED,
      icon: <FaCheckCircle size={24} />,
    },
    {
      title: "Porcentaje Entregados",
      value: deliveryPercentage,
      icon: <FaPercent size={24} />,
    },
    {
      title: "Total Transportado (Kg)",
      value: totalWeight,
      icon: <FaBalanceScale size={24} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {indicatorsConfig.map(({ title, value, icon }) => (
        <Card key={title} className="shadow-md">
          <CardContent className="flex flex-col items-center text-center">
            <div className="text-blue-500">{icon}</div>
            <Typography variant="h6" className="font-bold">
              {title}
            </Typography>
            <Typography variant="h5" className="text-blue-700">
              {value}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default KPIComponent;
