import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Briefcase } from "lucide-react";
import FormSection from "@/components/ui/form-section";

interface WorkExperience {
  id: string;
  company: string;
  designation: string;
  yearsExperience: string;
  employmentType: string;
  teamSize: string;
  projects: string;
  responsibilities: string;
  technologies: string;
}

interface WorkExperienceFormProps {
  onFormSubmit: (data: WorkExperience[]) => void;
  initialData?: WorkExperience[];
}

const WorkExperienceForm = ({ onFormSubmit, initialData = [] }: WorkExperienceFormProps) => {
  const [experiences, setExperiences] = React.useState<WorkExperience[]>(
    initialData && initialData.length > 0
      ? initialData
      : [
          {
            id: Date.now().toString(),
            company: "",
            designation: "",
            yearsExperience: "",
            employmentType: "",
            teamSize: "",
            projects: "",
            responsibilities: "",
            technologies: "",
          },
        ]
  );

  const handleChange = (id: string, field: keyof WorkExperience, value: string) => {
    setExperiences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const handleAddMore = () => {
    setExperiences((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        company: "",
        designation: "",
        yearsExperience: "",
        employmentType: "",
        teamSize: "",
        projects: "",
        responsibilities: "",
        technologies: "",
      },
    ]);
  };

  const handleRemove = (id: string) => {
    if (experiences.length > 1) {
      setExperiences((prev) => prev.filter((exp) => exp.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(experiences);
  };

  return (
    <FormSection title="Work Experience" icon={<Briefcase className="w-5 h-5 text-white" />}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {experiences.map((experience, index) => (
          <div 
            key={experience.id} 
            className="p-4 rounded-lg space-y-4 bg-white/40 border border-blue-100 transition-all duration-300 hover:bg-white/60"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-blue-900">Experience #{index + 1}</h3>
              {experiences.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemove(experience.id)}
                  className="bg-red-100 hover:bg-red-200 text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Remove
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`company-${experience.id}`}>Company Name</Label>
                <Input
                  id={`company-${experience.id}`}
                  value={experience.company}
                  onChange={(e) => handleChange(experience.id, "company", e.target.value)}
                  placeholder="Google, Amazon, etc."
                  required
                  className="border-blue-100 focus:border-blue-300 bg-white/50 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`designation-${experience.id}`}>Designation</Label>
                <Input
                  id={`designation-${experience.id}`}
                  value={experience.designation}
                  onChange={(e) => handleChange(experience.id, "designation", e.target.value)}
                  placeholder="Software Engineer, Product Manager, etc."
                  required
                  className="border-blue-100 focus:border-blue-300 bg-white/50 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`years-${experience.id}`}>Years of Experience</Label>
                <Input
                  id={`years-${experience.id}`}
                  value={experience.yearsExperience}
                  onChange={(e) => handleChange(experience.id, "yearsExperience", e.target.value)}
                  placeholder="2 years, 6 months, etc."
                  required
                  className="border-blue-100 focus:border-blue-300 bg-white/50 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`type-${experience.id}`}>Employment Type</Label>
                <Input
                  id={`type-${experience.id}`}
                  value={experience.employmentType}
                  onChange={(e) => handleChange(experience.id, "employmentType", e.target.value)}
                  placeholder="Full-time, Part-time, Contract, etc."
                  required
                  className="border-blue-100 focus:border-blue-300 bg-white/50 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`team-${experience.id}`}>Team Size</Label>
                <Input
                  id={`team-${experience.id}`}
                  value={experience.teamSize}
                  onChange={(e) => handleChange(experience.id, "teamSize", e.target.value)}
                  placeholder="5, 10, etc."
                  className="border-blue-100 focus:border-blue-300 bg-white/50 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`projects-${experience.id}`}>Number of Projects</Label>
                <Input
                  id={`projects-${experience.id}`}
                  value={experience.projects}
                  onChange={(e) => handleChange(experience.id, "projects", e.target.value)}
                  placeholder="3, 5, etc."
                  className="border-blue-100 focus:border-blue-300 bg-white/50 transition-all duration-300"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`responsibilities-${experience.id}`}>Project Responsibilities</Label>
              <Textarea
                id={`responsibilities-${experience.id}`}
                value={experience.responsibilities}
                onChange={(e) => handleChange(experience.id, "responsibilities", e.target.value)}
                placeholder="Describe your responsibilities and contributions"
                rows={3}
                className="border-blue-100 focus:border-blue-300 bg-white/50 transition-all duration-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`technologies-${experience.id}`}>Tools & Technologies</Label>
              <Textarea
                id={`technologies-${experience.id}`}
                value={experience.technologies}
                onChange={(e) => handleChange(experience.id, "technologies", e.target.value)}
                placeholder="React, Node.js, Python, AWS, etc."
                rows={2}
                className="border-blue-100 focus:border-blue-300 bg-white/50 transition-all duration-300"
              />
            </div>
          </div>
        ))}

        <Button 
          type="button" 
          variant="outline" 
          onClick={handleAddMore} 
          className="w-full border-blue-200 hover:bg-blue-50"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Another Experience
        </Button>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
        >
          Save & Continue
        </Button>
      </form>
    </FormSection>
  );
};

export default WorkExperienceForm;
