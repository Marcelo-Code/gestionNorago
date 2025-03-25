import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ServiceCreation } from "./ServiceCreation";
import { LoadingContainer } from "../../../layout/loading/LoadingContainer";
import { getClients } from "../../../services/api/clients";
import { createNewService } from "../../../services/api/services";
import { darkColor, lightColor, buttonColor } from "../../../utils/helpers";
import { GeneralContext } from "../../../context/GeneralContext";
import { getPrices } from "../../../services/api/prices";

export const ServiceCreationContainer = () => {
  const [formData, setFormData] = useState({
    date: null,
    device: "",
    serial_number: "",
    service_price_id: 0,
    service_price: 0,
    additional: "",
    additional_price: 0,
    total_price: 0,
    client_id: 0,
    active: true,
  });

  const [clientId, setClientId] = useState("");
  const [servicePriceId, setServicePriceId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [prices, setPrices] = useState([]);
  const { darkMode } = useContext(GeneralContext);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "service_price" || name === "additional_price") {
      // Convierte el valor a un número flotante
      newValue = parseFloat(value) || 0;
    }

    setFormData((prevState) => {
      let updatedState = { ...prevState, [name]: newValue };

      if (name === "service_price_id") {
        const selectedPrice = prices.find(
          (price) => price.id === parseInt(value)
        );
        if (selectedPrice) {
          updatedState.service_price = selectedPrice.service_price;
        }
      }

      //Calcular total_price automáticamente
      updatedState.total_price =
        (updatedState.service_price || prevState.service_price || 0) +
        (updatedState.additional_price || prevState.additional_price || 0);

      return updatedState;
    });
    console.log(formData);
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
        setClients(clientsResponse.data);
        setPrices(pricesResponse.data);
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
  };

  return <ServiceCreation {...serviceCreationProps} />;
};
