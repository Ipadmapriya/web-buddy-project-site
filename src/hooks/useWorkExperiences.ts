
import { useState } from "react";
import { WorkExperience } from "@/components/work-experience/WorkExperienceEntry";

const createEmptyExperience = (): WorkExperience => ({
  id: Date.now().toString(),
  company: "",
  designation: "",
  yearsExperience: "",
  employmentType: "",
  teamSize: "",
  projects: "",
  responsibilities: "",
  technologies: "",
});

export const useWorkExperiences = (initialData: WorkExperience[] = []) => {
  const [experiences, setExperiences] = useState<WorkExperience[]>(
    initialData && initialData.length > 0
      ? initialData
      : [createEmptyExperience()]
  );

  const handleChange = (id: string, field: keyof WorkExperience, value: string) => {
    setExperiences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const handleAddMore = () => {
    setExperiences((prev) => [...prev, createEmptyExperience()]);
  };

  const handleRemove = (id: string) => {
    if (experiences.length > 1) {
      setExperiences((prev) => prev.filter((exp) => exp.id !== id));
    }
  };

  return {
    experiences,
    handleChange,
    handleAddMore,
    handleRemove,
  };
};
