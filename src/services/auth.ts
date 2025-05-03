// Authentication service for handling user authentication with Supabase
import { supabase } from "../lib/supabase";

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignUpData extends AuthCredentials {
  name?: string;
}

/**
 * Sign up a new user
 */
export const signUp = async (data: SignUpData): Promise<User> => {
  const { email, password, name } = data;

  const { data: authData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!authData.user) {
    throw new Error("Failed to create user");
  }

  // Check if we need to manually create the user in the public.users table
  // This is a fallback in case the trigger doesn't work
  try {
    const { error: userError } = await supabase.from("users").upsert({
      id: authData.user.id,
      email: authData.user.email || "",
      name: authData.user.user_metadata?.name,
    });

    if (userError) {
      console.error("Error creating user profile:", userError);
    }
  } catch (err) {
    console.error("Error in user profile creation:", err);
  }

  return {
    id: authData.user.id,
    email: authData.user.email || "",
    name: authData.user.user_metadata?.name,
  };
};

/**
 * Log in an existing user
 */
export const login = async (credentials: AuthCredentials): Promise<User> => {
  const { email, password } = credentials;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error("Failed to login");
  }

  return {
    id: data.user.id,
    email: data.user.email || "",
    name: data.user.user_metadata?.name,
  };
};

/**
 * Log out the current user
 */
export const logout = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
};

/**
 * Get the current logged in user
 */
export const getCurrentUser = (): User | null => {
  const { data } = supabase.auth.getSession();
  const user = supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // This is a synchronous function but Supabase auth.getUser() is async
  // For now, we'll return null and let the AuthContext handle the async check
  return null;
};

/**
 * Get the current logged in user asynchronously
 */
export const getCurrentUserAsync = async (): Promise<User | null> => {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return null;
  }

  // Ensure the user exists in the public.users table
  try {
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", data.user.id)
      .single();

    if (userError || !userData) {
      // User doesn't exist in public.users table, create it
      await supabase.from("users").upsert({
        id: data.user.id,
        email: data.user.email || "",
        name: data.user.user_metadata?.name,
      });
    }
  } catch (err) {
    console.error("Error checking/creating user profile:", err);
    // Continue even if there's an error with the users table
  }

  return {
    id: data.user.id,
    email: data.user.email || "",
    name: data.user.user_metadata?.name,
  };
};
