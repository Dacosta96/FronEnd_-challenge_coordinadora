import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import { getgraphics01 } from "../../../api/shipmentAction";

export default function LineChartOne() {
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const fetchShipmentsData = async () => {
    try {
      const data = await getgraphics01();

      const sortedData = data.sort(
        (a: any, b: any) =>
          new Date(a.shipmentDate).getTime() -
          new Date(b.shipmentDate).getTime()
      );

      const formattedDates = sortedData.map((item: any) => {
        const date = new Date(item.shipmentDate);
        return `${date.getDate()} ${date.toLocaleString("default", {
          month: "short",
        })}`;
      });

      const shipments = sortedData.map((item: any) => item.totalShipments);

      setCategories(formattedDates);
      setSeries([{ name: "Shipments", data: shipments }]);
    } catch (error) {
      console.error("Error obteniendo datos:", error);
    }
  };

  useEffect(() => {
    fetchShipmentsData();
  }, []);

  const options: ApexOptions = {
    legend: { show: false },
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth", // Hacer la línea más fluida
      width: 3, // Aumentar grosor de la línea
      colors: ["#465FFF"], // Asegurar color sólido
    },
    fill: {
      type: "solid", // Evitar que la línea se desvanezca
    },
    markers: {
      size: 5, // Aumentar tamaño de los puntos
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 7 },
    },
    grid: {
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    dataLabels: { enabled: false },
    tooltip: { enabled: true, x: { format: "dd MMM yyyy" } },
    xaxis: {
      type: "category",
      categories: categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { style: { fontSize: "12px", colors: ["#6B7280"] } },
      title: { text: "", style: { fontSize: "0px" } },
    },
  };

  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div id="chartEight" className="min-w-[1000px]">
        <Chart options={options} series={series} type="line" height={310} />
      </div>
    </div>
  );
}
