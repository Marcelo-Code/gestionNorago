import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ServiceModification } from "./ServiceModification";
import { getService, updateService } from "../../../services/api/services";
import { getClients } from "../../../services/api/clients";
import { LoadingContainer } from "../../../layout/loading/LoadingContainer";
import {
  darkColor,
  lightColor,
  buttonColor,
  useFormData,
  handleServiceChange,
} from "../../../utils/helpers";
import { GeneralContext } from "../../../context/GeneralContext";
import { getPrices } from "../../../services/api/prices";

export const ServiceModificationContainer = () => {
  const [formData, setFormData] = useFormData();
  const { serviceId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [modifiedFlag, setModifiedFlag] = useState(false);
  const [clients, setClients] = useState([]);
  const [prices, setPrices] = useState([]);
  const { darkMode } = useContext(GeneralContext);

  const handleUpdateService = (serviceId, formData) => {
    updateService(serviceId, formData)
      .then((response) => {
        console.log(response);
        if (response) handleGoBack();
      })
      .catch((error) => console.log(error));
  };

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    setFormData((prevState) => {
      const updatedState = handleServiceChange(e, prevState, prices);
      if (JSON.stringify(updatedState) !== JSON.stringify(prevState)) {
        setModifiedFlag(true);
      }
      return updatedState;
    });
  };

  useEffect(() => {
    setIsLoading(true);

    Promise.all([getClients(), getPrices(), getService(serviceId)])
      .then(([clientsResponse, pricesResponse, serviceResponse]) => {
        console.log(clientsResponse);
        console.log(pricesResponse);
        console.log(serviceResponse);
        setClients(clientsResponse.data);
        setPrices(pricesResponse.data);
        setFormData(serviceResponse.data[0]);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [serviceId]);

  if (isLoading) return <LoadingContainer />;

  const serviceModificationProps = {
    handleChange,
    handleGoBack,
    clients,
    prices,
    serviceId,
    formData,
    handleUpdateService,
    modifiedFlag,
    darkMode,
    darkColor,
    lightColor,
    buttonColor,
  };

  return <ServiceModification {...serviceModificationProps} />;
};
