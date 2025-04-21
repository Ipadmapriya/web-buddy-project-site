
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { jsPDF } from "jspdf";
import { useToast } from "@/hooks/use-toast";

interface PortfolioDownloadProps {
  portfolioData: any;
}

const PortfolioDownload: React.FC<PortfolioDownloadProps> = ({ portfolioData }) => {
  const { toast } = useToast();

  const generatePDF = () => {
    try {
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.text(`${portfolioData.personal.name || 'Portfolio'} - Resume`, 20, 20);
      
      // Personal Information
      doc.setFontSize(16);
      doc.text("Personal Information", 20, 35);
      doc.setFontSize(12);
      doc.text(`Name: ${portfolioData.personal.name || 'N/A'}`, 20, 45);
      doc.text(`Email: ${portfolioData.personal.email || 'N/A'}`, 20, 52);
      doc.text(`Phone: ${portfolioData.personal.phone || 'N/A'}`, 20, 59);
      
      // Education
      let yPosition = 70;
      doc.setFontSize(16);
      doc.text("Education", 20, yPosition);
      yPosition += 10;
      doc.setFontSize(12);
      
      if (portfolioData.education && portfolioData.education.length > 0) {
        portfolioData.education.forEach((edu: any) => {
          doc.text(`${edu.degree || 'Degree'} - ${edu.institution || 'Institution'}`, 20, yPosition);
          doc.text(`${edu.startDate || 'Start'} - ${edu.endDate || 'End'}`, 20, yPosition + 7);
          yPosition += 15;
        });
      } else {
        doc.text("No education data available", 20, yPosition);
        yPosition += 10;
      }
      
      // Skills
      yPosition += 5;
      doc.setFontSize(16);
      doc.text("Skills", 20, yPosition);
      yPosition += 10;
      doc.setFontSize(12);
      
      if (portfolioData.skills && portfolioData.skills.technicalSkills) {
        doc.text("Technical Skills:", 20, yPosition);
        const technicalSkills = portfolioData.skills.technicalSkills.join(", ");
        const wrappedTechSkills = doc.splitTextToSize(technicalSkills, 170);
        doc.text(wrappedTechSkills, 20, yPosition + 7);
        yPosition += 7 + (wrappedTechSkills.length * 7);
      }
      
      if (portfolioData.skills && portfolioData.skills.softSkills) {
        doc.text("Soft Skills:", 20, yPosition);
        const softSkills = portfolioData.skills.softSkills.join(", ");
        const wrappedSoftSkills = doc.splitTextToSize(softSkills, 170);
        doc.text(wrappedSoftSkills, 20, yPosition + 7);
        yPosition += 7 + (wrappedSoftSkills.length * 7);
      }
      
      // Experience section (only if not student/fresher)
      if (portfolioData.experience && portfolioData.experience.length > 0) {
        yPosition += 5;
        doc.setFontSize(16);
        doc.text("Work Experience", 20, yPosition);
        yPosition += 10;
        doc.setFontSize(12);
        
        portfolioData.experience.forEach((exp: any) => {
          doc.text(`${exp.title || 'Position'} at ${exp.company || 'Company'}`, 20, yPosition);
          doc.text(`${exp.startDate || 'Start'} - ${exp.endDate || 'Present'}`, 20, yPosition + 7);
          const description = doc.splitTextToSize(exp.description || '', 170);
          doc.text(description, 20, yPosition + 14);
          yPosition += 14 + (description.length * 7) + 5;
        });
      }
      
      // Projects
      if (portfolioData.projects && portfolioData.projects.length > 0) {
        yPosition += 5;
        doc.setFontSize(16);
        doc.text("Projects", 20, yPosition);
        yPosition += 10;
        doc.setFontSize(12);
        
        portfolioData.projects.forEach((project: any, index: number) => {
          // Add new page if we're running out of space
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
          }
          
          doc.text(`${project.name || `Project ${index + 1}`}`, 20, yPosition);
          const description = doc.splitTextToSize(project.description || '', 170);
          doc.text(description, 20, yPosition + 7);
          yPosition += 7 + (description.length * 7) + 5;
        });
      }

      // Save the PDF
      doc.save(`${portfolioData.personal.name || 'portfolio'}-resume.pdf`);
      
      toast({
        title: "PDF Generated",
        description: "Your portfolio has been downloaded as a PDF",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
      });
    }
  };

  return (
    <Button onClick={generatePDF} className="w-full md:w-auto mb-4">
      <Download className="mr-2 h-4 w-4" />
      Download as PDF
    </Button>
  );
};

export default PortfolioDownload;
