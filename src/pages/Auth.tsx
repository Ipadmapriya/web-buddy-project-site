
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

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      // Redirect admin users to admin dashboard, others to home
      if (user.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login to Your Account" : "Create New Account"}
        </h1>
        
        {isLogin ? <LoginForm /> : <RegisterForm />}
        
        <div className="mt-4 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-primary hover:underline"
            type="button"
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </Card>
    </div>
  );
}
