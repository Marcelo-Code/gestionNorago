import "./ClientsList.css";
import "../../../assets/global.css";
import { SwitchEditionMode } from "../../../layout/switchEditionMode/SwitchEditionMode";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import BuildIcon from "@mui/icons-material/Build";
import { Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { green } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";
import { SearchFilterContainer } from "../../../layout/filter/SearchFilterContainer";

export const ClientsList = (clientsListProps) => {
  const {
    clients,
    handleEditModeChange,
    editMode,
    handleDeleteClient,
    darkMode,
    darkColor,
    lightColor,
    buttonColor,
    handleGoBack,
    toggleSearchBar,
    filteredClients,
    setFilteredClients,
    activeFilters,
    setActiveFilters,
    DEFAULT_SORT_OPTIONS,
    DEFAULT_TYPE_OPTIONS,
    DEFAULT_STATUS_OPTIONS,
    showSearch,
  } = clientsListProps;

  const sortFields = ["full_name", "phone", "email", "address"];

  const searchFilterContainerProps = {
    darkMode,
    darkColor,
    lightColor,
    buttonColor,
    toggleSearchBar,
    filteredClients,
    setFilteredClients,

    clients,

    activeFilters,
    setActiveFilters,
    DEFAULT_STATUS_OPTIONS,
    DEFAULT_TYPE_OPTIONS,
    DEFAULT_SORT_OPTIONS,
    sortFields,
  };

  return (
    <div
      style={{ color: darkMode ? "white" : "black" }}
      className="generalContainer"
    >
      <h2
        style={{ color: darkMode ? "white" : "#1976d2" }}
        className="generalTitle"
      >
        Clientes
      </h2>
      <div
        style={{
          backgroundColor: darkMode ? darkColor : "white",
        }}
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
          <Link to="/clients/clientCreation">
            <Button variant={"contained"} startIcon={<PersonAddIcon />}>
              Cliente
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
      {/* Contenedor de filter chips */}
      <SearchFilterContainer
        {...searchFilterContainerProps}
        showSearchFilter={false}
      />

      <div className="generalList">
        {filteredClients.length === 0 && (
          <h2 className="notFoundTitle">No se encontraron registros</h2>
        )}
        {filteredClients.map((client) => (
          <div
            key={client.id}
            style={{ backgroundColor: darkMode ? darkColor : "white" }}
            className="clientsItem"
          >
            <div className="clientsName">
              <PersonIcon />
              {client.name} {client.last_name}
            </div>
            <div className="clientsPhone">
              <WhatsAppIcon sx={{ color: green[500] }} />
              <a
                href={`https://wa.me/${client.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: darkMode ? "white" : darkColor }}
              >
                {client.phone}
              </a>
            </div>
            <div className="clientsAddress">
              <LocationOnIcon sx={{ color: "red" }} />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  client.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: darkMode ? "white" : darkColor }}
              >
                {client.address}
              </a>
            </div>
            <div className="clientsEmail">
              <AlternateEmailIcon />
              <a
                href={`mailto:${client.email}`}
                style={{ color: darkMode ? "white" : darkColor }}
              >
                {client.email}
              </a>
            </div>
            {!editMode ? (
              <Link
                className="clientsServiceButton"
                to={`/services/servicesList/${client.id}`}
              >
                <Button
                  startIcon={<BuildIcon />}
                  variant="outlined"
                  sx={{
                    color: darkMode ? "white" : buttonColor,
                    borderColor: darkMode ? "white" : buttonColor,
                  }}
                >
                  Ver Servicios
                </Button>
              </Link>
            ) : (
              <div className="clientsListActions">
                <Link onClick={() => handleDeleteClient(client.id)}>
                  <DeleteIcon
                    sx={{
                      fontSize: "2em",
                      margin: "5px",
                      color: darkMode ? "white" : "#1976d2",
                    }}
                  />
                </Link>
                <Link to={`/clients/clientModification/${client.id}`}>
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
