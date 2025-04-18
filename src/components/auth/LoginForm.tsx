
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate(); // Ensure this line is present
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!email || !password) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please fill in all fields",
        });
        setIsLoading(false);
        return;
      }
      
      console.log("Attempting login with:", email, password);
      await login(email, password);
      
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
      
      // Let the redirect happen from the Auth component
    } catch (error: any) {
      console.error("Login failed:", error);
      toast({
        variant: "destructive",
        title: "Failed to log in",
        description: error.message || "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
        <div className="relative group">
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input bg-white/70 border-blue-100 focus:border-blue-300 shadow-sm transition-all duration-300 group-hover:shadow-md"
            required
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-10 rounded-md transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
        <div className="relative group">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input pr-10 bg-white/70 border-blue-100 focus:border-blue-300 shadow-sm transition-all duration-300 group-hover:shadow-md"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-10 rounded-md transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full btn-gradient-primary mt-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]" 
        disabled={isLoading}
      >
        <LogIn className="mr-2 h-4 w-4" />
        {isLoading ? (
          <span className="flex items-center">
            <span className="animate-pulse mr-2">•</span>
            <span>Signing in</span>
            <span className="animate-pulse ml-1 delay-100">•</span>
            <span className="animate-pulse ml-1 delay-200">•</span>
          </span>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
};
