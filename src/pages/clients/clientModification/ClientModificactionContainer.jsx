import { useEffect, useState } from "react";
import { ClientModification } from "./ClientModification";
import { useNavigate, useParams } from "react-router-dom";
import { getClient, updateClient } from "../../../services/api/clients";
import { LoadingContainer } from "../../../layout/loading/LoadingContainer";

export const ClientModificactionContainer = () => {
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    phone: "",
    email: "",
    address: "",
    active: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [modifiedFlag, setModifiedFlag] = useState(false);

  const { clientId } = useParams();
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

  const handleUpdateClient = (clientId, formData) => {
    updateClient(clientId, formData)
      .then((response) => {
        console.log(response);
        if (response) handleGoBack();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setIsLoading(true);
    getClient(clientId)
      .then((response) => {
        console.log(response);
        setFormData(response.data[0]);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [clientId]);

  if (isLoading) return <LoadingContainer />;

  const clientModificationProps = {
    handleUpdateClient,
    handleChange,
    formData,
    handleGoBack,
    clientId,
    modifiedFlag,
  };
  return <ClientModification {...clientModificationProps} />;
};
