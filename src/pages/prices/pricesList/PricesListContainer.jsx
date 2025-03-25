import React, { useContext, useEffect, useState } from "react";
import { LoadingContainer } from "../../../layout/loading/LoadingContainer";
import { GeneralContext } from "../../../context/GeneralContext";
import { darkColor, buttonColor, lightColor } from "../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { getPrices } from "../../../services/api/prices";
import { PricesList } from "./PricesList";

export const PricesListContainer = () => {
  const [editMode, setEditMode] = useState(false);
  const [prices, setPrices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const { darkMode } = useContext(GeneralContext);

  const [filteredPrices, setFilteredPrices] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEditModeChange = (e) => {
    setEditMode(e.target.checked);
  };

  //   const handleDeleteService = (clientId) => {
  //     softDeleteService(clientId)
  //       .then((response) => {
  //         if (response.status === 200) {
  //           console.log(response);
  //           setUpdateList(!updateList);
  //         }
  //       })
  //       .catch((error) => console.log(error));
  //   };

  // Alternar entre barra de edición y barra de búsqueda
  //----------------------------------------------------

  const [showSearch, setShowSearch] = useState(false);
  const toggleSearchBar = () => {
    if (editMode) setEditMode(false);
    setShowSearch(!showSearch);
  };

  useEffect(() => {
    setIsLoading(true);
    getPrices()
      .then((response) => {
        console.log(response);
        response.data = response.data.filter((price) => price.active);
        setPrices(response.data);
        setFilteredPrices(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [updateList]);

  if (isLoading) return <LoadingContainer />;

  const pricesListProps = {
    prices,
    handleEditModeChange,
    editMode,
    // handleDeleteService,
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
  };

  return <PricesList {...pricesListProps} />;
};
