import React from "react";
import "./ClientsList.css";
import { SwitchEditionMode } from "../../../layout/switchEditionMode/switchEditionMode";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import HomeIcon from "@mui/icons-material/Home";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import BuildIcon from "@mui/icons-material/Build";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

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
        className="clientListEditionBar"
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
            className="clientItem"
          >
            <div className="clientName">
              <PersonIcon />
              {client.name} {client.last_name}
            </div>
            <div className="clientPhone">
              <PhoneIphoneIcon />
              {client.phone}
            </div>
            <div className="clientAddress">
              <HomeIcon />
              {client.address}
            </div>
            <div className="clientEmail">
              <AlternateEmailIcon />
              <a href={`mailto:${client.email}`} className="clientEmail">
                {client.email}
              </a>
            </div>
            {!editMode ? (
              <div className="clientServiceButton">
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
              <div className="clientListActions">
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
          borderColor: darkMode ? "white" : "#1976d2",
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
