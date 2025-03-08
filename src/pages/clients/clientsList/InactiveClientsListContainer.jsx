import React, { useContext, useEffect, useState } from "react";
import { getClients, softUndeleteClient } from "../../../services/api/clients";
import { LoadingContainer } from "../../../layout/loading/LoadingContainer";
import { GeneralContext } from "../../../context/GeneralContext";
import { darkColor } from "../../../utils/helpers";
import { ErrorContainer } from "../../../layout/error/ErrorContainer";
import { useNavigate } from "react-router-dom";
import { InactiveClientsList } from "./InactiveClientsList";

export const InactiveClientsListContainer = () => {
  const [inactiveClients, setInactiveClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const navigate = useNavigate();

  const { darkMode } = useContext(GeneralContext);

  const handleGoBack = () => {
    navigate(-1);
  };

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

  useEffect(() => {
    setIsLoading(true);
    getClients()
      .then((response) => {
        console.log(response);
        response.data = response.data.filter((client) => !client.active);
        setInactiveClients(response.data);
      })
      .catch((error) => {
        console.log(error);
        return <ErrorContainer />;
      })
      .finally(() => setIsLoading(false));
  }, [updateList]);

  if (isLoading) return <LoadingContainer />;

  const clientsListProps = {
    inactiveClients,
    darkMode,
    darkColor,
    handleGoBack,
    handleUndeleteClient,
  };

  return <InactiveClientsList {...clientsListProps} />;
};
