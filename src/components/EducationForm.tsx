import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface Education {
  id: string;
  level: string;
  institution: string;
  university: string;
  cgpa: string;
  educationMode: string;
  duration: string;
  backlogs: string;
  totalBacklogs: string;
  passoutYear: string;
  major?: string;
  courseName?: string;
}

interface EducationFormProps {
  onFormSubmit: (data: Education[]) => void;
  initialData?: Education[];
  userType?: string;
}

const EducationForm = ({ onFormSubmit, initialData = [], userType }: EducationFormProps) => {
  const defaultEducation = [
    {
      id: "high-school",
      level: "10th Standard",
      institution: "",
      university: "",
      cgpa: "",
      educationMode: "",
      duration: "",
      backlogs: "0",
      totalBacklogs: "0",
      passoutYear: "",
    },
    {
      id: "higher-secondary",
      level: "12th Standard",
      institution: "",
      university: "",
      cgpa: "",
      educationMode: "",
      duration: "",
      backlogs: "0",
      totalBacklogs: "0",
      passoutYear: "",
      major: "",
    },
    {
      id: "undergraduate",
      level: "Undergraduate",
      institution: "",
      university: "",
      cgpa: "",
      educationMode: "",
      duration: "",
      backlogs: "0",
      totalBacklogs: "0",
      passoutYear: "",
      courseName: "",
    },
  ];

  const [educations, setEducations] = React.useState<Education[]>(
    initialData && initialData.length > 0 ? initialData : defaultEducation
  );

  const handleChange = (id: string, field: keyof Education, value: string) => {
    setEducations((prev) =>
      prev.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  const handleAddMore = () => {
    setEducations((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        level: "Postgraduate",
        institution: "",
        university: "",
        cgpa: "",
        educationMode: "",
        duration: "",
        backlogs: "0",
        totalBacklogs: "0",
        passoutYear: "",
        courseName: "",
      },
    ]);
  };

  const handleRemove = (id: string) => {
    if (!["high-school", "higher-secondary", "undergraduate"].includes(id)) {
      setEducations((prev) => prev.filter((edu) => edu.id !== id));
    }
  };

  React.useEffect(() => {
    if (userType?.toLowerCase().includes('undergraduate')) {
      setEducations(prev => prev.filter(edu => 
        ["high-school", "higher-secondary", "undergraduate"].includes(edu.id))
      );
    }
  }, [userType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(educations);
  };

  const isUndergraduate = userType?.toLowerCase().includes('undergraduate');

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Education</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {educations.map((education) => (
            <div key={education.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{education.level}</h3>
                {!["high-school", "higher-secondary", "undergraduate"].includes(education.id) && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemove(education.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Remove
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`institution-${education.id}`}>Institution/College Name</Label>
                  <Input
                    id={`institution-${education.id}`}
                    value={education.institution}
                    onChange={(e) => handleChange(education.id, "institution", e.target.value)}
                    placeholder="Institution name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`university-${education.id}`}>University/Board</Label>
                  <Input
                    id={`university-${education.id}`}
                    value={education.university}
                    onChange={(e) => handleChange(education.id, "university", e.target.value)}
                    placeholder="University or board name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`cgpa-${education.id}`}>CGPA/Percentage</Label>
                  <Input
                    id={`cgpa-${education.id}`}
                    value={education.cgpa}
                    onChange={(e) => handleChange(education.id, "cgpa", e.target.value)}
                    placeholder="8.5/10 or 85%"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`mode-${education.id}`}>Mode of Education</Label>
                  <Input
                    id={`mode-${education.id}`}
                    value={education.educationMode}
                    onChange={(e) => handleChange(education.id, "educationMode", e.target.value)}
                    placeholder="Full-time, Part-time, Distance, etc."
                    required
                  />
                </div>
                
                {education.level === "12th Standard" && (
                  <div className="space-y-2">
                    <Label htmlFor={`major-${education.id}`}>Major/Stream</Label>
                    <Input
                      id={`major-${education.id}`}
                      value={education.major || ""}
                      onChange={(e) => handleChange(education.id, "major", e.target.value)}
                      placeholder="Computer Science, Mathematics, etc."
                      required
                    />
                  </div>
                )}
                
                {(education.level === "Undergraduate" || education.level === "Postgraduate") && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor={`courseName-${education.id}`}>Course Name</Label>
                      <Input
                        id={`courseName-${education.id}`}
                        value={education.courseName || ""}
                        onChange={(e) => handleChange(education.id, "courseName", e.target.value)}
                        placeholder="B.Tech, BCA, MCA, etc."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`duration-${education.id}`}>Duration (Years)</Label>
                      <Input
                        id={`duration-${education.id}`}
                        value={education.duration}
                        onChange={(e) => handleChange(education.id, "duration", e.target.value)}
                        placeholder="2, 3, 4, etc."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`backlogs-${education.id}`}>Active Backlogs</Label>
                      <Input
                        id={`backlogs-${education.id}`}
                        value={education.backlogs}
                        onChange={(e) => handleChange(education.id, "backlogs", e.target.value)}
                        placeholder="0, 1, 2, etc."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`totalBacklogs-${education.id}`}>Total Backlogs</Label>
                      <Input
                        id={`totalBacklogs-${education.id}`}
                        value={education.totalBacklogs}
                        onChange={(e) => handleChange(education.id, "totalBacklogs", e.target.value)}
                        placeholder="0, 1, 2, etc."
                        required
                      />
                    </div>
                  </>
                )}
                
                {education.level === "10th Standard" && (
                  <div className="md:col-span-2"></div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor={`passout-${education.id}`}>Year of Passing</Label>
                  <Input
                    id={`passout-${education.id}`}
                    value={education.passoutYear}
                    onChange={(e) => handleChange(education.id, "passoutYear", e.target.value)}
                    placeholder="2022"
                    required
                  />
                </div>
              </div>
            </div>
          ))}

          {!isUndergraduate && (
            <Button type="button" variant="outline" onClick={handleAddMore} className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Add Postgraduate Education
            </Button>
          )}
          <Button type="submit" className="w-full">Save & Continue</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EducationForm;
