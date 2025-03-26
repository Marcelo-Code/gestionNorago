import React, { useState } from "react";

//Función para darle formato de moneda a los precios
export const currencyFormat = (number) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(number);
};

//Función para dar formato de fecha
export const dateFormat = (date) => {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  };
  return new Date(date).toLocaleDateString("es-AR", options);
};

//Función para manejar el estado de los formularios
export const useFormData = () => {
  const [formData, setFormData] = useState({
    date: null,
    device: "",
    serial_number: "",
    service_price_id: 0,
    service_price: 0,
    additional: "",
    additional_price: 0,
    total_price: 0,
    client_id: 0,
    active: true,
  });
  return [formData, setFormData];
};

export const usePricesFormData = () => {
  const [formData, setFormData] = useState({
    service_name: "",
    service_price: 0,
    active: true,
  });
  return [formData, setFormData];
};

//Función para manejar el estado de los formularios
export const handleServiceChange = (e, prevState, prices) => {
  const { name, value } = e.target;

  let newValue = value;

  if (name === "service_price" || name === "additional_price") {
    // Convierte el valor a un número flotante
    newValue = parseFloat(value) || 0;
  }

  let updatedState = { ...prevState, [name]: newValue };

  if (name === "service_price_id") {
    const selectedPrice = prices.find((price) => price.id === parseInt(value));
    if (selectedPrice) {
      updatedState.service_price = selectedPrice.service_price;
    }
  }

  //Calcular total_price automáticamente
  updatedState.total_price =
    (updatedState.service_price || prevState.service_price || 0) +
    (updatedState.additional_price || prevState.additional_price || 0);

  return updatedState;
};

export const darkColor = "rgba(24, 70, 102, 1)";
export const lightColor = "rgb(94, 152, 193)";
export const buttonColor = "#1976d2";
