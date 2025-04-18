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

const CertificationsForm: React.FC<CertificationsFormProps> = ({
  onFormSubmit,
  initialData = [],
}) => {
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

  const handleSubmit = () => {
    onFormSubmit(certifications);
  };

  const handleChange = (index: number, field: keyof CertificationData, value: string) => {
    const newCertifications = [...certifications];
    newCertifications[index] = {
      ...newCertifications[index],
      [field]: value,
    };
    setCertifications(newCertifications);
  };

  return (
    <FormSection title="Certifications" icon={<Award className="w-5 h-5 text-white" />}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {certifications.map((certification, index) => (
          <div 
            key={index} 
            className="form-inner-box"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-blue-900">Certification {index + 1}</h3>
              {certifications.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveCertification(index)}
                  className="bg-red-100 hover:bg-red-200 text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Remove
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Course Name</Label>
                <Input
                  value={certification.course_name}
                  onChange={(e) => handleChange(index, "course_name", e.target.value)}
                  placeholder="Enter course name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Issuing Institution</Label>
                <Input
                  value={certification.issuing_institution}
                  onChange={(e) => handleChange(index, "issuing_institution", e.target.value)}
                  placeholder="Enter institution name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Issue Date</Label>
                <Input
                  type="date"
                  value={certification.issue_date}
                  onChange={(e) => handleChange(index, "issue_date", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Completion Date</Label>
                <Input
                  type="date"
                  value={certification.completion_date}
                  onChange={(e) => handleChange(index, "completion_date", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Duration</Label>
                <Input
                  value={certification.duration}
                  onChange={(e) => handleChange(index, "duration", e.target.value)}
                  placeholder="e.g., 6 months"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Student ID/Roll Number</Label>
                <Input
                  value={certification.student_id}
                  onChange={(e) => handleChange(index, "student_id", e.target.value)}
                  placeholder="Enter ID/Roll number"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label className="text-sm font-medium">Credential Link</Label>
                <Input
                  value={certification.credential_link}
                  onChange={(e) => handleChange(index, "credential_link", e.target.value)}
                  placeholder="Enter credential URL"
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
