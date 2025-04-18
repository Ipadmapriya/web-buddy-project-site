
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FormSection from "@/components/ui/form-section";
import { FolderGit2, Plus, Trash2 } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  githubLink: string;
  teamSize: string;
  duration: string;
  role: string;
  completedDate: string;
}

interface ProjectsFormProps {
  onFormSubmit: (data: Project[]) => void;
  initialData?: Project[];
}

const ProjectsForm = ({ onFormSubmit, initialData = [] }: ProjectsFormProps) => {
  const [projects, setProjects] = React.useState<Project[]>(
    initialData && initialData.length > 0
      ? initialData
      : [
          {
            id: Date.now().toString(),
            name: "",
            description: "",
            githubLink: "",
            teamSize: "",
            duration: "",
            role: "",
            completedDate: "",
          },
        ]
  );

  const handleChange = (id: string, field: keyof Project, value: string) => {
    setProjects((prev) =>
      prev.map((project) => (project.id === id ? { ...project, [field]: value } : project))
    );
  };

  const handleAddMore = () => {
    setProjects((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: "",
        description: "",
        githubLink: "",
        teamSize: "",
        duration: "",
        role: "",
        completedDate: "",
      },
    ]);
  };

  const handleRemove = (id: string) => {
    if (projects.length > 1) {
      setProjects((prev) => prev.filter((project) => project.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(projects);
  };

  return (
    <FormSection title="Projects" icon={<FolderGit2 className="w-5 h-5" />}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className="form-inner-box p-6 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-blue-900">Project #{index + 1}</h3>
              {projects.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemove(project.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Remove
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-input-group">
                <Label htmlFor={`name-${project.id}`}>Project Name</Label>
                <Input
                  id={`name-${project.id}`}
                  value={project.name}
                  onChange={(e) => handleChange(project.id, "name", e.target.value)}
                  placeholder="My Amazing Project"
                  required
                  className="border-blue-100 focus:border-blue-300 bg-white/50 transition-all duration-300"
                />
              </div>
              <div className="form-input-group">
                <Label htmlFor={`github-${project.id}`}>GitHub Link</Label>
                <Input
                  id={`github-${project.id}`}
                  value={project.githubLink}
                  onChange={(e) => handleChange(project.id, "githubLink", e.target.value)}
                  placeholder="https://github.com/username/project"
                  className="border-blue-100 focus:border-blue-300 bg-white/50 transition-all duration-300"
                />
              </div>
              <div className="form-input-group">
                <Label htmlFor={`team-${project.id}`}>Team Size</Label>
                <Input
                  id={`team-${project.id}`}
                  value={project.teamSize}
                  onChange={(e) => handleChange(project.id, "teamSize", e.target.value)}
                  placeholder="3, 5, etc."
                  className="border-blue-100 focus:border-blue-300 bg-white/50 transition-all duration-300"
                />
              </div>
              <div className="form-input-group">
                <Label htmlFor={`duration-${project.id}`}>Project Duration</Label>
                <Input
                  id={`duration-${project.id}`}
                  value={project.duration}
                  onChange={(e) => handleChange(project.id, "duration", e.target.value)}
                  placeholder="2 months, 1 year, etc."
                  required
                  className="border-blue-100 focus:border-blue-300 bg-white/50 transition-all duration-300"
                />
              </div>
              <div className="form-input-group">
                <Label htmlFor={`role-${project.id}`}>Your Role</Label>
                <Input
                  id={`role-${project.id}`}
                  value={project.role}
                  onChange={(e) => handleChange(project.id, "role", e.target.value)}
                  placeholder="Frontend Developer, Team Lead, etc."
                  required
                  className="border-blue-100 focus:border-blue-300 bg-white/50 transition-all duration-300"
                />
              </div>
              <div className="form-input-group">
                <Label htmlFor={`completed-${project.id}`}>Completion Date</Label>
                <Input
                  id={`completed-${project.id}`}
                  value={project.completedDate}
                  onChange={(e) => handleChange(project.id, "completedDate", e.target.value)}
                  placeholder="May 2023"
                  required
                  className="border-blue-100 focus:border-blue-300 bg-white/50 transition-all duration-300"
                />
              </div>
            </div>
            <div className="form-input-group">
              <Label htmlFor={`description-${project.id}`}>Project Description</Label>
              <Textarea
                id={`description-${project.id}`}
                value={project.description}
                onChange={(e) => handleChange(project.id, "description", e.target.value)}
                placeholder="Describe your project in detail"
                rows={3}
                required
                className="border-blue-100 focus:border-blue-300 bg-white/50 transition-all duration-300"
              />
            </div>
          </div>
        ))}

        <Button 
          type="button" 
          variant="outline" 
          onClick={handleAddMore} 
          className="w-full form-inner-box py-3 flex items-center justify-center gap-2 hover:bg-blue-50"
        >
          <Plus className="h-4 w-4" /> Add Another Project
        </Button>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white"
        >
          Save & Continue
        </Button>
      </form>
    </FormSection>
  );
};

export default ProjectsForm;
