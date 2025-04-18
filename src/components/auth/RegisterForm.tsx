
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const RegisterForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate(); // Ensure this line is present
  const { register } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "Please make sure your passwords match.",
      });
      setIsLoading(false);
      return;
    }

    try {
      if (name && username && email && password) {
        const userData = { 
          name, 
          username, 
          email, 
          password
        };
        
        await register(userData);
        toast({
          title: "Account created",
          description: "You have successfully registered.",
        });
        navigate("/");
      } else {
        toast({
          variant: "destructive",
          title: "Missing information",
          description: "Please fill in all fields.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.message || "There was an error registering your account.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-6 p-6 bg-gradient-to-br from-white via-slate-50 to-indigo-50 rounded-xl shadow-lg border border-indigo-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Create Account
        </h2>
        <p className="text-slate-600 mt-2">Join our community today</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</Label>
          <div className="relative group">
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/70 border-indigo-100 focus:border-indigo-300 shadow-sm transition-all duration-300 group-hover:shadow-md"
              required
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-10 rounded-md transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="username" className="text-sm font-medium text-slate-700">Username</Label>
          <div className="relative group">
            <Input
              id="username"
              type="text"
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-white/70 border-indigo-100 focus:border-indigo-300 shadow-sm transition-all duration-300 group-hover:shadow-md"
              required
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-10 rounded-md transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email</Label>
          <div className="relative group">
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/70 border-indigo-100 focus:border-indigo-300 shadow-sm transition-all duration-300 group-hover:shadow-md"
              required
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-10 rounded-md transition-opacity duration-300 pointer-events-none"></div>
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
              className="pr-10 bg-white/70 border-indigo-100 focus:border-indigo-300 shadow-sm transition-all duration-300 group-hover:shadow-md"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-600 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-10 rounded-md transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">Confirm Password</Label>
          <div className="relative group">
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-white/70 border-indigo-100 focus:border-indigo-300 shadow-sm transition-all duration-300 group-hover:shadow-md"
              required
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-10 rounded-md transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-[1.01] active:scale-[0.99]" 
        disabled={isLoading}
      >
        <UserPlus className="mr-2 h-4 w-4" />
        {isLoading ? (
          <span className="flex items-center">
            <span className="animate-pulse">•</span>
            <span className="mx-2">Creating account</span>
            <span className="animate-pulse delay-100">•</span>
            <span className="animate-pulse delay-200">•</span>
          </span>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
};
