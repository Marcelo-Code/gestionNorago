import React, { useContext, useEffect, useState } from "react";
import { ServicesList } from "./ServicesList";
import {
  getServices,
  softDeleteService,
  softUndeleteService,
} from "../../../services/api/services";
import { LoadingContainer } from "../../../layout/loading/LoadingContainer";
import { GeneralContext } from "../../../context/GeneralContext";
import { darkColor, buttonColor, lightColor } from "../../../utils/helpers";
import { useNavigate, useParams } from "react-router-dom";

export const ServicesListContainer = () => {
  const [editMode, setEditMode] = useState(false);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const { darkMode } = useContext(GeneralContext);
  const { clientId = null, active = "true" } = useParams();

  const [filteredClients, setFilteredClients] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEditModeChange = (e) => {
    setEditMode(e.target.checked);
  };

  const handleDeleteService = (clientId) => {
    softDeleteService(clientId)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setUpdateList(!updateList);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleUndeleteService = (clientId) => {
    softUndeleteService(clientId)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setUpdateList(!updateList);
        }
      })
      .catch((error) => console.log(error));
  };

  // Alternar entre barra de edición y barra de búsqueda
  //----------------------------------------------------

  const [showSearch, setShowSearch] = useState(false);
  const toggleSearchBar = () => {
    if (editMode) setEditMode(false);
    setShowSearch(!showSearch);
  };

  useEffect(() => {
    const activeValue = active === "true";

    setIsLoading(true);
    getServices()
      .then((response) => {
        console.log(response);
        response.data = response.data.filter(
          (price) => price.active === activeValue
        );
        if (clientId)
          response.data = response.data.filter(
            (service) => service.client_id === parseInt(clientId)
          );
        setServices(response.data);
        setFilteredClients(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [updateList, clientId, active]);

  if (isLoading) return <LoadingContainer />;

  const servicesListProps = {
    services,
    handleEditModeChange,
    editMode,
    handleDeleteService,
    darkMode,
    darkColor,
    lightColor,
    buttonColor,
    handleGoBack,
    toggleSearchBar,
    showSearch,
    setFilteredClients,
    filteredClients,
    setActiveFilters,
    activeFilters,
    active,
    handleUndeleteService,
  };

  return <ServicesList {...servicesListProps} />;
};
