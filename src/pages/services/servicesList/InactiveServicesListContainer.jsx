import React, { useContext, useEffect, useState } from "react";
import {
  getServices,
  softUndeleteService,
} from "../../../services/api/services";
import { LoadingContainer } from "../../../layout/loading/LoadingContainer";
import { GeneralContext } from "../../../context/GeneralContext";
import { darkColor } from "../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { InactiveServicesList } from "./InactiveServicesList";

export const InactiveServicesListContainer = () => {
  const [inactiveServices, setInactiveServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const { darkMode } = useContext(GeneralContext);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
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

  useEffect(() => {
    setIsLoading(true);
    getServices()
      .then((response) => {
        console.log(response);
        response.data = response.data.filter((service) => !service.active);
        setInactiveServices(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [updateList]);

  if (isLoading) return <LoadingContainer />;

  const inactiveServicesListProps = {
    inactiveServices,
    handleUndeleteService,
    darkMode,
    darkColor,
    handleGoBack,
  };

  return <InactiveServicesList {...inactiveServicesListProps} />;
};
