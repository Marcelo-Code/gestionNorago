import React from "react";
import "./pricesList.css";
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
import { softUndeletePrice } from "../../../services/api/prices";
import { Height } from "@mui/icons-material";

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
    { value: "none", label: "Sin ordenar" },
    { value: "alphabetical-asc", label: "Equipo (A-Z)" },
    { value: "alphabetical-desc", label: "Equipo (Z-A)" },
    { value: "numeric-asc", label: "Total Servicio (Menor a Mayor)" },
    { value: "numeric-desc", label: "Total Servicio (Mayor a Menor)" },
    { value: "date-asc", label: "Fecha (Más antigua a Más reciente)" },
    { value: "date-desc", label: "Fecha (Más reciente a Más antigua)" },
  ];

  const sortFields = ["device", "date", "total_price"];

  const searchFilterContainerProps = {
    darkMode,
    darkColor,
    lightColor,
    buttonColor,
    toggleSearchBar,
    filteredPrices,
    setFilteredPrices,
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
      className="pricesListContainer"
    >
      <h2
        style={{ color: darkMode ? "white" : "#1976d2" }}
        className="pricesListTitle"
      >
        {active === "true" ? "Precios Servicios" : "Precios Inactivos"}
      </h2>
      {active === "true" && (
        <div
          style={{ backgroundColor: darkMode ? darkColor : "white" }}
          className="pricesListBar"
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
            {/* <SearchFilterContainer
            {...searchFilterContainerProps}
            clients={prices}
            showSearchFilter={true}
          /> */}
          </div>
        </div>
      )}

      {/* Contenedor de filter chips */}
      {/* <SearchFilterContainer
        {...searchFilterContainerProps}
        clients={prices}
        showSearchFilter={false}
      /> */}

      <div className="servicesPricesList">
        {filteredPrices.length === 0 && (
          <h2 className="notFoundTitle">No se encontraron registros</h2>
        )}

        {filteredPrices.map((price) => (
          <div
            key={price.id}
            style={{ backgroundColor: darkMode ? darkColor : "white" }}
            className="servicesPricesItem"
          >
            <span
              style={{
                width: "100%",
                textAlign: "center",
                margin: "10px 0",
                borderBottom: "1px solid  rgb(196, 217, 238",
              }}
            >
              <b style={textShadow}>SERVICIO: </b>
            </span>
            {price.service_name}

            <span
              style={{
                width: "100%",
                textAlign: "center",
                margin: "10px 0",
                borderBottom: "1px solid rgb(196, 217, 238)",
              }}
            >
              <b style={textShadow}>PRECIO: </b>
            </span>
            {currencyFormat(price.service_price)}

            {active === "true" ? (
              editMode ? (
                <div className="pricesListActions">
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
              ) : (
                <div className="pricesListActions" />
              )
            ) : (
              <div className="pricesListActions">
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
  );
};
