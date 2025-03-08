import React from "react";
import "./ClientsList.css";
import { SwitchEditionMode } from "../../../layout/switchEditionMode/SwitchEditionMode";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import BuildIcon from "@mui/icons-material/Build";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { green } from "@mui/material/colors";

const ClientsList = (clientsListProps) => {
  const {
    clients,
    handleEditModeChange,
    editMode,
    handleDeleteClient,
    darkMode,
    darkColor,
    handleGoBack,
  } = clientsListProps;
  return (
    <div
      style={{ color: darkMode ? "white" : "black" }}
      className="clientsListContainer"
    >
      <h2
        style={{ color: darkMode ? "white" : "#1976d2" }}
        className="clientsListTitle"
      >
        Clientes
      </h2>
      <div
        style={{ backgroundColor: darkMode ? darkColor : "white" }}
        className="clientsListEditionBar"
      >
        <span style={{ marginLeft: "5vw" }}>EDICIÓN</span>
        <SwitchEditionMode onChange={handleEditModeChange} checked={editMode} />
        <>
          <Link to="/clients/clientCreation">
            <Button variant={"contained"} startIcon={<PersonAddIcon />}>
              Crear Cliente
            </Button>
          </Link>
        </>
      </div>
      <div className="clientsList">
        {clients.length === 0 && (
          <h2 className="notFoundTitle">No se encontraron registros</h2>
        )}
        {clients.map((client) => (
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
              {/* {client.phone} */}
              <a
                href={`https://wa.me/${client.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: darkMode ? "white" : darkColor }}
              >
                {client.phone}
              </a>
            </div>
            <div>
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
              <div className="clientsServiceButton">
                <Link
                  to={`/services/servicesList/${client.id}`}
                  style={{ width: "100%" }}
                >
                  <Button
                    startIcon={<BuildIcon />}
                    fullWidth
                    variant="outlined"
                    sx={{
                      color: darkMode ? "white" : "#1976d2",
                      borderColor: darkMode ? "white" : "#1976d2",
                    }}
                  >
                    Ver Servicios
                  </Button>
                </Link>
              </div>
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

export default ClientsList;
