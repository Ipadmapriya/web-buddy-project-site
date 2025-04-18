
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Wrench, Heart, Star } from "lucide-react";
import FormSection from "@/components/ui/form-section";

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: string;
}

interface SkillsFormProps {
  onFormSubmit: (data: { 
    technicalSkills: Skill[], 
    softSkills: Skill[], 
    interests: string[], 
    hobbies: string[] 
  }) => void;
  initialData?: { 
    technicalSkills: Skill[], 
    softSkills: Skill[], 
    interests: string[], 
    hobbies: string[] 
  };
}

const SkillsForm = ({ onFormSubmit, initialData }: SkillsFormProps) => {
  const [technicalSkills, setTechnicalSkills] = React.useState<Skill[]>(
    initialData?.technicalSkills && initialData.technicalSkills.length > 0
      ? initialData.technicalSkills
      : [{ id: Date.now().toString(), name: "", category: "Programming", proficiency: "Intermediate" }]
  );
  
  const [softSkills, setSoftSkills] = React.useState<Skill[]>(
    initialData?.softSkills && initialData.softSkills.length > 0
      ? initialData.softSkills
      : [{ id: Date.now().toString(), name: "", category: "Soft Skill", proficiency: "Intermediate" }]
  );
  
  const [interests, setInterests] = React.useState<string[]>(
    initialData?.interests && initialData.interests.length > 0
      ? initialData.interests
      : [""]
  );
  
  const [hobbies, setHobbies] = React.useState<string[]>(
    initialData?.hobbies && initialData.hobbies.length > 0
      ? initialData.hobbies
      : [""]
  );

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

  const handleHobbyChange = (index: number, value: string) => {
    setHobbies((prev) => {
      const newHobbies = [...prev];
      newHobbies[index] = value;
      return newHobbies;
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

  const handleAddHobby = () => {
    setHobbies((prev) => [...prev, ""]);
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

  const handleRemoveHobby = (index: number) => {
    if (hobbies.length > 1) {
      setHobbies((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit({
      technicalSkills,
      softSkills,
      interests: interests.filter(i => i.trim() !== ""),
      hobbies: hobbies.filter(h => h.trim() !== "")
    });
  };

  return (
    <FormSection title="Skills & Interests" icon={<Star className="w-5 h-5 text-white" />}>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div className="bg-white/60 rounded-lg p-6 border border-blue-100 shadow-sm">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-blue-800">
              <Wrench className="w-5 h-5 text-blue-600" />
              Technical Skills
            </h3>
            <div className="space-y-4">
              {technicalSkills.map((skill) => (
                <div 
                  key={skill.id} 
                  className="flex items-center space-x-4 p-4 rounded-lg bg-white/80 border border-blue-50 transition-all duration-300 hover:bg-white/90"
                >
                  <div className="flex-1">
                    <Input
                      value={skill.name}
                      onChange={(e) => handleTechnicalChange(skill.id, "name", e.target.value)}
                      placeholder="React, Python, AWS, etc."
                      className="border-blue-100 focus:border-blue-200"
                      required
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={skill.category}
                      onChange={(e) => handleTechnicalChange(skill.id, "category", e.target.value)}
                      className="w-full h-10 rounded-md border border-blue-100 bg-white px-3 py-2 text-sm focus:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
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
                      className="w-full h-10 rounded-md border border-blue-100 bg-white px-3 py-2 text-sm focus:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
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
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={handleAddTechnical}
                className="w-full border-blue-200 hover:bg-blue-50 text-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Technical Skill
              </Button>
            </div>
          </div>

          <div className="bg-white/60 rounded-lg p-6 border border-purple-100 shadow-sm">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-purple-800">
              <Star className="w-5 h-5 text-purple-600" />
              Soft Skills
            </h3>
            <div className="space-y-4">
              {softSkills.map((skill) => (
                <div 
                  key={skill.id} 
                  className="flex items-center space-x-4 p-4 rounded-lg bg-white/80 border border-purple-50 transition-all duration-300 hover:bg-white/90"
                >
                  <div className="flex-1">
                    <Input
                      value={skill.name}
                      onChange={(e) => handleSoftSkillChange(skill.id, "name", e.target.value)}
                      placeholder="Communication, Leadership, etc."
                      className="border-purple-100 focus:border-purple-200"
                      required
                    />
                  </div>
                  <div className="w-40">
                    <select
                      value={skill.proficiency}
                      onChange={(e) => handleSoftSkillChange(skill.id, "proficiency", e.target.value)}
                      className="w-full h-10 rounded-md border border-purple-100 bg-white px-3 py-2 text-sm focus:border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-100"
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
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={handleAddSoft}
                className="w-full border-purple-200 hover:bg-purple-50 text-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Soft Skill
              </Button>
            </div>
          </div>

          <div className="bg-white/60 rounded-lg p-6 border border-green-100 shadow-sm">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-green-800">
              <Heart className="w-5 h-5 text-green-600" />
              Interests & Hobbies
            </h3>
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-green-700">Interests</h4>
                {interests.map((interest, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-4 p-4 rounded-lg bg-white/80 border border-green-50 transition-all duration-300 hover:bg-white/90"
                  >
                    <div className="flex-1">
                      <Input
                        value={interest}
                        onChange={(e) => handleInterestChange(index, e.target.value)}
                        placeholder="Reading, Photography, etc."
                        className="border-green-100 focus:border-green-200"
                      />
                    </div>
                    {interests.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveInterest(index)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddInterest}
                  className="w-full border-green-200 hover:bg-green-50 text-green-700"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Interest
                </Button>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-green-700">Hobbies</h4>
                {hobbies.map((hobby, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-4 p-4 rounded-lg bg-white/80 border border-green-50 transition-all duration-300 hover:bg-white/90"
                  >
                    <div className="flex-1">
                      <Input
                        value={hobby}
                        onChange={(e) => handleHobbyChange(index, e.target.value)}
                        placeholder="Cooking, Hiking, etc."
                        className="border-green-100 focus:border-green-200"
                      />
                    </div>
                    {hobbies.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveHobby(index)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddHobby}
                  className="w-full border-green-200 hover:bg-green-50 text-green-700"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Hobby
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-300"
        >
          Save & Continue
        </Button>
      </form>
    </FormSection>
  );
};

export default SkillsForm;
