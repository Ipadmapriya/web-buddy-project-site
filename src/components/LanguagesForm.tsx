
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, XCircle } from "lucide-react";

interface LanguageData {
  language_name: string;
  reading_proficiency: string;
  writing_proficiency: string;
  speaking_proficiency: string;
  is_native: boolean;
}

interface LanguagesFormProps {
  onFormSubmit: (data: LanguageData[]) => void;
  initialData?: LanguageData[];
}

const proficiencyLevels = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Fluent",
  "Native",
];

const LanguagesForm: React.FC<LanguagesFormProps> = ({
  onFormSubmit,
  initialData = [],
}) => {
  const [languages, setLanguages] = React.useState<LanguageData[]>(
    initialData.length > 0 ? initialData : [getEmptyLanguage()]
  );

  function getEmptyLanguage(): LanguageData {
    return {
      language_name: "",
      reading_proficiency: "",
      writing_proficiency: "",
      speaking_proficiency: "",
      is_native: false,
    };
  }

  const handleAddLanguage = () => {
    setLanguages([...languages, getEmptyLanguage()]);
  };

  const handleRemoveLanguage = (index: number) => {
    const newLanguages = languages.filter((_, i) => i !== index);
    setLanguages(newLanguages);
  };

  const handleSubmit = () => {
    onFormSubmit(languages);
  };

  const handleChange = (index: number, field: keyof LanguageData, value: any) => {
    const newLanguages = [...languages];
    newLanguages[index] = {
      ...newLanguages[index],
      [field]: value,
    };
    setLanguages(newLanguages);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Languages</h2>
        <Button type="button" onClick={handleAddLanguage} variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Language
        </Button>
      </div>

      {languages.map((language, index) => (
        <Card key={index} className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">Language {index + 1}</h3>
            {languages.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveLanguage(index)}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Language Name</label>
              <Input
                value={language.language_name}
                onChange={(e) => handleChange(index, "language_name", e.target.value)}
                placeholder="Enter language name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Reading Proficiency</label>
              <Select
                value={language.reading_proficiency}
                onValueChange={(value) => handleChange(index, "reading_proficiency", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select proficiency" />
                </SelectTrigger>
                <SelectContent>
                  {proficiencyLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Writing Proficiency</label>
              <Select
                value={language.writing_proficiency}
                onValueChange={(value) => handleChange(index, "writing_proficiency", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select proficiency" />
                </SelectTrigger>
                <SelectContent>
                  {proficiencyLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Speaking Proficiency</label>
              <Select
                value={language.speaking_proficiency}
                onValueChange={(value) => handleChange(index, "speaking_proficiency", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select proficiency" />
                </SelectTrigger>
                <SelectContent>
                  {proficiencyLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={language.is_native}
                onCheckedChange={(checked) => handleChange(index, "is_native", checked)}
              />
              <label className="text-sm font-medium">Native Language</label>
            </div>
          </div>
        </Card>
      ))}

      <div className="flex justify-end space-x-4">
        <Button type="submit" onClick={handleSubmit}>
          Save & Continue
        </Button>
      </div>
    </div>
  );
};

export default LanguagesForm;
