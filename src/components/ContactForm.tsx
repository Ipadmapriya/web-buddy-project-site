
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FormSection from "@/components/ui/form-section";
import { User } from "lucide-react";

interface ContactFormProps {
  onFormSubmit: (data: any) => void;
  initialData?: {
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
    linkedinUrl?: string;
    githubUrl?: string;
  };
}

const ContactForm = ({ onFormSubmit, initialData = {} }: ContactFormProps) => {
  const [formData, setFormData] = React.useState({
    name: initialData.name || "",
    phone: initialData.phone || "",
    email: initialData.email || "",
    address: initialData.address || "",
    linkedinUrl: initialData.linkedinUrl || "",
    githubUrl: initialData.githubUrl || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  return (
    <FormSection title="Personal Information" icon={<User className="w-5 h-5 text-white" />}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700 font-medium">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="border-blue-100 focus:border-blue-300 bg-white/50 transition-all duration-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-700 font-medium">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (123) 456-7890"
              required
              className="border-blue-100 focus:border-blue-300 bg-white/50 transition-all duration-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@example.com"
              type="email"
              required
              className="border-blue-100 focus:border-blue-300 bg-white/50 transition-all duration-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedinUrl" className="text-gray-700 font-medium">LinkedIn Profile URL</Label>
            <Input
              id="linkedinUrl"
              name="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/username"
              type="url"
              className="border-blue-100 focus:border-blue-300 bg-white/50 transition-all duration-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="githubUrl" className="text-gray-700 font-medium">GitHub Profile URL</Label>
            <Input
              id="githubUrl"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              placeholder="https://github.com/username"
              type="url"
              className="border-blue-100 focus:border-blue-300 bg-white/50 transition-all duration-300"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="address" className="text-gray-700 font-medium">Address</Label>
          <Textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your full address"
            rows={3}
            className="border-blue-100 focus:border-blue-300 bg-white/50 transition-all duration-300"
          />
        </div>
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

export default ContactForm;
