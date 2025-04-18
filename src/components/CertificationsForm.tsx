
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Award } from "lucide-react";
import FormSection from "@/components/ui/form-section";

interface CertificationData {
  course_name: string;
  issuing_institution: string;
  issue_date: string;
  completion_date: string;
  duration: string;
  student_id: string;
  credential_link: string;
}

interface CertificationsFormProps {
  onFormSubmit: (data: CertificationData[]) => void;
  initialData?: CertificationData[];
}

const CertificationsForm = ({ onFormSubmit, initialData = [] }: CertificationsFormProps) => {
  const [certifications, setCertifications] = React.useState<CertificationData[]>(
    initialData.length > 0 ? initialData : [getEmptyCertification()]
  );

  function getEmptyCertification(): CertificationData {
    return {
      course_name: "",
      issuing_institution: "",
      issue_date: "",
      completion_date: "",
      duration: "",
      student_id: "",
      credential_link: "",
    };
  }

  const handleAddCertification = () => {
    setCertifications([...certifications, getEmptyCertification()]);
  };

  const handleRemoveCertification = (index: number) => {
    const newCertifications = certifications.filter((_, i) => i !== index);
    setCertifications(newCertifications);
  };

  const handleChange = (index: number, field: keyof CertificationData, value: string) => {
    const newCertifications = [...certifications];
    newCertifications[index] = {
      ...newCertifications[index],
      [field]: value,
    };
    setCertifications(newCertifications);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(certifications);
  };

  return (
    <FormSection title="Certifications" icon={<Award className="w-5 h-5 text-white" />}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {certifications.map((certification, index) => (
          <div key={index} className="form-section">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-blue-900">
                Certification #{index + 1}
              </h3>
              {certifications.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveCertification(index)}
                  className="remove-button"
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Remove
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-input-group">
                <Label htmlFor={`course-${index}`}>Course Name</Label>
                <Input
                  id={`course-${index}`}
                  value={certification.course_name}
                  onChange={(e) => handleChange(index, "course_name", e.target.value)}
                  placeholder="Enter course name"
                  required
                  className="form-field"
                />
              </div>

              <div className="form-input-group">
                <Label htmlFor={`institution-${index}`}>Issuing Institution</Label>
                <Input
                  id={`institution-${index}`}
                  value={certification.issuing_institution}
                  onChange={(e) => handleChange(index, "issuing_institution", e.target.value)}
                  placeholder="Enter institution name"
                  required
                  className="form-field"
                />
              </div>

              <div className="form-input-group">
                <Label htmlFor={`issue-date-${index}`}>Issue Date</Label>
                <Input
                  id={`issue-date-${index}`}
                  type="date"
                  value={certification.issue_date}
                  onChange={(e) => handleChange(index, "issue_date", e.target.value)}
                  required
                  className="form-field"
                />
              </div>

              <div className="form-input-group">
                <Label htmlFor={`completion-date-${index}`}>Completion Date</Label>
                <Input
                  id={`completion-date-${index}`}
                  type="date"
                  value={certification.completion_date}
                  onChange={(e) => handleChange(index, "completion_date", e.target.value)}
                  required
                  className="form-field"
                />
              </div>

              <div className="form-input-group">
                <Label htmlFor={`duration-${index}`}>Duration</Label>
                <Input
                  id={`duration-${index}`}
                  value={certification.duration}
                  onChange={(e) => handleChange(index, "duration", e.target.value)}
                  placeholder="e.g., 6 months"
                  required
                  className="form-field"
                />
              </div>

              <div className="form-input-group">
                <Label htmlFor={`student-id-${index}`}>Student ID/Roll Number</Label>
                <Input
                  id={`student-id-${index}`}
                  value={certification.student_id}
                  onChange={(e) => handleChange(index, "student_id", e.target.value)}
                  placeholder="Enter ID/Roll number"
                  className="form-field"
                />
              </div>

              <div className="form-input-group md:col-span-2">
                <Label htmlFor={`credential-${index}`}>Credential Link</Label>
                <Input
                  id={`credential-${index}`}
                  value={certification.credential_link}
                  onChange={(e) => handleChange(index, "credential_link", e.target.value)}
                  placeholder="Enter credential URL"
                  type="url"
                  className="form-field"
                />
              </div>
            </div>
          </div>
        ))}

        <Button 
          type="button" 
          variant="outline" 
          onClick={handleAddCertification}
          className="w-full border-blue-200 hover:bg-blue-50"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Another Certification
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

export default CertificationsForm;
