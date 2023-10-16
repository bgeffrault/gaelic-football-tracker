import { createClient } from '@supabase/supabase-js'
import { Database } from './Database'

const supabaseUrlGraphQl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabasePsw = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

const supabaseClient = createClient<Database>(supabaseUrlGraphQl, supabasePsw, {
  auth: { persistSession: false },
})

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']
export type Views<T extends keyof Database['public']['Views']> =
  Database['public']['Views'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T]

export default supabaseClient
