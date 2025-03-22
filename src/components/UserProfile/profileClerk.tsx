import { Link } from "react-router";
import { UserProfile } from "@clerk/clerk-react";
import { FaArrowLeft } from "react-icons/fa"; // Icono de flecha

const ProfilePage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Ajusta la altura al 100% de la pantalla
        padding: "20px",
        flexDirection: "column", // Alineación vertical
      }}
    >
      {/* Contenedor para la flecha y el perfil */}
      <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
        {/* Enlace con flecha hacia la izquierda */}
        <Link
          to="/" // Ruta hacia la página admin-side
          className="text-gray-800 flex items-center gap-2 text-lg font-semibold transition-colors hover:text-primary"
          style={{
            padding: "10px",
            textDecoration: "none", // Elimina el subrayado del enlace
            color: "#333", // Color del texto
          }}
        >
          <FaArrowLeft /> {/* Icono de flecha */}
          Volver
        </Link>
      </div>

      {/* Componente de perfil de usuario */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh", // Ajusta la altura al 100% de la pantalla
          padding: "20px",
        }}
      >
        <UserProfile routing="hash" />
      </div>
    </div>
  );
};

export default ProfilePage;
