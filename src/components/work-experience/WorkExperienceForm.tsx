
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Briefcase } from "lucide-react";
import FormSection from "@/components/ui/form-section";
import WorkExperienceEntry, { WorkExperience } from "./WorkExperienceEntry";
import { useWorkExperiences } from "@/hooks/useWorkExperiences";

interface WorkExperienceFormProps {
  onFormSubmit: (data: WorkExperience[]) => void;
  initialData?: WorkExperience[];
}

const WorkExperienceForm = ({ onFormSubmit, initialData = [] }: WorkExperienceFormProps) => {
  const { experiences, handleChange, handleAddMore, handleRemove } = useWorkExperiences(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(experiences);
  };

  return (
    <FormSection title="Work Experience" icon={<Briefcase className="w-5 h-5" />}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {experiences.map((experience, index) => (
          <WorkExperienceEntry
            key={experience.id}
            experience={experience}
            index={index}
            canDelete={experiences.length > 1}
            onDelete={handleRemove}
            onChange={handleChange}
          />
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
