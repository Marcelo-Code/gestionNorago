import {
  confirmationAlert,
  errorAlert,
  successAlert,
} from "../../components/alerts/alerts.js";
import { supabaseClient } from "../config/config.js";

export const getClients = async () => {
  try {
    const { data } = await supabaseClient.from("clients").select("*");

    // Combinar `name` y `last_name` en `full_name`
    const clientsWithFullName = data.map((client) => ({
      ...client,
      full_name: `${client.name} ${client.last_name}`, // Concatenar y evitar espacios extra
    }));

    return {
      status: 201,
      message: "Clientes obtenidos con éxito",
      data: clientsWithFullName,
    };
  } catch (error) {
    errorAlert("Error inesperado al obtener clientes");
    return {
      status: 404,
      message: "Error al obtener clientes",
      error: error.message,
    };
  }
};

export const getClient = async (clientId) => {
  try {
    const { data } = await supabaseClient
      .from("clients")
      .select()
      .eq("id", clientId);
    return { status: 201, message: "Cliente obtenido con éxito", data };
  } catch (error) {
    errorAlert("Error inesperado al obtener cliente");
    return {
      status: 404,
      message: "Error al obtener cliente",
      error: error.message,
    };
  }
};

export const createNewClient = async (newClient) => {
  try {
    await supabaseClient.from("clients").insert([newClient]);
    successAlert("Cliente creado con éxito");
    return { status: 201, message: "Cliente creado con éxito" };
  } catch (error) {
    errorAlert("Error al crear el cliente");
    return {
      status: 500,
      message: "Error al crear el cliente",
      error: error.message,
    };
  }
};

export const deleteClient = async (clientId) => {
  const confirmed = await confirmationAlert(
    "¿Estás seguro de que deseas eliminar este cliente?"
  );
  if (confirmed) {
    try {
      await supabaseClient.from("clients").delete().eq("id", clientId);
      successAlert("Cliente eliminado con éxito");
      return {
        status: 200,
        message: "Cliente eliminado con éxito",
      };
    } catch (error) {
      errorAlert("Error inesperado al eliminar el cliente");
      return {
        status: 500,
        message: "Error inesperado al eliminar el cliente",
        error: error.message,
      };
    }
  }
  return {
    status: 500,
    message: "Acción cancelada",
  };
};

export const softDeleteClient = async (clientId) => {
  const confirmed = await confirmationAlert(
    "¿Estás seguro de que deseas eliminar este cliente?"
  );

  if (confirmed) {
    try {
      await supabaseClient
        .from("clients")
        .update({ active: false })
        .eq("id", clientId);

      successAlert("Cliente eliminado con éxito");
      return { status: 200, message: "Cliente eliminado con éxito" };
    } catch (error) {
      errorAlert("Error al eliminar el cliente");
      return {
        status: 500,
        message: "Error al aliminar el cliente",
        error: error.message,
      };
    }
  }
};

export const softUndeleteClient = async (clientId) => {
  const confirmed = await confirmationAlert(
    "¿Estás seguro de que deseas restaurar este cliente?"
  );

  if (confirmed) {
    try {
      await supabaseClient
        .from("clients")
        .update({ active: true })
        .eq("id", clientId);

      successAlert("Cliente restaurado con éxito");
      return { status: 200, message: "Cliente restaurado con éxito" };
    } catch (error) {
      errorAlert("Error al restaurar el cliente");
      return {
        status: 500,
        message: "Error al restaurar el cliente",
        error: error.message,
      };
    }
  }
};

export const updateClient = async (clientId, updatedClient) => {
  const confirmed = await confirmationAlert(
    "¿Estás seguro de que deseas actualizar este cliente?"
  );
  if (confirmed) {
    try {
      await supabaseClient
        .from("clients")
        .update(updatedClient)
        .eq("id", clientId);
      successAlert("Cliente actualizado con éxito");
      return { status: 200, message: "Cliente actualizado con éxito" };
    } catch (error) {
      errorAlert("Error al actualizar el cliente");
      return {
        status: 500,
        message: "Error al actualizar el cliente",
        error: error.message,
      };
    }
  }
};
