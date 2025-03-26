import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingContainer } from "../../../layout/loading/LoadingContainer";
import {
  darkColor,
  lightColor,
  buttonColor,
  usePricesFormData,
} from "../../../utils/helpers";
import { GeneralContext } from "../../../context/GeneralContext";
import { createNewPrice } from "../../../services/api/prices";
import { PriceCreation } from "./PriceCreation";
export const PriceCreationContainer = () => {
  const [formData, setFormData] = usePricesFormData();

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
    createNewPrice(formData)
      .then((data) => {
        console.log(data);
        handleGoBack();
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  if (isLoading) return <LoadingContainer />;

  const priceCreationProps = {
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

  return <PriceCreation {...priceCreationProps} />;
};
