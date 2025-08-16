import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Browser client for SSR
export const createClient_Browser = () =>
  createBrowserClient(supabaseUrl, supabaseAnonKey)

// Server client for SSR
export const createClient_Server = async () => {
  const { createServerClient } = await import("@supabase/ssr")
  const { cookies } = await import("next/headers")
  
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookies().get(name)?.value
      },
    },
  })
}

