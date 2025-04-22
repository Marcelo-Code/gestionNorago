import { NavBarContainer } from "./layout/navBar/NavBarContainer";
import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { ClientsListContainer } from "./pages/clients/clientsList/ClientsListContainer";
import { FooterContainer } from "./layout/footer/FooterContainer";
import { HomeContainer } from "./pages/home/HomeContainer";
import { ClientCreationContainer } from "./pages/clients/clientCreation/ClientCreationContainer";
import { ClientModificactionContainer } from "./pages/clients/clientModification/ClientModificactionContainer";
import { ServicesListContainer } from "./pages/services/servicesList/ServicesListContainer";
import { ServiceCreationContainer } from "./pages/services/serviceCreation/ServiceCreationContainer";
import { ServiceModificationContainer } from "./pages/services/serviceModification/ServiceModificationContainer";
import { GeneralContext } from "./context/GeneralContext";
import { useContext, useEffect } from "react";
import { PricesListContainer } from "./pages/prices/pricesList/PricesListContainer";
import { PriceCreationContainer } from "./pages/prices/priceCreation/PriceCreationContainer";
import { PriceModificationContainer } from "./pages/prices/priceModification/PriceModificationContainer";
import { MonthlyIncomesContainer } from "./pages/monthlyIncomes/MonthlyIncomesContainer";
import { LoginContainer } from "./pages/login/LoggedInContainer";
import { RecoverPasswordContainer } from "./pages/recoverPassword/RecoverPasswordContainer";
import { UpdatePasswordContainer } from "./pages/updatePassword/UpdatePasswordContainer";
import { PageNotFoundContainer } from "./pages/pageNotFound/PageNotFoundContainer";
import { ProtectedRoute } from "./components/protectedRoute/ProtectedRoute";

function App() {
  const { darkMode } = useContext(GeneralContext);

  useEffect(() => {
    document.body.style.background = darkMode
      ? "linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url(/images/noragoLogoFondo.jpg), linear-gradient(rgba(255, 255, 255, 0.8),rgba(255, 255, 255, 0.8)), url(/images/noragoLogoFondo.jpg)"
      : "linear-gradient(rgba(255, 255, 255, 0.8),rgba(255, 255, 255, 0.8)), url(/images/noragoLogoFondo.jpg)";
    document.body.style.backgroundSize = "60px";
    document.body.style.backgroundRepeat = "repeat";
    document.body.style.backgroundAttachment = "fixed";
  }, [darkMode]);

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/login" ||
    location.pathname === "/recoverPassword" ||
    location.pathname === "/updatePassword";

  return (
    <>
      {!isLoginPage && <NavBarContainer />}
      <Routes>
        <Route path="/recoverPassword" element={<RecoverPasswordContainer />} />
        <Route path="/updatePassword" element={<UpdatePasswordContainer />} />
        <Route path="/login" element={<LoginContainer />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route path="*" element={<PageNotFoundContainer />} />
                <Route path="/" element={<HomeContainer />} />
                <Route
                  path="/clients/clientsList/active/:active"
                  element={<ClientsListContainer />}
                />
                <Route
                  path="/clients/clientCreation"
                  element={<ClientCreationContainer />}
                />
                <Route
                  path="/clients/clientModification/:clientId"
                  element={<ClientModificactionContainer />}
                />
                <Route
                  path="/services/servicesList/active/:active"
                  element={<ServicesListContainer />}
                />
                <Route
                  path="/services/servicesList/:clientId"
                  element={<ServicesListContainer />}
                />
                <Route
                  path="/services/serviceCreation"
                  element={<ServiceCreationContainer />}
                />
                <Route
                  path="/services/serviceModification/:serviceId"
                  element={<ServiceModificationContainer />}
                />
                <Route
                  path="/prices/pricesList/active/:active"
                  element={<PricesListContainer />}
                />
                <Route
                  path="/prices/priceCreation"
                  element={<PriceCreationContainer />}
                />
                <Route
                  path="/prices/priceModification/:priceId"
                  element={<PriceModificationContainer />}
                />
                <Route
                  path="/monthlyIncomes"
                  element={<MonthlyIncomesContainer />}
                />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
      {!isLoginPage && <FooterContainer />}
    </>
  );
}

export default App;
