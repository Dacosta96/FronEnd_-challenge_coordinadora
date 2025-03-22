import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import Home from "./pages/Dashboard/Home";
import AppLayout from "./layout/AppLayout";
import PublicLayout from "./layout/PublicLayout";
import PageHome from "./pages/pageHome/pageHome";
//import ProtectedRoute from "./routes/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { ScrollToTop } from "./components/common/ScrollToTop";
import UserProfiles from "./pages/UserProfiles";
import Blank from "./pages/Blank";
import FormElements from "./pages/Forms/FormElements";
import BasicTables from "./pages/Tables/BasicTables";
import Alerts from "./pages/UiElements/Alerts";
import Avatars from "./pages/UiElements/Avatars";
import Badges from "./pages/UiElements/Badges";
import Buttons from "./pages/UiElements/Buttons";
import Images from "./pages/UiElements/Images";
import Videos from "./pages/UiElements/Videos";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";

export default function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Rutas protegidas para usuarios con rol "admin" */}
          <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
            <Route element={<AppLayout />}>
              <Route index path="/" element={<Home />} />
              <Route path="/profile" element={<UserProfiles />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/blank" element={<Blank />} />
              <Route path="/form-elements" element={<FormElements />} />
              <Route path="/basic-tables" element={<BasicTables />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/avatars" element={<Avatars />} />
              <Route path="/badge" element={<Badges />} />
              <Route path="/buttons" element={<Buttons />} />
              <Route path="/images" element={<Images />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/line-chart" element={<LineChart />} />
              <Route path="/bar-chart" element={<BarChart />} />
            </Route>
          </Route>

          {/* Rutas protegidas para usuarios con rol "user" */}
          <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
            <Route element={<PublicLayout />}>
              <Route path="/home" element={<PageHome />} />
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
