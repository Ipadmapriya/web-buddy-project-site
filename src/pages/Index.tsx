
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { GraduationCap, Briefcase } from "lucide-react";
import PortfolioGenerator from "@/components/PortfolioGenerator";

const userTypes = [
  { value: "fresher-ug", label: "Fresher - Undergraduate", icon: GraduationCap },
  { value: "fresher-pg", label: "Fresher - Postgraduate", icon: GraduationCap },
  { value: "experienced-ug", label: "Experienced - Undergraduate", icon: Briefcase },
  { value: "experienced-pg", label: "Experienced - Postgraduate", icon: Briefcase },
];

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

    // Check if admin is coming from admin dashboard
    const adminReturning = localStorage.getItem("adminReturning");
    
    // If admin user but not explicitly coming from dashboard, redirect to admin page
    if (user.isAdmin && !adminReturning) {
      navigate("/admin");
    } else if (adminReturning) {
      // Admin is viewing the portfolio generator
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
      <div className="min-h-screen bg-background flex flex-col items-center p-4">
        {adminView && (
          <div className="w-full max-w-2xl mb-4">
            <Button 
              variant="outline" 
              onClick={handleReturnToAdmin} 
              className="mb-6"
            >
              Return to Admin Dashboard
            </Button>
            <div className="bg-muted p-4 rounded-md mb-6">
              <h2 className="text-lg font-semibold mb-2">Admin View Mode</h2>
              <p>You are currently viewing the Portfolio Generator as an admin. Select a user type below to see what users experience.</p>
            </div>
          </div>
        )}
        
        <Card className="w-full max-w-2xl p-6">
          <h1 className="text-2xl font-bold text-center mb-6">Choose Your Portfolio Type</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Button
                  key={type.value}
                  variant="outline"
                  className="h-auto p-6 flex flex-col items-center gap-4 hover:bg-accent"
                  onClick={() => setSelectedType(type.value)}
                >
                  <Icon className="h-12 w-12" />
                  <span className="text-lg font-medium text-center">{type.label}</span>
                </Button>
              );
            })}
          </div>
        </Card>
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
          <div className="bg-muted p-4 rounded-md mb-4">
            <h2 className="text-lg font-semibold mb-2">Admin View Mode</h2>
            <p>You are currently viewing the Portfolio Generator as an admin user.</p>
          </div>
        </div>
      )}
      <PortfolioGenerator userType={selectedType} onResetUserType={handleResetUserType} />
    </div>
  );
}
