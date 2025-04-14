import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Work Experience</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {experiences.map((experience, index) => (
            <div key={experience.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Experience #{index + 1}</h3>
                {experiences.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemove(experience.id)}
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
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`team-${experience.id}`}>Team Size</Label>
                  <Input
                    id={`team-${experience.id}`}
                    value={experience.teamSize}
                    onChange={(e) => handleChange(experience.id, "teamSize", e.target.value)}
                    placeholder="5, 10, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`projects-${experience.id}`}>Number of Projects</Label>
                  <Input
                    id={`projects-${experience.id}`}
                    value={experience.projects}
                    onChange={(e) => handleChange(experience.id, "projects", e.target.value)}
                    placeholder="3, 5, etc."
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
                />
              </div>
            </div>
          ))}

          <Button type="button" variant="outline" onClick={handleAddMore} className="w-full">
            <Plus className="h-4 w-4 mr-2" /> Add Another Experience
          </Button>
          <Button type="submit" className="w-full">Save & Continue</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WorkExperienceForm;
