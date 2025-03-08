import { useContext, useState } from "react";
import { ClientCreation } from "./ClientCreation";
import { useNavigate } from "react-router-dom";
import { createNewClient } from "../../../services/api/clients";
import { LoadingContainer } from "../../../layout/loading/LoadingContainer";
import { darkColor, lightColor, buttonColor } from "../../../utils/helpers";
import { GeneralContext } from "../../../context/GeneralContext";
export const ClientCreationContainer = () => {
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    phone: "",
    email: "",
    address: "",
    active: true,
  });

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [modifiedFlag, setModifiedFlag] = useState(false);

  const { darkMode } = useContext(GeneralContext);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    createNewClient(formData)
      .then((data) => {
        console.log(data);
        handleGoBack();
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  if (isLoading) return <LoadingContainer />;

  const clientCreationProps = {
    handleSubmit,
    handleChange,
    formData,
    handleGoBack,
    isLoading,
    modifiedFlag,
    darkMode,
    darkColor,
    lightColor,
    buttonColor,
  };

  return <ClientCreation {...clientCreationProps} />;
};
