import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ServiceModification } from "./ServiceModification";
import { getService, updateService } from "../../../services/api/services";
import { getClients } from "../../../services/api/clients";
import { LoadingContainer } from "../../../layout/loading/LoadingContainer";

export const ServiceModificationContainer = () => {
  const [formData, setFormData] = useState({
    client_id: "",
    date: null,
    device: "",
    serial_number: "",
    service_text: "",
    inputs: "",
    inputs_price: 0,
    total_price: 0,
  });

  const { serviceId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [modifiedFlag, setModifiedFlag] = useState(false);
  const [clients, setClients] = useState([]);

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
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (modifiedFlag === false) setModifiedFlag(true);
  };

  useEffect(() => {
    setIsLoading(true);
    getService(serviceId)
      .then((response) => {
        console.log(response);
        setFormData(response.data[0]);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [serviceId]);

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

  const serviceModificationProps = {
    handleChange,
    handleGoBack,
    clients,
    serviceId,
    formData,
    handleUpdateService,
    modifiedFlag,
  };

  return <ServiceModification {...serviceModificationProps} />;
};
