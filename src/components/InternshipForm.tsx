import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, GraduationCap } from "lucide-react";
import FormSection from "@/components/ui/form-section";
import { useToast } from "@/hooks/use-toast";

interface Internship {
  id: string;
  company: string;
  designation: string;
  period: string;
  teamSize: string;
  projectsCount: string;
  projectRole: string;
  technologies: string;
  certificateLink: string;
}

interface InternshipFormProps {
  onFormSubmit: (data: Internship[]) => void;
  initialData?: Internship[];
}

const InternshipForm = ({ onFormSubmit, initialData = [] }: InternshipFormProps) => {
  const { toast } = useToast();
  const [internships, setInternships] = React.useState<Internship[]>(
    initialData && initialData.length > 0 
      ? initialData 
      : [
          {
            id: Date.now().toString(),
            company: "",
            designation: "",
            period: "",
            teamSize: "",
            projectsCount: "",
            projectRole: "",
            technologies: "",
            certificateLink: "",
          },
        ]
  );

  const handleChange = (id: string, field: keyof Internship, value: string) => {
    setInternships((prev) =>
      prev.map((intern) => (intern.id === id ? { ...intern, [field]: value } : intern))
    );
  };

  const handleAddMore = () => {
    setInternships((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        company: "",
        designation: "",
        period: "",
        teamSize: "",
        projectsCount: "",
        projectRole: "",
        technologies: "",
        certificateLink: "",
      },
    ]);
  };

  const handleRemove = (id: string) => {
    if (internships.length > 1) {
      setInternships((prev) => prev.filter((intern) => intern.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const hasEmptyRequiredFields = internships.some(
      internship => !internship.company || !internship.designation || !internship.period
    );
    
    if (hasEmptyRequiredFields) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields (Company, Designation, and Period).",
      });
      return;
    }
    
    onFormSubmit(internships);
  };

  return (
    <FormSection title="Internships" icon={<GraduationCap className="w-5 h-5 text-white" />}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {internships.map((internship, index) => (
          <div 
            key={internship.id} 
            className="p-4 rounded-lg space-y-4 bg-white/40 border border-blue-100 transition-all duration-300 hover:bg-white/60"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-blue-900">Internship #{index + 1}</h3>
              {internships.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemove(internship.id)}
                  className="bg-red-100 hover:bg-red-200 text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Remove
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`company-${internship.id}`}>Company Name *</Label>
                <Input
                  id={`company-${internship.id}`}
                  value={internship.company}
                  onChange={(e) => handleChange(internship.id, "company", e.target.value)}
                  placeholder="Google, Amazon, etc."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`designation-${internship.id}`}>Designation *</Label>
                <Input
                  id={`designation-${internship.id}`}
                  value={internship.designation}
                  onChange={(e) => handleChange(internship.id, "designation", e.target.value)}
                  placeholder="Software Engineer Intern, etc."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`period-${internship.id}`}>Internship Period *</Label>
                <Input
                  id={`period-${internship.id}`}
                  value={internship.period}
                  onChange={(e) => handleChange(internship.id, "period", e.target.value)}
                  placeholder="3 months, Jan 2023 - Mar 2023, etc."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`team-${internship.id}`}>Team Size</Label>
                <Input
                  id={`team-${internship.id}`}
                  value={internship.teamSize}
                  onChange={(e) => handleChange(internship.id, "teamSize", e.target.value)}
                  placeholder="5, 10, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`projects-${internship.id}`}>Number of Projects</Label>
                <Input
                  id={`projects-${internship.id}`}
                  value={internship.projectsCount}
                  onChange={(e) => handleChange(internship.id, "projectsCount", e.target.value)}
                  placeholder="1, 2, etc."
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`role-${internship.id}`}>Part of the Internship Project Operated</Label>
              <Textarea
                id={`role-${internship.id}`}
                value={internship.projectRole}
                onChange={(e) => handleChange(internship.id, "projectRole", e.target.value)}
                placeholder="Describe your role and responsibilities in the project"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`technologies-${internship.id}`}>Tools & Technologies Learnt</Label>
              <Textarea
                id={`technologies-${internship.id}`}
                value={internship.technologies}
                onChange={(e) => handleChange(internship.id, "technologies", e.target.value)}
                placeholder="React, Node.js, Python, AWS, etc."
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`certificate-${internship.id}`}>Certificate Link</Label>
              <Input
                id={`certificate-${internship.id}`}
                value={internship.certificateLink}
                onChange={(e) => handleChange(internship.id, "certificateLink", e.target.value)}
                placeholder="https://example.com/certificate"
                type="url"
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
          <Plus className="h-4 w-4 mr-2" /> Add Another Internship
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

export default InternshipForm;
