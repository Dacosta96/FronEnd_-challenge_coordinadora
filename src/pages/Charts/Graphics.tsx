import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import LineChartOne from "../../components/charts/line/LineChartOne";

export default function Graphics() {
  return (
    <div>
      <PageMeta
        title="React.js Chart Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Chart Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Graficos" />
      <div className="space-y-6">
        <ComponentCard title="Grafica 01 - Envios/dia">
          <LineChartOne />
        </ComponentCard>
      </div>
    </div>
  );
}
