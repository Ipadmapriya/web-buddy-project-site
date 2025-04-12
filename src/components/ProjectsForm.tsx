
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

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
}

const ProjectsForm = ({ onFormSubmit }: ProjectsFormProps) => {
  const [projects, setProjects] = React.useState<Project[]>([
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {projects.map((project, index) => (
            <div key={project.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Project #{index + 1}</h3>
                {projects.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemove(project.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Remove
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`name-${project.id}`}>Project Name</Label>
                  <Input
                    id={`name-${project.id}`}
                    value={project.name}
                    onChange={(e) => handleChange(project.id, "name", e.target.value)}
                    placeholder="My Amazing Project"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`github-${project.id}`}>GitHub Link</Label>
                  <Input
                    id={`github-${project.id}`}
                    value={project.githubLink}
                    onChange={(e) => handleChange(project.id, "githubLink", e.target.value)}
                    placeholder="https://github.com/username/project"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`team-${project.id}`}>Team Size</Label>
                  <Input
                    id={`team-${project.id}`}
                    value={project.teamSize}
                    onChange={(e) => handleChange(project.id, "teamSize", e.target.value)}
                    placeholder="3, 5, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`duration-${project.id}`}>Project Duration</Label>
                  <Input
                    id={`duration-${project.id}`}
                    value={project.duration}
                    onChange={(e) => handleChange(project.id, "duration", e.target.value)}
                    placeholder="2 months, 1 year, etc."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`role-${project.id}`}>Your Role</Label>
                  <Input
                    id={`role-${project.id}`}
                    value={project.role}
                    onChange={(e) => handleChange(project.id, "role", e.target.value)}
                    placeholder="Frontend Developer, Team Lead, etc."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`completed-${project.id}`}>Completion Date</Label>
                  <Input
                    id={`completed-${project.id}`}
                    value={project.completedDate}
                    onChange={(e) => handleChange(project.id, "completedDate", e.target.value)}
                    placeholder="May 2023"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`description-${project.id}`}>Project Description</Label>
                <Textarea
                  id={`description-${project.id}`}
                  value={project.description}
                  onChange={(e) => handleChange(project.id, "description", e.target.value)}
                  placeholder="Describe your project in detail"
                  rows={3}
                  required
                />
              </div>
            </div>
          ))}

          <Button type="button" variant="outline" onClick={handleAddMore} className="w-full">
            <Plus className="h-4 w-4 mr-2" /> Add Another Project
          </Button>
          <Button type="submit" className="w-full">Save & Continue</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectsForm;
