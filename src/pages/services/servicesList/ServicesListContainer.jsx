import React, { useContext, useEffect, useState } from "react";
import { ServicesList } from "./ServicesList";
import { deleteService, getServices } from "../../../services/api/services";
import { LoadingContainer } from "../../../layout/loading/LoadingContainer";
import { GeneralContext } from "../../../context/GeneralContext";
import { darkColor } from "../../../utils/helpers";
import { useNavigate, useParams } from "react-router-dom";

export const ServicesListContainer = () => {
  const [editMode, setEditMode] = useState(false);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const { darkMode } = useContext(GeneralContext);
  const { clientId = null } = useParams();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEditModeChange = (e) => {
    setEditMode(e.target.checked);
  };

  const handleDeleteService = (clientId) => {
    deleteService(clientId)
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
    getServices()
      .then((response) => {
        console.log(response);
        if (clientId)
          response.data = response.data.filter(
            (service) => service.client_id === parseInt(clientId)
          );
        setServices(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [updateList, clientId]);

  if (isLoading) return <LoadingContainer />;

  const servicesListProps = {
    services,
    handleEditModeChange,
    editMode,
    handleDeleteService,
    darkMode,
    darkColor,
    handleGoBack,
  };

  return <ServicesList {...servicesListProps} />;
};
