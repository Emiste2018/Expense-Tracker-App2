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

  return {
    id: data.user.id,
    email: data.user.email || "",
    name: data.user.user_metadata?.name,
  };
};
