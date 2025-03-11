import React, { useContext, useEffect, useRef, useState } from "react";
import "./ClientsList.css";
import ClientsList from "./ClientsList";
import { getClients, softDeleteClient } from "../../../services/api/clients";
import { LoadingContainer } from "../../../layout/loading/LoadingContainer";
import { GeneralContext } from "../../../context/GeneralContext";
import { darkColor, lightColor, buttonColor } from "../../../utils/helpers";
import { ErrorContainer } from "../../../layout/error/ErrorContainer";
import { useNavigate } from "react-router-dom";

export const ClientsListContainer = () => {
  const { darkMode } = useContext(GeneralContext);

  //Activar y desactivar el modo edición
  const [editMode, setEditMode] = useState(false);
  const handleEditModeChange = (e) => {
    setEditMode(e.target.checked);
  };

  // Alternar entre barra de edición y barra de búsqueda
  //----------------------------------------------------
  const [showSearch, setShowSearch] = useState(false);
  const searchBarRef = useRef(null);
  const editionBarRef = useRef(null);
  const toggleSearchBar = () => {
    if (!showSearch) {
      editionBarRef.current.style.transform = "translateX(-100%)";
      searchBarRef.current.style.transform = "translateX(0)";
      setEditMode(false);
    } else {
      editionBarRef.current.style.transform = "translateX(0)";
      searchBarRef.current.style.transform = "translateX(100%)";
    }
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

  //Importar clientes de la base de datos
  //------------------------------------
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getClients()
      .then((response) => {
        console.log(response);
        response.data = response.data.filter((client) => client.active);
        setClients(response.data);
      })
      .catch((error) => {
        console.log(error);
        return <ErrorContainer />;
      })
      .finally(() => setIsLoading(false));
  }, [updateList]);

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
    searchBarRef,
    editionBarRef,
  };

  return <ClientsList {...clientsListProps} />;
};
