import { errorAlert } from "../../components/alerts/alerts";
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
