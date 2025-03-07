import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_DB_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_SERVICE_ROL;

export const supabaseClient = createClient(supabaseUrl, supabaseKey);
