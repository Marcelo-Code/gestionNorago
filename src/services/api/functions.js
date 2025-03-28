import { supabaseClient } from "../config/config.js";

//Función para obtener el tamaño de la base de datos
export const getDatabaseSize = async () => {
  const { data, error } = await supabaseClient.rpc("get_database_size");

  if (error) {
    console.error("Error obteniendo el tamaño de la base de datos:", error);
    return "Error al obtener tamaño de base de datos";
  }
  console.log("Tamaño de la base de datos:", data);
  return "Tamaño de base de datos: " + data;
};
