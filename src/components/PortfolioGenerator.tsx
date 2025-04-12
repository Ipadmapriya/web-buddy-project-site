import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

const PortfolioGenerator = () => {
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

  const handleStepChange = (step: string) => {
    setCurrentStep(step);
  };

  const handlePersonalInfoSubmit = (data: any) => {
    setPortfolioData({ ...portfolioData, personal: data });
    setCurrentStep("education");
  };

  const handleEducationSubmit = (data: any) => {
    setPortfolioData({ ...portfolioData, education: data });
    setCurrentStep("experience");
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
    return steps.findIndex((step) => step.id === currentStep);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Portfolio Generator</h1>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="hidden sm:flex items-center justify-between mb-4">
          {steps.map((step, index) => (
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
              {index < steps.length - 1 && (
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
            Step {getCurrentStepIndex() + 1} of {steps.length}: {steps[getCurrentStepIndex()].name}
          </p>
          <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
            <div
              className="h-full bg-primary rounded-full"
              style={{
                width: `${((getCurrentStepIndex() + 1) / steps.length) * 100}%`,
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
