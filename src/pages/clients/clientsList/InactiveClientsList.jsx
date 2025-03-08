import React from "react";
import "./inactiveClientsList.css";
import PersonIcon from "@mui/icons-material/Person";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { green } from "@mui/material/colors";

export const InactiveClientsList = (clientsListProps) => {
  const {
    inactiveClients,
    darkMode,
    darkColor,
    handleGoBack,
    handleUndeleteClient,
  } = clientsListProps;
  return (
    <div
      style={{ color: darkMode ? "white" : "black" }}
      className="inactiveClientsListContainer"
    >
      <h2
        style={{ color: darkMode ? "white" : "#1976d2" }}
        className="inactiveClientsListTitle"
      >
        Clientes Inactivos
      </h2>

      <div className="inactiveClientsList">
        {inactiveClients.length === 0 && (
          <h2 className="notFoundTitle">No se encontraron registros</h2>
        )}
        {inactiveClients.map((inactiveClient) => (
          <div
            key={inactiveClient.id}
            style={{ backgroundColor: darkMode ? darkColor : "white" }}
            className="inactiveClientsItem"
          >
            <div className="inactiveClientsName">
              <PersonIcon />
              {inactiveClient.name} {inactiveClient.last_name}
            </div>
            <div className="inactiveClientsPhone">
              <WhatsAppIcon sx={{ color: green[500] }} />
              {/* {client.phone} */}
              <a
                href={`https://wa.me/${inactiveClient.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: darkMode ? "white" : darkColor }}
              >
                {inactiveClient.phone}
              </a>
            </div>
            <div>
              <LocationOnIcon sx={{ color: "red" }} />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  inactiveClient.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: darkMode ? "white" : darkColor }}
              >
                {inactiveClient.address}
              </a>
            </div>
            <div className="inactiveClientsEmail">
              <AlternateEmailIcon />
              <a
                href={`mailto:${inactiveClient.email}`}
                style={{ color: darkMode ? "white" : darkColor }}
              >
                {inactiveClient.email}
              </a>
            </div>
            <div className="inactiveClientsListActions">
              <Link onClick={() => handleUndeleteClient(inactiveClient.id)}>
                <RestoreFromTrashIcon
                  sx={{
                    fontSize: "2em",
                    margin: "5px",
                    color: darkMode ? "white" : "#1976d2",
                  }}
                />
              </Link>
            </div>
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
