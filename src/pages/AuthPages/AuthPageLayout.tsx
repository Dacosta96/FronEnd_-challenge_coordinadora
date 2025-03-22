import React from "react";
import { Link } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col lg:flex-row justify-center w-full h-screen dark:bg-gray-900 sm:p-0">
        {/* Lado izquierdo con children centrado verticalmente */}
        <div className="w-full lg:w-1/2 flex items-center justify-center min-h-screen">
          {children}
        </div>

        {/* Lado derecho con imagen de fondo translúcida */}
        <div className="relative hidden w-full h-full lg:w-1/2 lg:flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{ backgroundImage: "url('/images/centroLogistico.webp')" }}
          ></div>

          {/* Contenido sobre la imagen */}
          <div className="relative flex flex-col items-center max-w-xs text-white z-10">
            <Link to="/" className="block mb-6 md:mb-8">
              <img
                className="w-48 md:w-56 lg:w-64" // Ajuste responsive del logo
                src="/images/logo/logo-coordinadora.png"
                alt="Logo"
              />
            </Link>
            <p className="text-center text-black dark:text-white text-lg md:text-xl lg:text-2xl font-semibold">
              El Futuro es Ahora <br /> ¿Te lo llevamos?
            </p>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}
