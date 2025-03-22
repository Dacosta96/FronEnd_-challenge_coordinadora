import { Outlet } from "react-router";
import Footer from "./FooterLayout";
import AppHeaderPublic from "./AppHeaderPublic";

const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Encabezado */}
      <AppHeaderPublic />

      {/* Contenido principal - Ocupa todo el ancho y espacio disponible */}
      <main className="flex-1 w-full p-8 bg-white shadow-lg flex justify-center">
        <Outlet />
      </main>

      {/* Pie de página */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
