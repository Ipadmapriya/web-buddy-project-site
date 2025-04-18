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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-200/20 via-purple-200/20 to-pink-200/20 pointer-events-none"></div>
      
      <Card className="max-w-md w-full relative overflow-hidden shadow-xl border-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-indigo-50/50 opacity-90 pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        
        <div className="relative z-10">
          {isLogin ? <LoginForm /> : <RegisterForm />}
          
          <div className="px-8 pb-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-indigo-600 hover:text-purple-600 transition-colors text-sm font-medium hover:underline"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-indigo-50/50 to-transparent pointer-events-none"></div>
      </Card>
    </div>
  );
}
