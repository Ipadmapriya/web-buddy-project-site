
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, Briefcase } from "lucide-react";

interface UserTypeOption {
  value: string;
  label: string;
  icon: React.ElementType;
  description: string;
}

const userTypes: UserTypeOption[] = [
  {
    value: "fresher-ug",
    label: "Fresher - Undergraduate",
    icon: GraduationCap,
    description: "Perfect for students and recent graduates starting their career journey"
  },
  {
    value: "fresher-pg",
    label: "Fresher - Postgraduate",
    icon: GraduationCap,
    description: "Tailored for postgraduates ready to showcase advanced academic achievements"
  },
  {
    value: "experienced-ug",
    label: "Experienced - Undergraduate",
    icon: Briefcase,
    description: "For professionals with work experience and an undergraduate degree"
  },
  {
    value: "experienced-pg",
    label: "Experienced - Postgraduate",
    icon: Briefcase,
    description: "Designed for seasoned professionals with advanced degrees"
  }
];

interface WelcomeSectionProps {
  onTypeSelect: (type: string) => void;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onTypeSelect }) => {
  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center px-4 py-12 sm:p-8">
      <div className="max-w-5xl w-full space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Create Your Professional Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your profile type below and build a stunning portfolio that highlights your unique journey and achievements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Card
                key={type.value}
                className="group p-6 hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-blue-100 overflow-visible"
              >
                <Button
                  variant="ghost"
                  className="w-full h-auto p-6 flex flex-col items-center gap-6 hover:bg-blue-50/50"
                  onClick={() => onTypeSelect(type.value)}
                >
                  <div className="relative">
                    <div className="absolute -inset-2 bg-blue-100 rounded-full blur-lg group-hover:bg-blue-200 transition-colors duration-300" />
                    <Icon className="relative h-12 w-12 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="space-y-3 text-center">
                    <h3 className="text-xl font-semibold text-gray-800">{type.label}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 hover:line-clamp-none transition-all duration-300">
                      {type.description}
                    </p>
                  </div>
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
