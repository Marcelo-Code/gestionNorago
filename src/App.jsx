import { NavBarContainer } from "./layout/navBar/NavBarContainer";
import "./index.css";
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
import { InactiveClientsListContainer } from "./pages/clients/clientsList/InactiveClientsListContainer";
import { InactiveServicesListContainer } from "./pages/services/servicesList/InactiveServicesListContainer";
import { LoginContainer } from "./pages/login/LoginContainer";
import { PricesListContainer } from "./pages/prices/pricesList/PricesListContainer";
import { PriceCreationContainer } from "./pages/prices/priceCreation/PriceCreationContainer";
import { PriceModificationContainer } from "./pages/prices/priceModification/PriceModificationContainer";
import { MonthlyIncomesContainer } from "./pages/monthlyIncomes/MonthlyIncomesContainer";

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
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <NavBarContainer />}
      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/clients/clientsList" element={<ClientsListContainer />} />
        <Route
          path="/clients/inactiveClientsList"
          element={<InactiveClientsListContainer />}
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
          path="/services/servicesList"
          element={<ServicesListContainer />}
        />
        <Route
          path="/services/servicesList/:clientId"
          element={<ServicesListContainer />}
        />
        <Route
          path="/services/inactiveServicesList"
          element={<InactiveServicesListContainer />}
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
          path="/prices/pricesList/:active"
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
        <Route path="/monthly-services" element={<MonthlyIncomesContainer />} />
        <Route path="/login" element={<LoginContainer />} />
      </Routes>
      {!isLoginPage && <FooterContainer />}
    </>
  );
}

export default App;
