import React, { useContext, useEffect, useState } from "react";
import { LoadingContainer } from "../../../layout/loading/LoadingContainer";
import { GeneralContext } from "../../../context/GeneralContext";
import { darkColor, buttonColor, lightColor } from "../../../utils/helpers";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPrices,
  softDeletePrice,
  softUndeletePrice,
} from "../../../services/api/prices";
import { PricesList } from "./PricesList";

export const PricesListContainer = () => {
  const [editMode, setEditMode] = useState(false);
  const [prices, setPrices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const { darkMode } = useContext(GeneralContext);

  const [filteredPrices, setFilteredPrices] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

  const { active } = useParams();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEditModeChange = (e) => {
    setEditMode(e.target.checked);
  };

  const handleDeletePrice = (priceId) => {
    softDeletePrice(priceId)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setUpdateList(!updateList);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleUndeletePrice = (priceId) => {
    softUndeletePrice(priceId)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setUpdateList(!updateList);
        }
      })
      .catch((error) => console.log(error));
  };

  // Alternar entre barra de edición y barra de búsqueda
  //----------------------------------------------------

  const [showSearch, setShowSearch] = useState(false);
  const toggleSearchBar = () => {
    if (editMode) setEditMode(false);
    setShowSearch(!showSearch);
  };

  useEffect(() => {
    const activeValue = active === "true";
    console.log(activeValue);
    setIsLoading(true);
    getPrices()
      .then((response) => {
        console.log(response);
        response.data = response.data.filter(
          (price) => price.active === activeValue
        );
        setPrices(response.data);
        setFilteredPrices(response.data);
      })
      .catch((error) => {
        console.log(error);
        return <ErrorContainer />;
      })
      .finally(() => setIsLoading(false));
  }, [updateList, active]);

  if (isLoading) return <LoadingContainer />;

  const pricesListProps = {
    prices,
    handleEditModeChange,
    editMode,
    handleDeletePrice,
    handleUndeletePrice,
    darkMode,
    darkColor,
    lightColor,
    buttonColor,
    handleGoBack,
    toggleSearchBar,
    showSearch,
    setFilteredPrices,
    filteredPrices,
    setActiveFilters,
    activeFilters,
    active,
  };

  return <PricesList {...pricesListProps} />;
};
