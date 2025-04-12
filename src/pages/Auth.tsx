
import React, { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Card } from "@/components/ui/card";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

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
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </Card>
    </div>
  );
}
