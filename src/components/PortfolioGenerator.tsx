
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
import PortfolioPreview from "@/components/PortfolioPreview";
import { Check, ChevronRight } from "lucide-react";

const steps = [
  { id: "personal", name: "Personal Information" },
  { id: "education", name: "Education" },
  { id: "experience", name: "Work Experience" },
  { id: "projects", name: "Projects" },
  { id: "skills", name: "Skills" },
  { id: "achievements", name: "Achievements" },
  { id: "preview", name: "Preview" },
];

// Modify steps based on user type
const getStepsForUserType = (userType?: string) => {
  if (!userType) return steps;

  const userSteps = [...steps];
  
  // Students don't need work experience
  if (userType.startsWith("student")) {
    return userSteps.filter(step => step.id !== "experience");
  }
  
  // Freshers might have limited work experience
  if (userType.startsWith("fresher")) {
    return userSteps;
  }
  
  // Experienced users have all steps
  return userSteps;
};

const PortfolioGenerator = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState("personal");
  const [portfolioData, setPortfolioData] = useState({
    personal: {},
    education: [],
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
    if (user.userType) {
      const userSteps = getStepsForUserType(user.userType);
      setActiveSteps(userSteps);
    }
  }, [user, navigate]);

  const handleStepChange = (step: string) => {
    setCurrentStep(step);
  };

  const handlePersonalInfoSubmit = (data: any) => {
    setPortfolioData({ ...portfolioData, personal: data });
    setCurrentStep("education");
  };

  const handleEducationSubmit = (data: any) => {
    setPortfolioData({ ...portfolioData, education: data });
    // Skip to projects for students
    if (user?.userType?.startsWith("student")) {
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
    setCurrentStep("personal");
    setPortfolioData({
      personal: {},
      education: [],
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
      <h1 className="text-3xl font-bold text-center mb-2">Portfolio Generator</h1>
      <p className="text-center mb-8">
        User Type: {user.userType ? user.userType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' - ') : 'Standard'}
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
        {currentStep === "personal" && <ContactForm onFormSubmit={handlePersonalInfoSubmit} />}
        {currentStep === "education" && <EducationForm onFormSubmit={handleEducationSubmit} />}
        {currentStep === "experience" && <WorkExperienceForm onFormSubmit={handleExperienceSubmit} />}
        {currentStep === "projects" && <ProjectsForm onFormSubmit={handleProjectsSubmit} />}
        {currentStep === "skills" && <SkillsForm onFormSubmit={handleSkillsSubmit} />}
        {currentStep === "achievements" && <AchievementsForm onFormSubmit={handleAchievementsSubmit} />}
        
        {currentStep === "preview" && <PortfolioPreview portfolioData={portfolioData} onStartOver={handleStartOver} />}
      </div>
    </div>
  );
};

export default PortfolioGenerator;
