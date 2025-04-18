
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  return (
    <div className="auth-container min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 via-indigo-200/20 to-purple-200/20 pointer-events-none"></div>
      
      <Card className="auth-card max-w-md w-full relative overflow-hidden shadow-xl border-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50 opacity-90 pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        
        <div className="relative z-10 p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {isLogin ? "Welcome Back" : "Create Your Account"}
            </h1>
            <p className="text-gray-600 text-sm">
              {isLogin 
                ? "Sign in to access your account and portfolio" 
                : "Join us to create and share your professional portfolio"}
            </p>
          </div>
          
          {isLogin ? <LoginForm /> : <RegisterForm />}
          
          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-blue-600 hover:text-indigo-700 transition-colors text-sm font-medium hover:underline"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-50/50 to-transparent pointer-events-none"></div>
      </Card>
    </div>
  );
}
