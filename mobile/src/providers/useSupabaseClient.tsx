import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";
import { createContext, useContext } from "react";
import "react-native-url-polyfill/auto";
import { Database } from "../domain/database.types";

const supabaseClient = createClient<Database>(
  Constants.expoConfig.extra.supabaseUrl as string,
  Constants.expoConfig.extra.supabaseAnonKey as string,
);

const SupabaseClientContext = createContext(supabaseClient);

export function SupabaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SupabaseClientContext.Provider value={supabaseClient}>
      {children}
    </SupabaseClientContext.Provider>
  );
}

export const useSupabaseClientContext = () => useContext(SupabaseClientContext);
