
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ContactForm from "@/components/ContactForm";
import WorkExperienceForm from "@/components/WorkExperienceForm";
import EducationForm from "@/components/EducationForm";
import ProjectsForm from "@/components/ProjectsForm";
import SkillsForm from "@/components/SkillsForm";
import AchievementsForm from "@/components/AchievementsForm";
import InternshipForm from "@/components/InternshipForm";
import PortfolioPreview from "@/components/PortfolioPreview";
import { Check, ChevronRight } from "lucide-react";
import useLocalStorage from "@/hooks/useLocalStorage";

const steps = [
  { id: "personal", name: "Personal Information" },
  { id: "education", name: "Education" },
  { id: "internships", name: "Internships" },
  { id: "experience", name: "Work Experience" },
  { id: "projects", name: "Projects" },
  { id: "skills", name: "Skills" },
  { id: "achievements", name: "Achievements" },
  { id: "preview", name: "Preview" },
];

// Modify steps based on user type
const getStepsForUserType = (userType: string | null | undefined) => {
  if (!userType) return steps;

  const userSteps = [...steps];
  
  // Students don't need work experience
  if (userType.startsWith("student")) {
    return userSteps.filter(step => step.id !== "experience");
  }
  
  // Freshers don't need work experience
  if (userType.startsWith("fresher")) {
    return userSteps.filter(step => step.id !== "experience");
  }
  
  // Experienced users have all steps
  return userSteps;
};

interface PortfolioGeneratorProps {
  userType: string;
  onResetUserType: () => void;
}

const PortfolioGenerator = ({ userType, onResetUserType }: PortfolioGeneratorProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useLocalStorage("portfolio_current_step", "personal");
  const [portfolioData, setPortfolioData] = useLocalStorage("portfolio_data", {
    personal: {},
    education: [],
    internships: [],
    experience: [],
    projects: [],
    skills: {
      technicalSkills: [],
      softSkills: [],
      interests: [],
      hobbies: []
    },
    achievements: [],
  });
  
  const [activeSteps, setActiveSteps] = useState(steps);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate("/auth");
      return;
    }
    
    // Set steps based on user type
    if (userType) {
      const userSteps = getStepsForUserType(userType);
      setActiveSteps(userSteps);
    }
  }, [userType, user, navigate]);

  const handleStepChange = (step: string) => {
    setCurrentStep(step);
  };

  const handlePersonalInfoSubmit = (data: any) => {
    setPortfolioData({ ...portfolioData, personal: data });
    setCurrentStep("education");
  };

  const handleEducationSubmit = (data: any) => {
    setPortfolioData({ ...portfolioData, education: data });
    setCurrentStep("internships");
  };

  const handleInternshipsSubmit = (data: any) => {
    setPortfolioData({ ...portfolioData, internships: data });
    
    // Skip to projects for students and freshers
    if (userType?.startsWith("student") || userType?.startsWith("fresher")) {
      setCurrentStep("projects");
    } else {
      setCurrentStep("experience");
    }
  };

  const handleExperienceSubmit = (data: any) => {
    setPortfolioData({ ...portfolioData, experience: data });
    setCurrentStep("projects");
  };
  
  const handleProjectsSubmit = (data: any) => {
    setPortfolioData({ ...portfolioData, projects: data });
    setCurrentStep("skills");
  };
  
  const handleSkillsSubmit = (data: any) => {
    setPortfolioData({ ...portfolioData, skills: data });
    setCurrentStep("achievements");
  };
  
  const handleAchievementsSubmit = (data: any) => {
    setPortfolioData({ ...portfolioData, achievements: data });
    setCurrentStep("preview");
  };

  const handleStartOver = () => {
    // Clear localStorage data
    localStorage.removeItem("portfolio_data");
    localStorage.removeItem("portfolio_current_step");
    
    setCurrentStep("personal");
    setPortfolioData({
      personal: {},
      education: [],
      internships: [],
      experience: [],
      projects: [],
      skills: {
        technicalSkills: [],
        softSkills: [],
        interests: [],
        hobbies: []
      },
      achievements: [],
    });
  };

  const getCurrentStepIndex = () => {
    return activeSteps.findIndex((step) => step.id === currentStep);
  };

  if (!user) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h2 className="text-2xl font-bold">Please log in to create your portfolio</h2>
        <Button onClick={() => navigate("/auth")} className="mt-4">
          Go to Login
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Portfolio Generator</h1>
        {currentStep !== "preview" && (
          <Button variant="outline" onClick={onResetUserType}>
            Change User Type
          </Button>
        )}
      </div>
      
      <p className="mb-8">
        User Type: {userType ? userType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' - ') : 'Standard'}
      </p>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="hidden sm:flex items-center justify-between mb-4">
          {activeSteps.map((step, index) => (
            <React.Fragment key={step.id}>
              <button
                onClick={() => handleStepChange(step.id)}
                className={`flex flex-col items-center ${
                  currentStep === step.id
                    ? "text-primary"
                    : getCurrentStepIndex() > index
                    ? "text-green-500"
                    : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                    currentStep === step.id
                      ? "bg-primary text-white"
                      : getCurrentStepIndex() > index
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {getCurrentStepIndex() > index ? <Check size={16} /> : index + 1}
                </div>
                <span className="text-xs">{step.name}</span>
              </button>
              {index < activeSteps.length - 1 && (
                <div className="w-full h-1 bg-gray-200 flex-1 mx-2">
                  <div
                    className="h-full bg-green-500"
                    style={{
                      width: `${getCurrentStepIndex() > index ? "100%" : "0%"}`,
                    }}
                  ></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile Progress */}
        <div className="sm:hidden mb-4">
          <p className="text-center font-medium">
            Step {getCurrentStepIndex() + 1} of {activeSteps.length}: {activeSteps[getCurrentStepIndex()].name}
          </p>
          <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
            <div
              className="h-full bg-primary rounded-full"
              style={{
                width: `${((getCurrentStepIndex() + 1) / activeSteps.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Current Step Form */}
      <div className="max-w-3xl mx-auto">
        {currentStep === "personal" && (
          <ContactForm 
            onFormSubmit={handlePersonalInfoSubmit} 
            initialData={portfolioData.personal}
          />
        )}
        
        {currentStep === "education" && (
          <EducationForm 
            onFormSubmit={handleEducationSubmit} 
            initialData={portfolioData.education}
          />
        )}
        
        {currentStep === "internships" && (
          <InternshipForm 
            onFormSubmit={handleInternshipsSubmit} 
            initialData={portfolioData.internships}
          />
        )}
        
        {currentStep === "experience" && (
          <WorkExperienceForm 
            onFormSubmit={handleExperienceSubmit} 
            initialData={portfolioData.experience}
          />
        )}
        
        {currentStep === "projects" && (
          <ProjectsForm 
            onFormSubmit={handleProjectsSubmit} 
            initialData={portfolioData.projects}
          />
        )}
        
        {currentStep === "skills" && (
          <SkillsForm 
            onFormSubmit={handleSkillsSubmit} 
            initialData={portfolioData.skills}
          />
        )}
        
        {currentStep === "achievements" && (
          <AchievementsForm 
            onFormSubmit={handleAchievementsSubmit} 
            initialData={portfolioData.achievements}
          />
        )}
        
        {currentStep === "preview" && (
          <PortfolioPreview 
            portfolioData={portfolioData} 
            onStartOver={handleStartOver} 
          />
        )}
      </div>
    </div>
  );
};

export default PortfolioGenerator;
