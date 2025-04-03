import React, { useContext, useEffect, useState } from "react";
import "./ClientsList.css";
import { ClientsList } from "./ClientsList";
import {
  getClients,
  softDeleteClient,
  softUndeleteClient,
} from "../../../services/api/clients";
import { LoadingContainer } from "../../../layout/loading/LoadingContainer";
import { GeneralContext } from "../../../context/GeneralContext";
import { darkColor, lightColor, buttonColor } from "../../../utils/helpers";
import { ErrorContainer } from "../../../layout/error/ErrorContainer";
import { useNavigate, useParams } from "react-router-dom";

export const ClientsListContainer = () => {
  const { darkMode } = useContext(GeneralContext);

  const { active } = useParams();

  //Variables y constantes para el filtro de busqueda
  //-------------------------------------------------

  const DEFAULT_STATUS_OPTIONS = [
    // { value: "all", label: "Todos" },
    // { value: "active", label: "Activos" },
    // { value: "inactive", label: "Inactivos" },
    // { value: "pending", label: "Pendientes" },
  ];

  const DEFAULT_TYPE_OPTIONS = [
    // { value: "all", label: "Todos" },
    // { value: "individual", label: "Individual" },
    // { value: "company", label: "Empresa" },
    // { value: "government", label: "Gobierno" },
  ];

  const DEFAULT_SORT_OPTIONS = [
    { value: "none", label: "Sin ordenar", name: "none" },
    { value: "alphabetical-asc", label: "Nombre (A-Z)", name: "full_name" },
    { value: "alphabetical-desc", label: "Nombre (Z-A)", name: "full_name" },
    // { value: "alphabetical-asc", label: "Dirección (A-Z)", name: "address" },
    // { value: "alphabetical-desc", label: "Dirección (Z-A)", name: "address" },
    // { value: "alphabetical-asc", label: "email (A-Z)", name: "email" },
    // { value: "alphabetical-desc", label: "email (Z-A)", name: "email" },
  ];

  const [filteredClients, setFilteredClients] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

  //Activar y desactivar el modo edición
  const [editMode, setEditMode] = useState(false);
  const handleEditModeChange = (e) => {
    setEditMode(e.target.checked);
  };

  // Alternar entre barra de edición y barra de búsqueda
  //----------------------------------------------------

  const [showSearch, setShowSearch] = useState(false);
  const toggleSearchBar = () => {
    if (editMode) setEditMode(false);
    setShowSearch(!showSearch);
  };

  //Función handleGoBack
  //--------------------
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  //Función borrar cliente
  //----------------------
  const [updateList, setUpdateList] = useState(false);
  const handleDeleteClient = (clientId) => {
    softDeleteClient(clientId)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setUpdateList(!updateList);
        }
      })
      .catch((error) => console.log(error));
  };

  //Función para restaurar un cliente borrado
  const handleUndeleteClient = (clientId) => {
    softUndeleteClient(clientId)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setUpdateList(!updateList);
        }
      })
      .catch((error) => console.log(error));
  };

  //Importar clientes de la base de datos
  //------------------------------------
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const activeValue = active === "true";

    setIsLoading(true);
    getClients()
      .then((response) => {
        console.log(response);
        response.data = response.data.filter(
          (price) => price.active === activeValue
        );
        setClients(response.data);

        //Se inicializa el filtro con todos los clientes
        setFilteredClients(response.data);
      })
      .catch((error) => {
        console.log(error);
        return <ErrorContainer />;
      })
      .finally(() => setIsLoading(false));
  }, [updateList, active]);

  if (isLoading) return <LoadingContainer />;

  const clientsListProps = {
    clients,
    handleEditModeChange,
    setEditMode,
    editMode,
    handleDeleteClient,
    darkMode,
    darkColor,
    lightColor,
    buttonColor,
    handleGoBack,
    toggleSearchBar,
    filteredClients,
    setFilteredClients,
    activeFilters,
    setActiveFilters,
    DEFAULT_SORT_OPTIONS,
    DEFAULT_TYPE_OPTIONS,
    DEFAULT_STATUS_OPTIONS,
    showSearch,
    active,
    handleUndeleteClient,
  };

  return <ClientsList {...clientsListProps} />;
};
