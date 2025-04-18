
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export interface WorkExperience {
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

interface WorkExperienceEntryProps {
  experience: WorkExperience;
  index: number;
  canDelete: boolean;
  onDelete: (id: string) => void;
  onChange: (id: string, field: keyof WorkExperience, value: string) => void;
}

const WorkExperienceEntry = ({
  experience,
  index,
  canDelete,
  onDelete,
  onChange,
}: WorkExperienceEntryProps) => {
  return (
    <div className="form-inner-box p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-blue-900">Experience #{index + 1}</h3>
        {canDelete && (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => onDelete(experience.id)}
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
            onChange={(e) => onChange(experience.id, "company", e.target.value)}
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
            onChange={(e) => onChange(experience.id, "designation", e.target.value)}
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
            onChange={(e) => onChange(experience.id, "yearsExperience", e.target.value)}
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
            onChange={(e) => onChange(experience.id, "employmentType", e.target.value)}
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
            onChange={(e) => onChange(experience.id, "teamSize", e.target.value)}
            placeholder="5, 10, etc."
            className="border-blue-100 focus:border-blue-300 bg-white/50 transition-all duration-300"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`projects-${experience.id}`}>Number of Projects</Label>
          <Input
            id={`projects-${experience.id}`}
            value={experience.projects}
            onChange={(e) => onChange(experience.id, "projects", e.target.value)}
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
          onChange={(e) => onChange(experience.id, "responsibilities", e.target.value)}
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
          onChange={(e) => onChange(experience.id, "technologies", e.target.value)}
          placeholder="React, Node.js, Python, AWS, etc."
          rows={2}
          className="border-blue-100 focus:border-blue-300 bg-white/50 transition-all duration-300"
        />
      </div>
    </div>
  );
};

export default WorkExperienceEntry;
