import { Navigate, Outlet } from "react-router";
import { useAuth, useUser } from "@clerk/clerk-react";

export default function ProtectedRoute({
  allowedRoles,
}: {
  allowedRoles: string[];
}) {
  const { isSignedIn } = useAuth();
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <p>Cargando...</p>; // Evitar errores antes de cargar

  const userRole = user?.publicMetadata?.role as string;

  if (!isSignedIn) return <Navigate to="/signin" replace />;
  if (!allowedRoles.includes(userRole))
    return <Navigate to="/signin" replace />;

  return <Outlet />;
}
