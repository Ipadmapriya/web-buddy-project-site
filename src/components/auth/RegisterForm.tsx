import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export const RegisterForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (name && username && email && password) {
        const userData = { 
          name, 
          username, 
          email, 
          password,
          created_at: new Date().toISOString() 
        };
        
        await register(userData);
        
        try {
          console.log("Attempting to store user data in Supabase...");
          await supabase
            .from('user_profiles')
            .upsert({
              email,
              name,
              username,
              created_at: new Date().toISOString()
            })
            .then(response => {
              if (response.error) throw response.error;
              console.log("User data stored in Supabase");
            });
        } catch (supabaseError) {
          console.error("Supabase storage error:", supabaseError);
        }
        
        toast({
          title: "Account created",
          description: "You have successfully registered.",
        });
        navigate("/");
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
    <form onSubmit={handleRegister} className="space-y-6 p-8 bg-white rounded-xl shadow-lg border border-purple-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-indigo-50/50 to-pink-50/50 pointer-events-none" />
      
      <div className="relative">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-slate-600 mt-2">Join our community today</p>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</Label>
            <div className="relative group">
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="bg-white/70 border-purple-100 focus:border-purple-300 shadow-sm transition-all duration-300 group-hover:shadow-md"
                required
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-indigo-50 opacity-0 group-hover:opacity-10 rounded-md transition-opacity duration-300 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium text-slate-700">Username</Label>
            <div className="relative group">
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="johndoe"
                className="bg-white/70 border-purple-100 focus:border-purple-300 shadow-sm transition-all duration-300 group-hover:shadow-md"
                required
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-indigo-50 opacity-0 group-hover:opacity-10 rounded-md transition-opacity duration-300 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email</Label>
            <div className="relative group">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="bg-white/70 border-purple-100 focus:border-purple-300 shadow-sm transition-all duration-300 group-hover:shadow-md"
                required
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-indigo-50 opacity-0 group-hover:opacity-10 rounded-md transition-opacity duration-300 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-slate-700">Password</Label>
            <div className="relative group">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pr-10 bg-white/70 border-purple-100 focus:border-purple-300 shadow-sm transition-all duration-300 group-hover:shadow-md"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-purple-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-indigo-50 opacity-0 group-hover:opacity-10 rounded-md transition-opacity duration-300 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">Confirm Password</Label>
            <div className="relative group">
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-white/70 border-purple-100 focus:border-purple-300 shadow-sm transition-all duration-300 group-hover:shadow-md"
                required
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-indigo-50 opacity-0 group-hover:opacity-10 rounded-md transition-opacity duration-300 pointer-events-none" />
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-2 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-[1.01] active:scale-[0.99]" 
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
      </div>
    </form>
  );
};
