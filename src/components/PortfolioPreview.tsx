
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft, ExternalLink, Mail, Phone, MapPin, Calendar, Building, GraduationCap, Code, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  
  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your portfolio is being prepared for download.",
    });
    
    // In a real implementation, this would generate a PDF or HTML file
    setTimeout(() => {
      toast({
        title: "Feature in development",
        description: "Portfolio download will be available in a future update.",
      });
    }, 2000);
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

      {/* Personal Information */}
      <section className="bg-primary text-primary-foreground p-8 rounded-lg">
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

      {/* Work Experience */}
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

      {/* Education */}
      {portfolioData.education.length > 0 && (
        <section>
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
                    <div><span className="font-medium">Duration:</span> {edu.duration} years</div>
                    <div><span className="font-medium">Mode:</span> {edu.educationMode}</div>
                    {edu.backlogs && parseInt(edu.backlogs) > 0 && (
                      <div><span className="font-medium">Active Backlogs:</span> {edu.backlogs}</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
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

      {/* Skills */}
      <section>
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

      {/* Achievements */}
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
  );
};

export default PortfolioPreview;
