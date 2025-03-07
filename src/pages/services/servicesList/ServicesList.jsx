import React from "react";
import "./servicesList.css";
import { SwitchEditionMode } from "../../../layout/switchEditionMode/SwitchEditionMode";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { currencyFormat, dateFormat } from "../../../utils/helpers";

export const ServicesList = (servicesListProps) => {
  const {
    services,
    handleEditModeChange,
    editMode,
    handleDeleteService,
    darkMode,
    darkColor,
    handleGoBack,
  } = servicesListProps;

  const textShadow = { textShadow: "1px 1px 1px gray" };

  return (
    <div
      style={{ color: darkMode ? "white" : "black" }}
      className="servicesListContainer"
    >
      <h2
        style={{ color: darkMode ? "white" : "#1976d2" }}
        className="servicesListTitle"
      >
        Servicios
      </h2>
      <div
        style={{ backgroundColor: darkMode ? darkColor : "white" }}
        className="servicesListEditionBar"
      >
        <span style={{ marginLeft: "5vw" }}>EDICIÓN</span>
        <SwitchEditionMode onChange={handleEditModeChange} checked={editMode} />

        <>
          <Link to="/services/serviceCreation">
            <Button variant="contained" startIcon={<AddIcon />}>
              Crear Servicio
            </Button>
          </Link>
        </>
      </div>
      <div className="servicesList">
        {services.length === 0 && (
          <h2 className="notFoundTitle">No se encontraron registros</h2>
        )}
        {services.map((service) => (
          <div
            key={service.id}
            style={{ backgroundColor: darkMode ? darkColor : "white" }}
            className="serviceItem"
          >
            <div className="clientName" style={{ marginBottom: "10px" }}>
              <b style={textShadow}>CLIENTE:</b>
              {service.clients.name} {service.clients.last_name}
            </div>
            <div className="serviceDate" style={{ marginBottom: "10px" }}>
              <b style={textShadow}>FECHA: </b>
              {dateFormat(service.date)}
            </div>
            <div className="device" style={{ marginBottom: "10px" }}>
              <b style={textShadow}>EQUIPO REPARADO:</b>
              {service.device}
            </div>
            <div className="serviceText" style={{ marginBottom: "10px" }}>
              <b style={textShadow}>DETALLE SERVICIO: </b>
              {service.service_text}
            </div>
            <div className="inputs" style={{ marginBottom: "10px" }}>
              <b style={textShadow}>REPUESTOS UTILIZADOS:</b>
              {service.inputs}
            </div>
            <div className="serialNumber" style={{ marginBottom: "10px" }}>
              <b style={textShadow}>N° SERIE:</b>
              {service.serial_number}
            </div>
            <div className="inputsPrice" style={{ marginBottom: "10px" }}>
              <b style={textShadow}>PRECIO REPUESTOS: </b>
              {currencyFormat(service.inputs_price)}
            </div>
            <div className="totalPrice" style={{ marginBottom: "10px" }}>
              <b style={textShadow}>TOTAL SERVICIO:</b>
              {currencyFormat(service.total_price)}
            </div>
            {editMode && (
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
