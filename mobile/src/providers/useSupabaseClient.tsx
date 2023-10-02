import { createClient, SupabaseClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';
import { createContext, useContext } from 'react';
import 'react-native-url-polyfill/auto'

// @ts-ignore
const SupabaseClientContext = createContext<SupabaseClient<any, "public", any>>();

const supabaseClient = createClient(Constants.expoConfig.extra.supabaseUrl, Constants.expoConfig.extra.supabaseAnonKey)


export const SupabaseClientProvider = ({ children }: {
    children: React.ReactNode
}) => (
    <SupabaseClientContext.Provider value={supabaseClient} >
        {children}
    </SupabaseClientContext.Provider>
)

export const useSupabaseClientContext = () => useContext(SupabaseClientContext)
