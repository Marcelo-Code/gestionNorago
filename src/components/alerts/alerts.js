import Swal from "sweetalert2";
import "./alerts.css";

export const successAlert = (message) => {
  Swal.fire({
    title: `${message}`,
    icon: "success",
    draggable: true,
    showConfirmButton: true,
    customClass: {
      title: "alertTitle",
      popup: "alertPopup",
    },
  });
};

export const errorAlert = (message) => {
  Swal.fire({
    title: `${message}`,
    icon: "error",
    showConfirmButton: true,
    customClass: {
      title: "alertTitle",
      popup: "alertPopup",
    },
  });
};

export const confirmationAlert = async (message) => {
  const result = await Swal.fire({
    title: `${message}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, estoy seguro",
    cancelButtonText: "Cancelar",
    backdrop: false,
    customClass: {
      title: "alertTitle",
      popup: "alertPopup",
    },
  });

  return result.isConfirmed;
};
