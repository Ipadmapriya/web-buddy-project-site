
import React, { createContext, useContext, useEffect, useState } from "react";

type UserType = {
  name?: string;
  username?: string;
  email: string;
  userType?: string;
} | null;

interface AuthContextType {
  user: UserType;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - Check if user exists in localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u: any) => u.email === email);
      
      if (!user || user.password !== password) {
        throw new Error("Invalid credentials");
      }
      
      // Create a user object without the password
      const { password: _, ...safeUser } = user;
      
      setUser(safeUser);
      localStorage.setItem("user", JSON.stringify(safeUser));
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any) => {
    setIsLoading(true);
    try {
      // Mock registration - Store in localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      
      // Check if user with this email already exists
      if (users.some((u: any) => u.email === userData.email)) {
        throw new Error("User with this email already exists");
      }
      
      // Store user with password for later authentication
      const newUser = { ...userData, password: userData.password || "" };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      
      // Create a user object without the password
      const { password: _, ...safeUser } = newUser;
      
      setUser(safeUser);
      localStorage.setItem("user", JSON.stringify(safeUser));
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
