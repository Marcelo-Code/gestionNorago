import {
  confirmationAlert,
  errorAlert,
  successAlert,
} from "../../components/alerts/alerts";
import { supabaseClient } from "../config/config";

export const getPrices = async () => {
  try {
    const { data } = await supabaseClient
      .from("prices")
      .select("*")
      .order("service_name", { ascending: true });
    return { status: 201, message: "Precios obtenidos con éxito", data };
  } catch (error) {
    errorAlert("Error inesperado al obtener precios");
    return {
      status: 404,
      message: "Error al obtener precios",
      error: error.message,
    };
  }
};

export const getPrice = async (priceId) => {
  try {
    const { data } = await supabaseClient
      .from("prices")
      .select()
      .eq("id", priceId);
    return { status: 201, message: "Servicio obtenido con éxito", data };
  } catch (error) {
    errorAlert("Error inesperado al obtener Servicio");
    return {
      status: 404,
      message: "Error al obtener Servicio",
      error: error.message,
    };
  }
};

export const createNewPrice = async (newPrice) => {
  try {
    console.log(newPrice);
    await supabaseClient.from("prices").insert([newPrice]);
    successAlert("Precio de servicio creado con éxito");
    return { status: 201, message: "Precio de servicio creado con éxito" };
  } catch (error) {
    errorAlert("Error al crear el precio de servicio");
    return {
      status: 500,
      message: "Error al crear el precio de servicio",
      error: error.message,
    };
  }
};

export const updatePrice = async (priceId, updatedPrice, setIsLoading) => {
  const confirmed = await confirmationAlert(
    "¿Estás seguro de que deseas actualizar este servicio?"
  );
  if (confirmed) {
    setIsLoading(true);
    try {
      await supabaseClient
        .from("prices")
        .update(updatedPrice)
        .eq("id", priceId);
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

export const softDeletePrice = async (priceId) => {
  const confirmed = await confirmationAlert(
    "¿Estás seguro de que deseas eliminar este servicio?"
  );

  if (confirmed) {
    try {
      await supabaseClient
        .from("prices")
        .update({ active: false })
        .eq("id", priceId);

      successAlert("Servicio eliminado con éxito");
      return { status: 200, message: "Servicio eliminado con éxito" };
    } catch (error) {
      errorAlert("Error al eliminar el servicio");
      return {
        status: 500,
        message: "Error al eliminar el servicio",
        error: error.message,
      };
    }
  }
};

export const softUndeletePrice = async (priceId) => {
  const confirmed = await confirmationAlert(
    "¿Estás seguro de que deseas restaurar este servicio?"
  );

  if (confirmed) {
    try {
      await supabaseClient
        .from("prices")
        .update({ active: true })
        .eq("id", priceId);

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
