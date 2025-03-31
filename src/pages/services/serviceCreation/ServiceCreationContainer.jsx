import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ServiceCreation } from "./ServiceCreation";
import { LoadingContainer } from "../../../layout/loading/LoadingContainer";
import { getClients } from "../../../services/api/clients";
import { createNewService } from "../../../services/api/services";
import {
  darkColor,
  lightColor,
  buttonColor,
  useFormData,
  handleServiceChange,
} from "../../../utils/helpers";
import { GeneralContext } from "../../../context/GeneralContext";
import { getPrices } from "../../../services/api/prices";

export const ServiceCreationContainer = () => {
  const [formData, setFormData] = useFormData();
  const [clientId, setClientId] = useState("");
  const [servicePriceId, setServicePriceId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [prices, setPrices] = useState([]);
  const [modifiedFlag, setModifiedFlag] = useState(false);
  const { darkMode } = useContext(GeneralContext);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    setFormData((prevState) => {
      const updatedState = handleServiceChange(e, prevState, prices);
      console.log(formData);
      return updatedState;
    });
    if (modifiedFlag === false) setModifiedFlag(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    createNewService(formData)
      .then((data) => {
        console.log(data);
        handleGoBack();
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getClients(), getPrices()])
      .then(([clientsResponse, pricesResponse]) => {
        console.log(clientsResponse);
        console.log(pricesResponse);
        setClients(
          (clientsResponse.data = clientsResponse.data.filter(
            (client) => client.active
          ))
        );
        setPrices(
          (pricesResponse.data = pricesResponse.data.filter(
            (price) => price.active
          ))
        );
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <LoadingContainer />;

  const serviceCreationProps = {
    handleSubmit,
    handleChange,
    formData,
    handleGoBack,
    clients,
    clientId,
    setClientId,
    prices,
    servicePriceId,
    setServicePriceId,
    isLoading,
    darkMode,
    darkColor,
    lightColor,
    buttonColor,
    modifiedFlag,
  };

  return <ServiceCreation {...serviceCreationProps} />;
};
