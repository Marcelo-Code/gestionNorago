import React from "react";
import "./servicesList.css";
import "../../../assets/global.css";
import { SwitchEditionMode } from "../../../layout/switchEditionMode/SwitchEditionMode";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { currencyFormat, dateFormat } from "../../../utils/helpers";
import { SearchFilterContainer } from "../../../layout/filter/SearchFilterContainer";

export const ServicesList = (servicesListProps) => {
  const {
    services,
    handleEditModeChange,
    editMode,
    handleDeleteService,
    darkMode,
    darkColor,
    lightColor,
    buttonColor,
    handleGoBack,
    toggleSearchBar,
    showSearch,
    setFilteredClients,
    filteredClients,
    setActiveFilters,
    activeFilters,
    active,
    handleUndeleteService,
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
    { value: "alphabetical-asc", label: "Equipo (A-Z)", name: "device" },
    { value: "alphabetical-desc", label: "Equipo (Z-A)", name: "device" },
    {
      value: "numeric-asc",
      label: "Total Servicio (Menor a Mayor)",
      name: "total_price",
    },
    {
      value: "numeric-desc",
      label: "Total Servicio (Mayor a Menor)",
      name: "total_price",
    },
    {
      value: "date-asc",
      label: "Fecha (Más antigua a Más reciente)",
      name: "date",
    },
    {
      value: "date-desc",
      label: "Fecha (Más reciente a Más antigua)",
      name: "date",
    },
  ];

  const sortFields = [
    "device",
    "clients.full_name",
    "prices.service_name",
    "additional",
    "serial_number",
    "total_price",
  ];

  const searchFilterContainerProps = {
    darkMode,
    darkColor,
    lightColor,
    buttonColor,
    toggleSearchBar,
    filteredClients,
    setFilteredClients,
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
        {active === "true" ? "Servicios" : "Servicios Inactivos"}
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
            <Link to="/services/serviceCreation">
              <Button variant={"contained"} startIcon={<AddIcon />}>
                Servicio
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
              clients={services}
              showSearchFilter={true}
            />
          </div>
        </div>
      )}
      {/* Contenedor de filter chips */}
      <SearchFilterContainer
        {...searchFilterContainerProps}
        clients={services}
        showSearchFilter={false}
      />

      <div className="generalList">
        {filteredClients.length === 0 && (
          <h2 className="notFoundTitle">No se encontraron registros</h2>
        )}
        {filteredClients.map((service) => (
          <div
            key={service.id}
            style={{ backgroundColor: darkMode ? darkColor : "white" }}
            className="servicesItem"
          >
            <div
              className="servicesClientName"
              style={{ marginBottom: "10px" }}
            >
              <b style={textShadow}>CLIENTE:</b>
              {service.clients.full_name}
            </div>
            <div className="servicesDate" style={{ marginBottom: "10px" }}>
              <b style={textShadow}>FECHA: </b>
              {dateFormat(service.date)}
            </div>
            <div className="servicesDevice" style={{ marginBottom: "10px" }}>
              <b style={textShadow}>EQUIPO REPARADO:</b>
              {service.device}
            </div>
            <div
              className="servicesSerialNumber"
              style={{ marginBottom: "10px" }}
            >
              <b style={textShadow}>N° SERIE:</b>
              {service.serial_number}
            </div>
            <div
              className="servicesText"
              style={{
                marginBottom: "10px",
              }}
            >
              <b style={textShadow}>SERVICIO: </b>
              {/* <span style={{ maxWidth: "40%", wordWrap: "break-word" }}> */}
              {service.prices.service_name}
              {/* </span> */}
            </div>
            <div className="servicesPrice" style={{ marginBottom: "10px" }}>
              <b style={textShadow}>PRECIO SERVICIO: </b>
              {currencyFormat(service.service_price)}
            </div>
            <div
              className="servicesAdditional"
              style={{ marginBottom: "10px" }}
            >
              <b style={textShadow}>ADICIONAL:</b>
              {service.additional}
            </div>
            <div
              className="servicesAdditionalPrice"
              style={{ marginBottom: "10px" }}
            >
              <b style={textShadow}>PRECIO ADICIONAL: </b>
              {currencyFormat(service.additional_price)}
            </div>
            <div
              className="servicesTotalPrice"
              style={{ marginBottom: "10px" }}
            >
              <b style={textShadow}>TOTAL SERVICIO:</b>
              {currencyFormat(service.total_price)}
            </div>
            {active === "true" && editMode && (
              <div className="servicesListActions">
                <Link onClick={() => handleDeleteService(service.id)}>
                  <DeleteIcon
                    sx={{
                      fontSize: "2em",
                      margin: "5px",
                      color: darkMode ? "white" : "#1976d2",
                    }}
                  />
                </Link>
                <Link to={`/services/serviceModification/${service.id}`}>
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
              <div className="servicesListActions">
                <Link onClick={() => handleUndeleteService(service.id)}>
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
