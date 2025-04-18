import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Languages } from "lucide-react";
import FormSection from "@/components/ui/form-section";

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

const LanguagesForm = ({ onFormSubmit, initialData = [] }: LanguagesFormProps) => {
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
    <FormSection title="Languages" icon={<Languages className="w-5 h-5 text-white" />}>
      <div className="space-y-6">
        {languages.map((language, index) => (
          <div 
            key={index} 
            className="p-4 rounded-lg space-y-4 bg-white/40 border border-blue-100 transition-all duration-300 hover:bg-white/60"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-blue-900">Language {index + 1}</h3>
              {languages.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveLanguage(index)}
                  className="bg-red-100 hover:bg-red-200 text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Remove
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
          </div>
        ))}

        <Button 
          type="button" 
          variant="outline" 
          onClick={handleAddLanguage} 
          className="w-full border-blue-200 hover:bg-blue-50"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Another Language
        </Button>
        
        <Button 
          type="submit" 
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
        >
          Save & Continue
        </Button>
      </div>
    </FormSection>
  );
};

export default LanguagesForm;
