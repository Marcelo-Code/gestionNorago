import React from "react";
import "./inactiveServicesList.css";
import { Button } from "@mui/material";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { Link } from "react-router-dom";
import { currencyFormat, dateFormat } from "../../../utils/helpers";

export const InactiveServicesList = (inactiveServicesListProps) => {
  const {
    inactiveServices,
    handleUndeleteService,
    darkMode,
    darkColor,
    handleGoBack,
  } = inactiveServicesListProps;

  const textShadow = { textShadow: "1px 1px 1px gray" };

  return (
    <div
      style={{ color: darkMode ? "white" : "black" }}
      className="inactiveServicesListContainer"
    >
      <h2
        style={{ color: darkMode ? "white" : "#1976d2" }}
        className="inactiveServicesListTitle"
      >
        Servicios Inactivos
      </h2>
      <div className="inactiveServicesList">
        {inactiveServices.length === 0 && (
          <h2 className="notFoundTitle">No se encontraron registros</h2>
        )}
        {inactiveServices.map((inactiveService) => (
          <div
            key={inactiveService.id}
            style={{ backgroundColor: darkMode ? darkColor : "white" }}
            className="inactiveServicesItem"
          >
            <div
              className="inactiveServicesClientName"
              style={{ marginBottom: "10px" }}
            >
              <b style={textShadow}>CLIENTE:</b>
              {inactiveService.clients.name} {inactiveService.clients.last_name}
            </div>
            <div
              className="inactiveServicesDate"
              style={{ marginBottom: "10px" }}
            >
              <b style={textShadow}>FECHA: </b>
              {dateFormat(inactiveService.date)}
            </div>
            <div
              className="inactiveServicesDevice"
              style={{ marginBottom: "10px" }}
            >
              <b style={textShadow}>EQUIPO REPARADO:</b>
              {inactiveService.device}
            </div>
            <div
              className="inactiveServicesText"
              style={{ marginBottom: "10px" }}
            >
              <b style={textShadow}>DETALLE SERVICIO: </b>
              {inactiveService.service_text}
            </div>
            <div
              className="inactiveServicesInputs"
              style={{ marginBottom: "10px" }}
            >
              <b style={textShadow}>REPUESTOS UTILIZADOS:</b>
              {inactiveService.inputs}
            </div>
            <div
              className="inactiveServicesSerialNumber"
              style={{ marginBottom: "10px" }}
            >
              <b style={textShadow}>N° SERIE:</b>
              {inactiveService.serial_number}
            </div>
            <div
              className="inactiveServicesInputsPrice"
              style={{ marginBottom: "10px" }}
            >
              <b style={textShadow}>PRECIO REPUESTOS: </b>
              {currencyFormat(inactiveService.inputs_price)}
            </div>
            <div
              className="inactiveServicesTotalPrice"
              style={{ marginBottom: "10px" }}
            >
              <b style={textShadow}>TOTAL SERVICIO:</b>
              {currencyFormat(inactiveService.total_price)}
            </div>
            <div className="inactiveServicesListActions">
              <Link onClick={() => handleUndeleteService(inactiveService.id)}>
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
