import { Link } from "react-router";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router";
import { useAuth } from "@clerk/clerk-react";

const AppHeaderPublic: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(); // Cierra sesión en Clerk
      navigate("/signin"); // Redirige al usuario
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="bg-white shadow-md mb-2">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/home" className="flex items-center">
          <img
            src="/images/logo/logo-coordinadora.png"
            alt="Logo-coordinadora"
            className="h-16 md:h-20 lg:h-24 w-auto"
          />
        </Link>

        {/* Botones de navegación - Desktop */}
        <nav className="hidden md:flex space-x-4">
          <Link
            to="/tracking"
            className="px-4 py-2 text-gray-700 hover:text-blue-600"
          >
            Rastreos
          </Link>
          <Link
            to="/profile-user"
            className="px-4 py-2 text-gray-700 hover:text-blue-600"
          >
            Mi perfil
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition"
          >
            Salir
            <FiLogOut className="w-5 h-5" />
          </button>
        </nav>

        {/* Menú hamburguesa en móviles */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-700 focus:outline-none"
          >
            {/* Icono de menú */}
            <svg
              className="w-6 h-6 transition-transform duration-300 ease-in-out"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menú desplegable en móviles con transición suave */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-white shadow-md">
          <ul className="flex flex-col items-center space-y-2 py-4">
            <li>
              <Link
                to="/tracking"
                className="block px-4 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Rastreos
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Mi perfil
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition"
              >
                Salir
                <FiLogOut className="w-5 h-5" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AppHeaderPublic;
