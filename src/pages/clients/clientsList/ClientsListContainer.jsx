import React, { useContext, useEffect, useState } from "react";
import "./ClientsList.css";
import ClientsList from "./ClientsList";
import { deleteClient, getClients } from "../../../services/api/clients";
import { LoadingContainer } from "../../../layout/loading/LoadingContainer";
import { GeneralContext } from "../../../context/GeneralContext";
import { darkColor } from "../../../utils/helpers";
import { ErrorContainer } from "../../../layout/error/ErrorContainer";
import { useNavigate } from "react-router-dom";

export const ClientsListContainer = () => {
  const [editMode, setEditMode] = useState(false);
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const navigate = useNavigate();

  const { darkMode } = useContext(GeneralContext);
  const handleEditModeChange = (e) => {
    setEditMode(e.target.checked);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDeleteClient = (clientId) => {
    deleteClient(clientId)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setUpdateList(!updateList);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setIsLoading(true);
    getClients()
      .then((response) => {
        console.log(response);
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
    editMode,
    handleDeleteClient,
    darkMode,
    darkColor,
    handleGoBack,
  };

  return <ClientsList {...clientsListProps} />;
};
