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

export const PricesList = (servicesListProps) => {
  const {
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
        Precios
      </h2>
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
          <Link to="/services/serviceCreation">
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

        {/* <table>
          <thead>
            <tr style={{ backgroundColor: darkMode ? darkColor : "white" }}>
              <th style={textShadow}>NOMBRE</th>
              <th style={textShadow}>PRECIO</th>
              {editMode && <th style={textShadow}>EDICIÓN</th>}
            </tr>
          </thead>
          <tbody>
            {filteredPrices.map((price) => (
              <tr
                key={price.id}
                style={{ backgroundColor: darkMode ? darkColor : "white" }}
                className="servicesPricesItem"
              >
                <td style={{ minWidth: "250px", paddingLeft: "40px" }}>
                  {price.service_name}
                </td>
                <td>{currencyFormat(price.service_price)}</td>
                {editMode && (
                  <td>
                    <div className="servicesListActions">
                      <Link>
                        <DeleteIcon
                          sx={{
                            fontSize: "2em",
                            margin: "5px",
                            color: darkMode ? "white" : "#1976d2",
                          }}
                        />
                      </Link>
                      <Link>
                        <EditIcon
                          sx={{
                            fontSize: "2em",
                            margin: "5px",
                            color: darkMode ? "white" : "#1976d2",
                          }}
                        />
                      </Link>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table> */}

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

            {editMode && (
              <div className="servicesListActions">
                <Link>
                  <DeleteIcon
                    sx={{
                      fontSize: "2em",
                      margin: "5px",
                      color: darkMode ? "white" : "#1976d2",
                    }}
                  />
                </Link>
                <Link>
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
