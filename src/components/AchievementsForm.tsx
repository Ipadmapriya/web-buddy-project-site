import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Trophy } from "lucide-react";
import FormSection from "@/components/ui/form-section";

interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
}

interface AchievementsFormProps {
  onFormSubmit: (data: Achievement[]) => void;
  initialData?: Achievement[];
}

const AchievementsForm = ({ onFormSubmit, initialData = [] }: AchievementsFormProps) => {
  const [achievements, setAchievements] = React.useState<Achievement[]>(
    initialData.length > 0
      ? initialData
      : [
          {
            id: Date.now().toString(),
            title: "",
            organization: "",
            date: "",
            description: "",
          },
        ]
  );

  const handleChange = (id: string, field: keyof Achievement, value: string) => {
    setAchievements((prev) =>
      prev.map((achievement) => (achievement.id === id ? { ...achievement, [field]: value } : achievement))
    );
  };

  const handleAddMore = () => {
    setAchievements((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: "",
        organization: "",
        date: "",
        description: "",
      },
    ]);
  };

  const handleRemove = (id: string) => {
    if (achievements.length > 1) {
      setAchievements((prev) => prev.filter((achievement) => achievement.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(achievements);
  };

  return (
    <FormSection title="Awards & Achievements" icon={<Trophy className="w-5 h-5 text-white" />}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {achievements.map((achievement, index) => (
          <div key={achievement.id} className="achievement-card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-blue-900">
                Achievement #{index + 1}
              </h3>
              {achievements.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemove(achievement.id)}
                  className="remove-button"
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Remove
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-input-group">
                <Label htmlFor={`title-${achievement.id}`}>Title/Award Name</Label>
                <Input
                  id={`title-${achievement.id}`}
                  value={achievement.title}
                  onChange={(e) => handleChange(achievement.id, "title", e.target.value)}
                  placeholder="Best Project Award, Dean's List, etc."
                  required
                  className="form-field"
                />
              </div>

              <div className="form-input-group">
                <Label htmlFor={`organization-${achievement.id}`}>Organization/Issuer</Label>
                <Input
                  id={`organization-${achievement.id}`}
                  value={achievement.organization}
                  onChange={(e) => handleChange(achievement.id, "organization", e.target.value)}
                  placeholder="University, Company, etc."
                  required
                  className="form-field"
                />
              </div>

              <div className="form-input-group">
                <Label htmlFor={`date-${achievement.id}`}>Date Achieved</Label>
                <Input
                  id={`date-${achievement.id}`}
                  value={achievement.date}
                  onChange={(e) => handleChange(achievement.id, "date", e.target.value)}
                  placeholder="May 2023"
                  required
                  className="form-field"
                />
              </div>

              <div className="form-input-group md:col-span-2">
                <Label htmlFor={`description-${achievement.id}`}>Description</Label>
                <Textarea
                  id={`description-${achievement.id}`}
                  value={achievement.description}
                  onChange={(e) => handleChange(achievement.id, "description", e.target.value)}
                  placeholder="Describe your achievement and its significance"
                  rows={3}
                  className="form-field"
                />
              </div>
            </div>
          </div>
        ))}

        <Button 
          type="button" 
          variant="outline" 
          onClick={handleAddMore}
          className="w-full border-blue-200 hover:bg-blue-50"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Another Achievement
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

export default AchievementsForm;
