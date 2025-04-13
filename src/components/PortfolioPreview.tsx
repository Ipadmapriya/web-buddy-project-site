import React, { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft, ExternalLink, Mail, Phone, MapPin, Calendar, Building, GraduationCap, Code, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface PortfolioPreviewProps {
  portfolioData: {
    personal: any;
    education: any[];
    experience: any[];
    projects: any[];
    skills: {
      technicalSkills: any[];
      softSkills: any[];
      interests: string[];
      hobbies: string[];
    };
    achievements: any[];
  };
  onStartOver: () => void;
}

const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({ portfolioData, onStartOver }) => {
  const { toast } = useToast();
  const portfolioRef = useRef<HTMLDivElement>(null);
  
  const handleDownload = async () => {
    if (!portfolioRef.current) return;

    toast({
      title: "Preparing download",
      description: "Please wait while we generate your portfolio PDF...",
    });
    
    try {
      const canvas = await html2canvas(portfolioRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: portfolioRef.current.scrollWidth,
        windowHeight: portfolioRef.current.scrollHeight
      });
      
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      
      const pageHeight = 297;
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      const fileName = `${portfolioData.personal.name || 'Portfolio'}_${new Date().toISOString().slice(0, 10)}.pdf`;
      pdf.save(fileName);
      
      toast({
        title: "Download complete",
        description: `Your portfolio has been downloaded as ${fileName}`,
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Download failed",
        description: "There was an error generating your portfolio PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" onClick={onStartOver}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Start Over
        </Button>
        <Button onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" /> Download Portfolio
        </Button>
      </div>

      <div ref={portfolioRef}>
        <section className="bg-primary text-primary-foreground p-8 rounded-lg mb-8">
          <h1 className="text-3xl font-bold">{portfolioData.personal.name || "Your Name"}</h1>
          <div className="mt-4 flex flex-wrap gap-4">
            {portfolioData.personal.email && (
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>{portfolioData.personal.email}</span>
              </div>
            )}
            {portfolioData.personal.phone && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>{portfolioData.personal.phone}</span>
              </div>
            )}
            {portfolioData.personal.address && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{portfolioData.personal.address}</span>
              </div>
            )}
          </div>
        </section>

        {portfolioData.experience.length > 0 && (
          <section>
            <div className="flex items-center mb-4">
              <Building className="h-5 w-5 mr-2" />
              <h2 className="text-2xl font-bold">Work Experience</h2>
            </div>
            <div className="space-y-4">
              {portfolioData.experience.map((exp, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold">{exp.position} at {exp.company}</h3>
                    <div className="flex items-center text-muted-foreground mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{exp.startDate} - {exp.endDate || "Present"}</span>
                    </div>
                    <p className="mt-2">{exp.description}</p>
                    {exp.technologies && (
                      <div className="mt-2">
                        <span className="font-medium">Technologies:</span> {exp.technologies}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {portfolioData.education.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <GraduationCap className="h-5 w-5 mr-2" />
              <h2 className="text-2xl font-bold">Education</h2>
            </div>
            <div className="space-y-4">
              {portfolioData.education.map((edu, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold">{edu.level}</h3>
                    <p className="font-medium">{edu.institution}, {edu.university}</p>
                    <div className="flex items-center text-muted-foreground mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Graduated: {edu.passoutYear}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                      <div><span className="font-medium">CGPA/Percentage:</span> {edu.cgpa}</div>
                      {edu.duration && <div><span className="font-medium">Duration:</span> {edu.duration} years</div>}
                      <div><span className="font-medium">Mode:</span> {edu.educationMode}</div>
                      {edu.backlogs && parseInt(edu.backlogs) > 0 && (
                        <div><span className="font-medium">Active Backlogs:</span> {edu.backlogs}</div>
                      )}
                      {edu.totalBacklogs && parseInt(edu.totalBacklogs) > 0 && (
                        <div><span className="font-medium">Total Backlogs:</span> {edu.totalBacklogs}</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {portfolioData.projects.length > 0 && (
          <section>
            <div className="flex items-center mb-4">
              <Code className="h-5 w-5 mr-2" />
              <h2 className="text-2xl font-bold">Projects</h2>
            </div>
            <div className="space-y-4">
              {portfolioData.projects.map((project, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold">{project.name}</h3>
                      {project.githubLink && (
                        <a 
                          href={project.githubLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-blue-500 hover:underline"
                        >
                          View Code <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2 text-sm">
                      <div><span className="font-medium">Role:</span> {project.role}</div>
                      <div><span className="font-medium">Team Size:</span> {project.teamSize}</div>
                      <div><span className="font-medium">Duration:</span> {project.duration}</div>
                      <div><span className="font-medium">Completed:</span> {project.completedDate}</div>
                    </div>
                    <p className="mt-2">{project.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Skills & Interests</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {portfolioData.skills.technicalSkills.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Technical Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1">
                    {portfolioData.skills.technicalSkills.map((skill, index) => (
                      <li key={index}>{skill.name} ({skill.proficiency})</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
            
            {portfolioData.skills.softSkills.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Soft Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1">
                    {portfolioData.skills.softSkills.map((skill, index) => (
                      <li key={index}>{skill.name} ({skill.proficiency})</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
            
            {portfolioData.skills.interests.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Interests</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1">
                    {portfolioData.skills.interests.map((interest, index) => (
                      <li key={index}>{interest}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {portfolioData.skills.hobbies.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Hobbies</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1">
                    {portfolioData.skills.hobbies.map((hobby, index) => (
                      <li key={index}>{hobby}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {portfolioData.achievements.length > 0 && (
          <section>
            <div className="flex items-center mb-4">
              <Award className="h-5 w-5 mr-2" />
              <h2 className="text-2xl font-bold">Awards & Achievements</h2>
            </div>
            <div className="space-y-4">
              {portfolioData.achievements.map((achievement, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold">{achievement.title}</h3>
                    <p className="font-medium">{achievement.organization}</p>
                    <div className="flex items-center text-muted-foreground mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{achievement.date}</span>
                    </div>
                    {achievement.description && <p className="mt-2">{achievement.description}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default PortfolioPreview;
