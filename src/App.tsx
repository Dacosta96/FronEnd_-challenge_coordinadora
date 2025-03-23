import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import Home from "./pages/Dashboard/Home";
import AppLayout from "./layout/AppLayout";
import PublicLayout from "./layout/PublicLayout";
import PageHome from "./pages/pageHome/pageHome";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { ScrollToTop } from "./components/common/ScrollToTop";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import ProfilePage from "./components/UserProfile/profileClerk";
import TrackingPage from "./pages/pageHome/pageTracking";
import ShipmentDetails from "./pages/pageHome/pageDetailsTracking";
import AvailableRoutes from "./pages/Dashboard/PageRoutes";

export default function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Rutas protegidas para usuarios con rol "admin" */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route element={<AppLayout />}>
              <Route index path="/" element={<Home />} />
              <Route index path="/routes" element={<AvailableRoutes />} />
              <Route path="/profile-admin" element={<ProfilePage />} />
              <Route path="/indicators" element={<LineChart />} />
              <Route path="/graphics" element={<BarChart />} />
            </Route>
          </Route>

          {/* Rutas protegidas para usuarios con rol "user" */}
          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route element={<PublicLayout />}>
              <Route path="/home" element={<PageHome />} />
              <Route path="/profile-user" element={<ProfilePage />} />
              <Route path="/tracking" element={<TrackingPage />} />
              <Route
                path="/tracking/:trackingId"
                element={<ShipmentDetails />}
              />
            </Route>
          </Route>

          {/* Rutas de autenticación */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Ruta por defecto */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
