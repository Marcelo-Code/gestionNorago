import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingContainer } from "../../../layout/loading/LoadingContainer";
import {
  darkColor,
  lightColor,
  buttonColor,
  usePricesFormData,
} from "../../../utils/helpers";
import { GeneralContext } from "../../../context/GeneralContext";
import { getPrice, updatePrice } from "../../../services/api/prices";
import { PriceModification } from "./PriceModification";
export const PriceModificationContainer = () => {
  const [formData, setFormData] = usePricesFormData();
  const { priceId } = useParams();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [modifiedFlag, setModifiedFlag] = useState(false);
  const [price, setPrice] = useState({});

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

  const handleUpdatePrice = (e, formData, priceId) => {
    e.preventDefault();

    updatePrice(priceId, formData, setIsLoading)
      .then((data) => {
        console.log(data);
        handleGoBack();
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);

    Promise.all([getPrice(priceId)])
      .then(([priceResponse]) => {
        console.log(priceResponse);
        setFormData(priceResponse.data[0]);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [priceId]);

  if (isLoading) return <LoadingContainer />;

  const priceModificationProps = {
    handleUpdatePrice,
    handleChange,
    formData,
    priceId,
    handleGoBack,
    isLoading,
    modifiedFlag,
    darkMode,
    darkColor,
    lightColor,
    buttonColor,
  };

  return <PriceModification {...priceModificationProps} />;
};
