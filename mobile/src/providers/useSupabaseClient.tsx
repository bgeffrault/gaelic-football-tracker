import { createClient, SupabaseClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';
import { createContext, useContext } from 'react';
import 'react-native-url-polyfill/auto'
import { Database } from '../domain/database.types';



const supabaseClient = createClient<Database>(Constants.expoConfig.extra.supabaseUrl, Constants.expoConfig.extra.supabaseAnonKey)

// @ts-ignore
const SupabaseClientContext = createContext<typeof supabaseClient>();

export const SupabaseClientProvider = ({ children }: {
    children: React.ReactNode
}) => (
    <SupabaseClientContext.Provider value={supabaseClient} >
        {children}
    </SupabaseClientContext.Provider>
)

export const useSupabaseClientContext = () => useContext(SupabaseClientContext)
