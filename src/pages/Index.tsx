import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import WelcomeSection from "@/components/WelcomeSection";
import PortfolioGenerator from "@/components/PortfolioGenerator";
import { AdminDashboardStats } from "@/components/admin/AdminDashboardStats";

export default function Index() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [adminView, setAdminView] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const adminReturning = localStorage.getItem("adminReturning");
    
    if (user.isAdmin && !adminReturning) {
      navigate("/admin");
    } else if (adminReturning) {
      setAdminView(true);
      localStorage.removeItem("adminReturning");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleResetUserType = () => {
    setSelectedType(null);
  };

  const handleReturnToAdmin = () => {
    navigate("/admin");
  };

  if (!selectedType) {
    return (
      <div className="min-h-screen bg-background">
        {adminView && (
          <div className="w-full bg-white/80 backdrop-blur-sm border-b border-blue-100 p-4">
            <div className="container mx-auto">
              <Button 
                variant="outline" 
                onClick={handleReturnToAdmin} 
                className="mb-4"
              >
                Return to Admin Dashboard
              </Button>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h2 className="text-lg font-semibold text-blue-900 mb-2">Admin View Mode</h2>
                <p className="text-blue-700">You are currently viewing the Portfolio Generator as an admin. Select a user type below to see what users experience.</p>
              </div>
              <AdminDashboardStats />
            </div>
          </div>
        )}
        
        <WelcomeSection onTypeSelect={setSelectedType} />
      </div>
    );
  }

  return (
    <div>
      {adminView && (
        <div className="container mx-auto pt-4">
          <Button 
            variant="outline" 
            onClick={handleReturnToAdmin}
            className="mb-4"
          >
            Return to Admin Dashboard
          </Button>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">Admin View Mode</h2>
            <p className="text-blue-700">You are currently viewing the Portfolio Generator as an admin user.</p>
          </div>
        </div>
      )}
      <PortfolioGenerator userType={selectedType} onResetUserType={handleResetUserType} />
    </div>
  );
}
