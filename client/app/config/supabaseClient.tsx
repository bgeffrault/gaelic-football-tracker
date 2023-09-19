import { createClient } from "@supabase/supabase-js";
import { Database } from "./Database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabasePsw = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabaseClient = createClient<Database>(supabaseUrl, supabasePsw, {
  auth: { persistSession: false },
});

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

export default supabaseClient;
