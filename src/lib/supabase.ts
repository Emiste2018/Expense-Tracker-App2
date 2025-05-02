import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.",
  );
}

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
  supabaseUrl || "",
  supabaseAnonKey || "",
);
