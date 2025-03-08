import {
  confirmationAlert,
  errorAlert,
  successAlert,
} from "../../components/alerts/alerts.js";
import { supabaseClient } from "../config/config.js";

export const getServices = async () => {
  try {
    const { data } = await supabaseClient
      .from("services")
      .select("*, clients:client_id(name, last_name)");
    return { status: 201, message: "Servicios obtenidos con éxito", data };
  } catch (error) {
    errorAlert("Error inesperado al obtener servicios");
    return {
      status: 404,
      message: "Error al obtener servicios",
      error: error.message,
    };
  }
};

export const getService = async (serviceId) => {
  try {
    const { data } = await supabaseClient
      .from("services")
      .select()
      .eq("id", serviceId);
    return { status: 201, message: "Servicio obtenido con éxito", data };
  } catch (error) {
    errorAlert("Error inesperado al obtener servicio");
    return {
      status: 404,
      message: "Error al obtener servicio",
      error: error.message,
    };
  }
};

export const createNewService = async (newService) => {
  try {
    console.log(newService);
    await supabaseClient.from("services").insert([newService]);
    successAlert("Servicio creado con éxito");
    return { status: 201, message: "Servicio creado con éxito" };
  } catch (error) {
    errorAlert("Error al crear el servicio");
    return {
      status: 500,
      message: "Error al crear el servicio",
      error: error.message,
    };
  }
};

export const deleteService = async (serviceId) => {
  const confirmed = await confirmationAlert(
    "¿Estás seguro de que deseas eliminar este servicio?"
  );
  if (confirmed) {
    try {
      await supabaseClient.from("services").delete().eq("id", serviceId);
      successAlert("Servicio eliminado con éxito");
      return {
        status: 200,
        message: "Servicio eliminado con éxito",
      };
    } catch (error) {
      errorAlert("Error inesperado al eliminar el servicio");
      return {
        status: 500,
        message: "Error inesperado al eliminar el servicio",
        error: error.message,
      };
    }
  }
  return {
    status: 500,
    message: "Acción cancelada",
  };
};

export const softDeleteService = async (serviceId) => {
  const confirmed = await confirmationAlert(
    "¿Estás seguro de que deseas eliminar este servicio?"
  );

  if (confirmed) {
    try {
      await supabaseClient
        .from("services")
        .update({ active: false })
        .eq("id", serviceId);

      successAlert("Servicio eliminado con éxito");
      return { status: 200, message: "Servicio eliminado con éxito" };
    } catch (error) {
      errorAlert("Error al eliminar el servicio");
      return {
        status: 500,
        message: "Error al aliminar el servicio",
        error: error.message,
      };
    }
  }
};

export const softUndeleteService = async (serviceId) => {
  const confirmed = await confirmationAlert(
    "¿Estás seguro de que deseas restaurar este servicio?"
  );

  if (confirmed) {
    try {
      await supabaseClient
        .from("services")
        .update({ active: true })
        .eq("id", serviceId);

      successAlert("Servicio restaurado con éxito");
      return { status: 200, message: "Servicio restaurado con éxito" };
    } catch (error) {
      errorAlert("Error al restaurar el servicio");
      return {
        status: 500,
        message: "Error al restaurar el servicio",
        error: error.message,
      };
    }
  }
};

export const updateService = async (serviceId, updatedService) => {
  const confirmed = await confirmationAlert(
    "¿Estás seguro de que deseas actualizar este servicio?"
  );
  if (confirmed) {
    try {
      await supabaseClient
        .from("services")
        .update(updatedService)
        .eq("id", serviceId);
      successAlert("Servicio actualizado con éxito");
      return { status: 200, message: "Servicio actualizado con éxito" };
    } catch (error) {
      errorAlert("Error al actualizar el servicio");
      return {
        status: 500,
        message: "Error al actualizar el servicio",
        error: error.message,
      };
    }
  }
};
