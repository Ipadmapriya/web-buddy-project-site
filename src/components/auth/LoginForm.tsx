
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <form onSubmit={handleLogin} className="space-y-6 p-6 bg-gradient-to-br from-white via-slate-50 to-blue-50 rounded-xl shadow-lg border border-blue-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Welcome Back
        </h2>
        <p className="text-slate-600 mt-2">Sign in to your account</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email</Label>
          <div className="relative group">
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/70 border-blue-100 focus:border-blue-300 shadow-sm transition-all duration-300 group-hover:shadow-md"
              required
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-10 rounded-md transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-slate-700">Password</Label>
          <div className="relative group">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10 bg-white/70 border-blue-100 focus:border-blue-300 shadow-sm transition-all duration-300 group-hover:shadow-md"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-600 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-10 rounded-md transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-[1.01] active:scale-[0.99]" 
        disabled={isLoading}
      >
        <LogIn className="mr-2 h-4 w-4" />
        {isLoading ? (
          <span className="flex items-center">
            <span className="animate-pulse">•</span>
            <span className="mx-2">Signing in</span>
            <span className="animate-pulse delay-100">•</span>
            <span className="animate-pulse delay-200">•</span>
          </span>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
};
