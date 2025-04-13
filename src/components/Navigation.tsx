
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn, LogOut, User } from "lucide-react";

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const formatUserType = (userType?: string) => {
    if (!userType) return "";
    return userType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' - ');
  };

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          Portfolio Generator
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2">
                <User size={18} />
                <div className="flex flex-col text-sm">
                  <span>{user.email}</span>
                  {user.userType && (
                    <span className="text-xs text-muted-foreground">
                      {formatUserType(user.userType)}
                    </span>
                  )}
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <Button size="sm" onClick={() => navigate("/auth")}>
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
