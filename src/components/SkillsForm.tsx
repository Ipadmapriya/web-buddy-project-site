
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: string;
}

interface SkillsFormProps {
  onFormSubmit: (data: { technical: Skill[], soft: Skill[], interests: string[] }) => void;
}

const SkillsForm = ({ onFormSubmit }: SkillsFormProps) => {
  const [technicalSkills, setTechnicalSkills] = React.useState<Skill[]>([
    { id: Date.now().toString(), name: "", category: "Programming", proficiency: "Intermediate" }
  ]);
  
  const [softSkills, setSoftSkills] = React.useState<Skill[]>([
    { id: Date.now().toString(), name: "", category: "Soft Skill", proficiency: "Intermediate" }
  ]);
  
  const [interests, setInterests] = React.useState<string[]>([""]);

  const handleTechnicalChange = (id: string, field: keyof Skill, value: string) => {
    setTechnicalSkills((prev) =>
      prev.map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill))
    );
  };

  const handleSoftSkillChange = (id: string, field: keyof Skill, value: string) => {
    setSoftSkills((prev) =>
      prev.map((skill) => (skill.id === id ? { ...skill, [field]: value } : skill))
    );
  };

  const handleInterestChange = (index: number, value: string) => {
    setInterests((prev) => {
      const newInterests = [...prev];
      newInterests[index] = value;
      return newInterests;
    });
  };

  const handleAddTechnical = () => {
    setTechnicalSkills((prev) => [
      ...prev,
      { id: Date.now().toString(), name: "", category: "Programming", proficiency: "Intermediate" }
    ]);
  };

  const handleAddSoft = () => {
    setSoftSkills((prev) => [
      ...prev,
      { id: Date.now().toString(), name: "", category: "Soft Skill", proficiency: "Intermediate" }
    ]);
  };

  const handleAddInterest = () => {
    setInterests((prev) => [...prev, ""]);
  };

  const handleRemoveTechnical = (id: string) => {
    if (technicalSkills.length > 1) {
      setTechnicalSkills((prev) => prev.filter((skill) => skill.id !== id));
    }
  };

  const handleRemoveSoft = (id: string) => {
    if (softSkills.length > 1) {
      setSoftSkills((prev) => prev.filter((skill) => skill.id !== id));
    }
  };

  const handleRemoveInterest = (index: number) => {
    if (interests.length > 1) {
      setInterests((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit({
      technical: technicalSkills,
      soft: softSkills,
      interests: interests.filter(i => i.trim() !== "")
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Skills & Interests</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Technical Skills</h3>
            <div className="space-y-4">
              {technicalSkills.map((skill) => (
                <div key={skill.id} className="flex items-center space-x-4">
                  <div className="flex-1">
                    <Input
                      value={skill.name}
                      onChange={(e) => handleTechnicalChange(skill.id, "name", e.target.value)}
                      placeholder="React, Python, AWS, etc."
                      required
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={skill.category}
                      onChange={(e) => handleTechnicalChange(skill.id, "category", e.target.value)}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="Programming">Programming</option>
                      <option value="Database">Database</option>
                      <option value="DevOps">DevOps</option>
                      <option value="Design">Design</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="w-40">
                    <select
                      value={skill.proficiency}
                      onChange={(e) => handleTechnicalChange(skill.id, "proficiency", e.target.value)}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                  {technicalSkills.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveTechnical(skill.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={handleAddTechnical}>
                <Plus className="h-4 w-4 mr-2" /> Add Skill
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Soft Skills</h3>
            <div className="space-y-4">
              {softSkills.map((skill) => (
                <div key={skill.id} className="flex items-center space-x-4">
                  <div className="flex-1">
                    <Input
                      value={skill.name}
                      onChange={(e) => handleSoftSkillChange(skill.id, "name", e.target.value)}
                      placeholder="Communication, Leadership, etc."
                      required
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={skill.proficiency}
                      onChange={(e) => handleSoftSkillChange(skill.id, "proficiency", e.target.value)}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                  {softSkills.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveSoft(skill.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={handleAddSoft}>
                <Plus className="h-4 w-4 mr-2" /> Add Soft Skill
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Interests & Hobbies</h3>
            <div className="space-y-4">
              {interests.map((interest, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-1">
                    <Input
                      value={interest}
                      onChange={(e) => handleInterestChange(index, e.target.value)}
                      placeholder="Reading, Photography, etc."
                    />
                  </div>
                  {interests.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveInterest(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={handleAddInterest}>
                <Plus className="h-4 w-4 mr-2" /> Add Interest
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full">Save & Continue</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SkillsForm;
