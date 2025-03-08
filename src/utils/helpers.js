export const currencyFormat = (number) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(number);
};

export const dateFormat = (date) => {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  };
  return new Date(date).toLocaleDateString("es-AR", options);
};

export const darkColor = "rgba(24, 70, 102, 1)";
export const lightColor = "rgb(94, 152, 193)";
export const buttonColor = "#1976d2";
