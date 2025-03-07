import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ServiceCreation } from "./ServiceCreation";
import { LoadingContainer } from "../../../layout/loading/LoadingContainer";
import { getClients } from "../../../services/api/clients";
import { createNewService } from "../../../services/api/services";

export const ServiceCreationContainer = () => {
  const [formData, setFormData] = useState({
    date: null,
    device: "",
    serial_number: "",
    service_text: "",
    inputs: "",
    inputs_price: 0,
    total_price: 0,
    client_id: 0,
    active: true,
  });

  const [clientId, setClientId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [clients, setClients] = useState([]);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "total_price" || name === "inputs_price") {
      // Convierte el valor a un número flotante
      newValue = parseFloat(value);
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
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
    getClients()
      .then((response) => {
        console.log(response);
        setClients(response.data);
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
    isLoading,
  };

  return <ServiceCreation {...serviceCreationProps} />;
};
