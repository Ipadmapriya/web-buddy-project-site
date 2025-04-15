
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { PlusCircle, XCircle } from "lucide-react";

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Certifications</h2>
        <Button type="button" onClick={handleAddCertification} variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Certification
        </Button>
      </div>

      {certifications.map((certification, index) => (
        <Card key={index} className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">Certification {index + 1}</h3>
            {certifications.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveCertification(index)}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Course Name</label>
              <Input
                value={certification.course_name}
                onChange={(e) => handleChange(index, "course_name", e.target.value)}
                placeholder="Enter course name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Issuing Institution</label>
              <Input
                value={certification.issuing_institution}
                onChange={(e) => handleChange(index, "issuing_institution", e.target.value)}
                placeholder="Enter institution name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Issue Date</label>
              <Input
                type="date"
                value={certification.issue_date}
                onChange={(e) => handleChange(index, "issue_date", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Completion Date</label>
              <Input
                type="date"
                value={certification.completion_date}
                onChange={(e) => handleChange(index, "completion_date", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Duration</label>
              <Input
                value={certification.duration}
                onChange={(e) => handleChange(index, "duration", e.target.value)}
                placeholder="e.g., 6 months"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Student ID/Roll Number</label>
              <Input
                value={certification.student_id}
                onChange={(e) => handleChange(index, "student_id", e.target.value)}
                placeholder="Enter ID/Roll number"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Credential Link</label>
              <Input
                value={certification.credential_link}
                onChange={(e) => handleChange(index, "credential_link", e.target.value)}
                placeholder="Enter credential URL"
              />
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

export default CertificationsForm;
