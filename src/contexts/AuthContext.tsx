
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type UserType = {
  name?: string;
  username?: string;
  email: string;
  userType?: string;
  isAdmin?: boolean;
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
    
    // Initialize admin user if it doesn't exist yet
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (!users.some((u: any) => u.email === "admin@example.com")) {
      const adminUser = {
        email: "admin@example.com",
        password: "admin123",
        isAdmin: true
      };
      users.push(adminUser);
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - Check if user exists in localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      
      console.log("Users in storage:", users);
      console.log("Attempting login with:", email, password);
      
      const user = users.find((u: any) => u.email === email);
      
      if (!user) {
        console.error("User not found:", email);
        throw new Error("Invalid credentials");
      }
      
      if (user.password !== password) {
        console.error("Password mismatch for user:", email);
        throw new Error("Invalid credentials");
      }
      
      // Create a user object without the password
      const { password: _, ...safeUser } = user;
      
      console.log("Login successful, user:", safeUser);
      
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
      
      // Create user object including password for authentication
      const newUser = { 
        ...userData,
        // Set default isAdmin value to false
        isAdmin: userData.email === "admin@example.com" ? true : false,
        // Ensure password is explicitly included
        password: userData.password 
      };
      
      // Store complete user data (including password) for authentication purposes
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      
      // Create a user object without the password for the session
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
