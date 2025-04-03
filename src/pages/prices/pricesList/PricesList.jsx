import React from "react";
import "./pricesList.css";
import "../../../assets/global.css";
import { SwitchEditionMode } from "../../../layout/switchEditionMode/SwitchEditionMode";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { currencyFormat } from "../../../utils/helpers";
import { SearchFilterContainer } from "../../../layout/filter/SearchFilterContainer";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";

export const PricesList = (servicesListProps) => {
  const {
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
  } = servicesListProps;

  const DEFAULT_STATUS_OPTIONS = [
    // { value: "all", label: "Todos" },
    // { value: "active", label: "Activos" },
    // { value: "inactive", label: "Inactivos" },
    // { value: "pending", label: "Pendientes" },
  ];

  const DEFAULT_TYPE_OPTIONS = [
    // { value: "all", label: "Todos" },
    // { value: "individual", label: "Individual" },
    // { value: "company", label: "Empresa" },
    // { value: "government", label: "Gobierno" },
  ];

  const DEFAULT_SORT_OPTIONS = [
    { value: "none", label: "Sin ordenar", name: "none" },
    {
      value: "alphabetical-asc",
      label: "Servicio (A-Z)",
      name: "service_name",
    },
    {
      value: "alphabetical-desc",
      label: "Servicio (Z-A)",
      name: "service_name",
    },
    {
      value: "numeric-asc",
      label: "Precio Servicio (Menor a Mayor)",
      name: "service_price",
    },
    {
      value: "numeric-desc",
      label: "Precio Servicio (Mayor a Menor)",
      name: "service_price",
    },
    // { value: "date-asc", label: "Fecha (Más antigua a Más reciente)" },
    // { value: "date-desc", label: "Fecha (Más reciente a Más antigua)" },
  ];

  const sortFields = ["service_name", "service_price"];

  const searchFilterContainerProps = {
    darkMode,
    darkColor,
    lightColor,
    buttonColor,
    toggleSearchBar,
    setFilteredClients: setFilteredPrices,
    clients: prices,
    activeFilters,
    setActiveFilters,
    DEFAULT_STATUS_OPTIONS,
    DEFAULT_TYPE_OPTIONS,
    DEFAULT_SORT_OPTIONS,
    sortFields,
  };

  const textShadow = { textShadow: "1px 1px 1px gray" };

  return (
    <div
      style={{ color: darkMode ? "white" : "black" }}
      className="generalContainer"
    >
      <h2
        style={{ color: darkMode ? "white" : "#1976d2" }}
        className="generalTitle"
      >
        {active === "true" ? "Precios Servicios" : "Precios Inactivos"}
      </h2>
      {active === "true" && (
        <div
          style={{ backgroundColor: darkMode ? darkColor : "white" }}
          className="generalBar"
        >
          <div
            className={`editionBar ${
              showSearch ? "editionBarHidden" : "editionBarShowed"
            }`}
            style={{
              backgroundColor: darkMode ? darkColor : "white",
              transition: "transform 300ms ease-in-out",
            }}
          >
            <span style={{ fontSize: "0.9em", verticalAlign: "middle" }}>
              EDICIÓN
              <SwitchEditionMode
                onChange={handleEditModeChange}
                checked={editMode}
              />
            </span>
            <Link to="/prices/priceCreation">
              <Button variant={"contained"} startIcon={<AddIcon />}>
                Precio
              </Button>
            </Link>

            <IconButton
              onClick={() => toggleSearchBar()}
              size="small"
              sx={{ color: darkMode ? "white" : buttonColor }}
            >
              <SearchIcon />
            </IconButton>
          </div>

          <div
            className={`searchBar ${
              showSearch ? "searchBarShowed" : "searchBarHidden"
            }`}
            style={{
              backgroundColor: darkMode ? darkColor : "white",
              transition: "transform 300ms ease-in-out",
            }}
          >
            {/* Barra de búsqueda y filtros */}
            <SearchFilterContainer
              {...searchFilterContainerProps}
              showSearchFilter={true}
            />
          </div>
        </div>
      )}

      {/* Contenedor de filter chips */}
      <SearchFilterContainer
        {...searchFilterContainerProps}
        showSearchFilter={false}
      />

      <div className="generalList">
        {filteredPrices.length === 0 && (
          <h2 className="notFoundTitle">No se encontraron registros</h2>
        )}

        {filteredPrices.map((price) => (
          <div
            key={price.id}
            style={{
              backgroundColor: darkMode ? darkColor : "white",
              height: editMode ? "200px" : "150px",
            }}
            className="servicesPricesItem"
          >
            <span className="servicesPricesItemName">
              <span>{price.service_name}</span>
              <span>{currencyFormat(price.service_price)}</span>
            </span>

            {/* Modo activo y en edición */}
            {active === "true" && editMode && (
              <div className="generalActions">
                <Link onClick={() => handleDeletePrice(price.id)}>
                  <DeleteIcon
                    sx={{
                      fontSize: "2em",
                      margin: "5px",
                      color: darkMode ? "white" : "#1976d2",
                    }}
                  />
                </Link>
                <Link to={`/prices/priceModification/${price.id}`}>
                  <EditIcon
                    sx={{
                      fontSize: "2em",
                      margin: "5px",
                      color: darkMode ? "white" : "#1976d2",
                    }}
                  />
                </Link>
              </div>
            )}
            {/* Modo inactivo */}
            {active === "false" && (
              <div className="generalActions">
                <Link onClick={() => handleUndeletePrice(price.id)}>
                  <RestoreFromTrashIcon
                    sx={{
                      fontSize: "2em",
                      margin: "5px",
                      color: darkMode ? "white" : "#1976d2",
                    }}
                  />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="buttonBackContainer">
        <Button
          variant="outlined"
          sx={{
            color: darkMode ? "white" : "#1976d2",
            backgroundColor: darkMode ? darkColor : "white",
            maxWidth: "600px",
            width: "80%",
            margin: "20px",
          }}
          onClick={handleGoBack}
        >
          Volver
        </Button>
      </div>
    </div>
  );
};
