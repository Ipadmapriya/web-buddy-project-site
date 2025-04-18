import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type UserType = {
  name?: string;
  username?: string;
  email: string;
  userType?: string;
  isAdmin?: boolean;
  created_at?: string;
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
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
    
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (!users.some((u: any) => u.email === "admin@example.com")) {
      const adminUser = {
        email: "admin@example.com",
        password: "admin123",
        isAdmin: true,
        created_at: new Date().toISOString()
      };
      users.push(adminUser);
      localStorage.setItem("users", JSON.stringify(users));
    }
    
    const syncUsersWithSupabase = async () => {
      try {
        console.log("Attempting to sync users with Supabase...");
        for (const user of users) {
          try {
            await supabase
              .from('user_profiles')
              .upsert({
                email: user.email,
                name: user.name || '',
                username: user.username || '',
                is_admin: user.isAdmin || false,
                created_at: user.created_at || new Date().toISOString()
              })
              .then(response => {
                if (response.error) throw response.error;
              });
          } catch (error) {
            console.error("Error syncing user to Supabase:", error);
          }
        }
      } catch (error) {
        console.error("Error in user sync:", error);
      }
    };
    
    syncUsersWithSupabase();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
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
      
      const { password: _, ...safeUser } = user;
      
      console.log("Login successful, user:", safeUser);
      
      setUser(safeUser);
      localStorage.setItem("user", JSON.stringify(safeUser));
      
      try {
        await supabase
          .from('user_profiles')
          .upsert({
            email: safeUser.email,
            last_login: new Date().toISOString()
          })
          .then(response => {
            if (response.error) {
              throw response.error;
            }
          });
      } catch (error) {
        console.error("Error updating last login:", error);
      }
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
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      
      if (users.some((u: any) => u.email === userData.email)) {
        throw new Error("User with this email already exists");
      }
      
      const newUser = { 
        ...userData,
        isAdmin: userData.email === "admin@example.com" ? true : false,
        created_at: userData.created_at || new Date().toISOString(),
        password: userData.password 
      };
      
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      
      try {
        await supabase
          .from('user_profiles')
          .insert({
            email: userData.email,
            name: userData.name || '',
            username: userData.username || '',
            is_admin: userData.isAdmin || false,
            created_at: userData.created_at || new Date().toISOString()
          })
          .then(response => {
            if (response.error) {
              throw response.error;
            }
            console.log("User registered in Supabase");
          });
      } catch (error) {
        console.error("Error storing user in Supabase:", error);
      }
      
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
