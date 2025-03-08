import { NavBarContainer } from "./layout/navBar/NavBarContainer";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
      <NavBarContainer />
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
      </Routes>
      <FooterContainer />
    </Router>
  );
}

export default App;
