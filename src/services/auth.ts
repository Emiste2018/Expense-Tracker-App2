// Authentication service for handling user authentication

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

// Mock user storage for demo purposes
const USERS_STORAGE_KEY = "expense_tracker_users";
const CURRENT_USER_KEY = "expense_tracker_current_user";

// Helper to get users from localStorage
const getStoredUsers = (): Record<string, User & { password: string }> => {
  const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
  return usersJson ? JSON.parse(usersJson) : {};
};

// Helper to save users to localStorage
const saveUsers = (users: Record<string, User & { password: string }>) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

/**
 * Sign up a new user
 */
export const signUp = async (data: SignUpData): Promise<User> => {
  // In a real app, this would be an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const users = getStoredUsers();

        // Check if user already exists
        if (users[data.email]) {
          reject(new Error("User already exists"));
          return;
        }

        // Create new user
        const newUser: User & { password: string } = {
          id: crypto.randomUUID(),
          email: data.email,
          name: data.name,
          password: data.password, // In a real app, this would be hashed
        };

        // Save user
        users[data.email] = newUser;
        saveUsers(users);

        // Save current user session
        const { password, ...userWithoutPassword } = newUser;
        localStorage.setItem(
          CURRENT_USER_KEY,
          JSON.stringify(userWithoutPassword),
        );

        resolve(userWithoutPassword);
      } catch (error) {
        reject(error);
      }
    }, 500); // Simulate network delay
  });
};

/**
 * Log in an existing user
 */
export const login = async (credentials: AuthCredentials): Promise<User> => {
  // In a real app, this would be an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const users = getStoredUsers();
        const user = users[credentials.email];

        // Check if user exists and password matches
        if (!user || user.password !== credentials.password) {
          reject(new Error("Invalid email or password"));
          return;
        }

        // Save current user session
        const { password, ...userWithoutPassword } = user;
        localStorage.setItem(
          CURRENT_USER_KEY,
          JSON.stringify(userWithoutPassword),
        );

        resolve(userWithoutPassword);
      } catch (error) {
        reject(error);
      }
    }, 500); // Simulate network delay
  });
};

/**
 * Log out the current user
 */
export const logout = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem(CURRENT_USER_KEY);
      resolve();
    }, 300);
  });
};

/**
 * Get the current logged in user
 */
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(CURRENT_USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};
