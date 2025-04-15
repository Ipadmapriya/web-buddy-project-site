
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

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleResetUserType = () => {
    setSelectedType(null);
  };

  if (!selectedType) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
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

  return <PortfolioGenerator userType={selectedType} onResetUserType={handleResetUserType} />;
}
