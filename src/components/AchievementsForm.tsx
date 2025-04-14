import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

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
    initialData && initialData.length > 0
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Awards & Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {achievements.map((achievement, index) => (
            <div key={achievement.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Achievement #{index + 1}</h3>
                {achievements.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemove(achievement.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Remove
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`title-${achievement.id}`}>Title/Award Name</Label>
                  <Input
                    id={`title-${achievement.id}`}
                    value={achievement.title}
                    onChange={(e) => handleChange(achievement.id, "title", e.target.value)}
                    placeholder="Best Project Award, Dean's List, etc."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`organization-${achievement.id}`}>Organization/Issuer</Label>
                  <Input
                    id={`organization-${achievement.id}`}
                    value={achievement.organization}
                    onChange={(e) => handleChange(achievement.id, "organization", e.target.value)}
                    placeholder="University, Company, etc."
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`date-${achievement.id}`}>Date Achieved</Label>
                  <Input
                    id={`date-${achievement.id}`}
                    value={achievement.date}
                    onChange={(e) => handleChange(achievement.id, "date", e.target.value)}
                    placeholder="May 2023"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`description-${achievement.id}`}>Description</Label>
                <Textarea
                  id={`description-${achievement.id}`}
                  value={achievement.description}
                  onChange={(e) => handleChange(achievement.id, "description", e.target.value)}
                  placeholder="Describe your achievement and its significance"
                  rows={3}
                />
              </div>
            </div>
          ))}

          <Button type="button" variant="outline" onClick={handleAddMore} className="w-full">
            <Plus className="h-4 w-4 mr-2" /> Add Another Achievement
          </Button>
          <Button type="submit" className="w-full">Save & Continue</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AchievementsForm;
