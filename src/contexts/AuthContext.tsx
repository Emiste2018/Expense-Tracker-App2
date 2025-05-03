import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  User,
  login as authLogin,
  signUp as authSignUp,
  logout as authLogout,
  getCurrentUserAsync,
} from "../services/auth";
import { supabase } from "../lib/supabase";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<User | null>;
  signUp: (
    email: string,
    password: string,
    name?: string,
  ) => Promise<User | null>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUserAsync();
        setUser(currentUser);
      } catch (err) {
        console.error("Error checking authentication:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const currentUser = await getCurrentUserAsync();
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await authLogin({ email, password });
      setUser(user);
      return user; // Return the user object
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to login");
      throw err; // Re-throw the error to be caught by the component
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await authSignUp({ email, password, name });
      setUser(user);
      return user; // Return the user object
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign up");
      throw err; // Re-throw the error to be caught by the component
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authLogout();
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to logout");
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    signUp,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
