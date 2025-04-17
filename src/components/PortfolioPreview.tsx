
import React, { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft, ExternalLink, Mail, Phone, MapPin, Calendar, Building, GraduationCap, Code, Award, Briefcase, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";

interface PortfolioPreviewProps {
  portfolioData: {
    personal: any;
    education: any[];
    internships: any[];
    experience: any[];
    projects: any[];
    skills: {
      technicalSkills: any[];
      softSkills: any[];
      interests: string[];
      hobbies: string[];
    };
    achievements: any[];
    certifications?: any[];
    languages?: any[];
  };
  onStartOver: () => void;
  onSubmitFeedback: () => void;
}

const PortfolioPreview: React.FC<PortfolioPreviewProps> = ({
  portfolioData,
  onStartOver,
  onSubmitFeedback,
}) => {
  const { toast } = useToast();
  const portfolioRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
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
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      
      let heightLeft = imgHeight;
      let position = 0;
      let pageNumber = 1;

      // First page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add new pages if content overflows
      while (heightLeft >= 0) {
        position = -pageHeight * pageNumber;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        pageNumber++;
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

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "My Portfolio",
        text: "Check out my professional portfolio",
        url: window.location.href,
      });
    } catch (error) {
      // Fallback to copying to clipboard if Web Share API is not supported
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Portfolio link has been copied to your clipboard.",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6 bg-slate-50 p-4 rounded-lg shadow-sm">
        <div className="space-x-2">
          <Button variant="outline" onClick={onStartOver} className="hover:bg-slate-100 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Start Over
          </Button>
          <Button variant="secondary" onClick={handleBackToHome} className="bg-gradient-to-r from-slate-200 to-slate-300 hover:from-slate-300 hover:to-slate-400 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to User Types
          </Button>
        </div>
        <div className="space-x-2">
          <Button variant="outline" onClick={handleShare} className="hover:bg-blue-50 hover:text-blue-600 transition-colors">
            <Share2 className="mr-2 h-4 w-4" /> Share Portfolio
          </Button>
          <Button onClick={handleDownload} className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-colors">
            <Download className="mr-2 h-4 w-4" /> Download Portfolio
          </Button>
        </div>
      </div>

      <div ref={portfolioRef} className="print-container">
        {/* Professional header section with social links */}
        <section className="portfolio-header text-primary-foreground p-8 mb-8 shadow-lg border border-indigo-300">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            {portfolioData.personal.name || "Your Name"}
          </h1>
          <div className="mt-4 flex flex-wrap gap-4">
            {portfolioData.personal.email && (
              <div className="flex items-center bg-white/10 px-3 py-1 rounded-full text-sm">
                <Mail className="h-4 w-4 mr-2" />
                <span>{portfolioData.personal.email}</span>
              </div>
            )}
            {portfolioData.personal.phone && (
              <div className="flex items-center bg-white/10 px-3 py-1 rounded-full text-sm">
                <Phone className="h-4 w-4 mr-2" />
                <span>{portfolioData.personal.phone}</span>
              </div>
            )}
            {portfolioData.personal.address && (
              <div className="flex items-center bg-white/10 px-3 py-1 rounded-full text-sm">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{portfolioData.personal.address}</span>
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            {portfolioData.personal.linkedinUrl && (
              <a
                href={portfolioData.personal.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-primary-foreground hover:underline bg-blue-500/30 px-3 py-1 rounded-full text-sm transition-colors hover:bg-blue-500/40"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                LinkedIn Profile
              </a>
            )}
            {portfolioData.personal.githubUrl && (
              <a
                href={portfolioData.personal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-primary-foreground hover:underline bg-blue-500/30 px-3 py-1 rounded-full text-sm transition-colors hover:bg-blue-500/40"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                GitHub Profile
              </a>
            )}
          </div>
        </section>

        {/* Education section - Updated with all fields */}
        {portfolioData.education.length > 0 && (
          <section className="mb-8 print-section">
            <div className="portfolio-section-header">
              <GraduationCap className="h-6 w-6 mr-2 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-800">Education</h2>
            </div>
            <div className="space-y-4">
              {portfolioData.education.map((edu, index) => (
                <Card key={index} className="portfolio-card overflow-hidden">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-blue-700">{edu.level}</h3>
                    <p className="font-medium text-slate-700">{edu.institution}, {edu.university}</p>
                    <div className="flex items-center text-slate-500 mt-1">
                      <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                      <span>Graduated: {edu.passoutYear}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 bg-slate-50 p-3 rounded-md">
                      <div><span className="font-medium text-slate-700">CGPA/Percentage:</span> <span className="text-blue-700">{edu.cgpa}</span></div>
                      {edu.duration && <div><span className="font-medium text-slate-700">Duration:</span> <span className="text-blue-700">{edu.duration} years</span></div>}
                      <div><span className="font-medium text-slate-700">Mode:</span> <span className="text-blue-700">{edu.educationMode}</span></div>
                      
                      {/* Add 12th Standard Major */}
                      {edu.level === "12th Standard" && edu.major && (
                        <div><span className="font-medium text-slate-700">Major/Stream:</span> <span className="text-blue-700">{edu.major}</span></div>
                      )}
                      
                      {/* Add Course Name for UG/PG */}
                      {(edu.level === "Undergraduate" || edu.level === "Postgraduate") && edu.courseName && (
                        <div><span className="font-medium text-slate-700">Course:</span> <span className="text-blue-700">{edu.courseName}</span></div>
                      )}
                      
                      {/* Display backlogs for Undergraduate and Postgraduate */}
                      {(edu.level === "Undergraduate" || edu.level === "Postgraduate") && (
                        <>
                          <div><span className="font-medium text-slate-700">Active Backlogs:</span> <span className="text-blue-700">{edu.backlogs}</span></div>
                          <div><span className="font-medium text-slate-700">Total Backlogs:</span> <span className="text-blue-700">{edu.totalBacklogs}</span></div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Internship section with certificate links */}
        {portfolioData.internships && portfolioData.internships.length > 0 && (
          <section className="mb-8 print-section">
            <div className="portfolio-section-header">
              <Briefcase className="h-6 w-6 mr-2 text-indigo-600" />
              <h2 className="text-2xl font-bold text-slate-800">Internships</h2>
            </div>
            <div className="space-y-4">
              {portfolioData.internships.map((internship, index) => (
                <Card key={index} className="portfolio-card overflow-hidden border-l-4 border-l-indigo-500">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-indigo-700">{internship.designation} at {internship.company}</h3>
                    <div className="flex items-center text-slate-500 mt-1">
                      <Calendar className="h-4 w-4 mr-1 text-indigo-500" />
                      <span>{internship.period}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 bg-indigo-50 p-3 rounded-md">
                      {internship.teamSize && (
                        <div><span className="font-medium text-slate-700">Team Size:</span> <span className="text-indigo-700">{internship.teamSize}</span></div>
                      )}
                      {internship.projectsCount && (
                        <div><span className="font-medium text-slate-700">Projects:</span> <span className="text-indigo-700">{internship.projectsCount}</span></div>
                      )}
                    </div>
                    
                    {internship.projectRole && (
                      <div className="mt-3">
                        <span className="font-medium text-slate-700">Project Role:</span>
                        <p className="mt-1 text-slate-600">{internship.projectRole}</p>
                      </div>
                    )}
                    
                    {internship.technologies && (
                      <div className="mt-2">
                        <span className="font-medium text-slate-700">Technologies:</span>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {internship.technologies.split(',').map((tech, idx) => (
                            <span key={idx} className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">{tech.trim()}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {internship.certificateLink && (
                      <div className="mt-3">
                        <a
                          href={internship.certificateLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Certificate
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience section */}
        {portfolioData.experience.length > 0 && (
          <section className="mb-8 print-section">
            <div className="portfolio-section-header">
              <Building className="h-6 w-6 mr-2 text-purple-600" />
              <h2 className="text-2xl font-bold text-slate-800">Work Experience</h2>
            </div>
            <div className="space-y-4">
              {portfolioData.experience.map((exp, index) => (
                <Card key={index} className="portfolio-card overflow-hidden border-l-4 border-l-purple-500">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-purple-700">{exp.designation} at {exp.company}</h3>
                    <div className="flex items-center text-slate-500 mt-1">
                      <Calendar className="h-4 w-4 mr-1 text-purple-500" />
                      <span>{exp.yearsExperience}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 bg-purple-50 p-3 rounded-md">
                      {exp.employmentType && (
                        <div><span className="font-medium text-slate-700">Type:</span> <span className="text-purple-700">{exp.employmentType}</span></div>
                      )}
                      {exp.teamSize && (
                        <div><span className="font-medium text-slate-700">Team Size:</span> <span className="text-purple-700">{exp.teamSize}</span></div>
                      )}
                      {exp.projects && (
                        <div><span className="font-medium text-slate-700">Projects:</span> <span className="text-purple-700">{exp.projects}</span></div>
                      )}
                    </div>
                    
                    {exp.responsibilities && (
                      <div className="mt-3">
                        <span className="font-medium text-slate-700">Responsibilities:</span>
                        <p className="mt-1 text-slate-600">{exp.responsibilities}</p>
                      </div>
                    )}
                    
                    {exp.technologies && (
                      <div className="mt-2">
                        <span className="font-medium text-slate-700">Technologies:</span>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {exp.technologies.split(',').map((tech, idx) => (
                            <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">{tech.trim()}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Projects section */}
        {portfolioData.projects.length > 0 && (
          <section className="mb-8 print-section">
            <div className="portfolio-section-header">
              <Code className="h-6 w-6 mr-2 text-emerald-600" />
              <h2 className="text-2xl font-bold text-slate-800">Projects</h2>
            </div>
            <div className="space-y-4">
              {portfolioData.projects.map((project, index) => (
                <Card key={index} className="portfolio-card overflow-hidden border-l-4 border-l-emerald-500">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-emerald-700">{project.name}</h3>
                      {project.githubLink && (
                        <a 
                          href={project.githubLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-emerald-600 hover:text-emerald-800 transition-colors"
                        >
                          View Code <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3 bg-emerald-50 p-3 rounded-md text-sm">
                      <div><span className="font-medium text-slate-700">Role:</span> <span className="text-emerald-700">{project.role}</span></div>
                      <div><span className="font-medium text-slate-700">Team Size:</span> <span className="text-emerald-700">{project.teamSize}</span></div>
                      <div><span className="font-medium text-slate-700">Duration:</span> <span className="text-emerald-700">{project.duration}</span></div>
                      <div><span className="font-medium text-slate-700">Completed:</span> <span className="text-emerald-700">{project.completedDate}</span></div>
                    </div>
                    <p className="mt-3 text-slate-600">{project.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Skills section */}
        <section className="mb-8 print-section">
          <h2 className="text-2xl font-bold mb-4 text-slate-800 pb-2 border-b-2 border-slate-200">Skills & Interests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioData.skills.technicalSkills.length > 0 && (
              <Card className="portfolio-card overflow-hidden border-t-4 border-t-blue-500 hover:shadow-blue-100">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-white pb-2">
                  <CardTitle className="text-lg text-blue-700">Technical Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700">
                    {portfolioData.skills.technicalSkills.map((skill, index) => (
                      <li key={index}>{skill.name} <span className="text-blue-600">({skill.proficiency})</span></li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
            
            {portfolioData.skills.softSkills.length > 0 && (
              <Card className="portfolio-card overflow-hidden border-t-4 border-t-indigo-500 hover:shadow-indigo-100">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-white pb-2">
                  <CardTitle className="text-lg text-indigo-700">Soft Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700">
                    {portfolioData.skills.softSkills.map((skill, index) => (
                      <li key={index}>{skill.name} <span className="text-indigo-600">({skill.proficiency})</span></li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
            
            {portfolioData.skills.interests.length > 0 && (
              <Card className="portfolio-card overflow-hidden border-t-4 border-t-purple-500 hover:shadow-purple-100">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-white pb-2">
                  <CardTitle className="text-lg text-purple-700">Interests</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700">
                    {portfolioData.skills.interests.map((interest, index) => (
                      <li key={index}>{interest}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {portfolioData.skills.hobbies.length > 0 && (
              <Card className="portfolio-card overflow-hidden border-t-4 border-t-emerald-500 hover:shadow-emerald-100">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-white pb-2">
                  <CardTitle className="text-lg text-emerald-700">Hobbies</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700">
                    {portfolioData.skills.hobbies.map((hobby, index) => (
                      <li key={index}>{hobby}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Achievements section */}
        {portfolioData.achievements.length > 0 && (
          <section className="print-section">
            <div className="portfolio-section-header">
              <Award className="h-6 w-6 mr-2 text-amber-600" />
              <h2 className="text-2xl font-bold text-slate-800">Awards & Achievements</h2>
            </div>
            <div className="space-y-4">
              {portfolioData.achievements.map((achievement, index) => (
                <Card key={index} className="portfolio-card overflow-hidden border-l-4 border-l-amber-500">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-amber-700">{achievement.title}</h3>
                    <p className="font-medium text-slate-700">{achievement.organization}</p>
                    <div className="flex items-center text-slate-500 mt-1">
                      <Calendar className="h-4 w-4 mr-1 text-amber-500" />
                      <span>{achievement.date}</span>
                    </div>
                    {achievement.description && <p className="mt-2 text-slate-600">{achievement.description}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Certifications section */}
        {portfolioData.certifications?.length > 0 && (
          <section className="mb-8 print-section">
            <div className="portfolio-section-header">
              <Award className="h-6 w-6 mr-2 text-rose-600" />
              <h2 className="text-2xl font-bold text-slate-800">Certifications</h2>
            </div>
            <div className="space-y-4">
              {portfolioData.certifications.map((cert, index) => (
                <Card key={index} className="portfolio-card overflow-hidden border-l-4 border-l-rose-500">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold text-rose-700">{cert.course_name}</h3>
                    <p className="font-medium text-slate-700">{cert.issuing_institution}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 bg-rose-50 p-3 rounded-md">
                      <div><span className="font-medium text-slate-700">Issue Date:</span> <span className="text-rose-700">{cert.issue_date}</span></div>
                      <div><span className="font-medium text-slate-700">Completion Date:</span> <span className="text-rose-700">{cert.completion_date}</span></div>
                      <div><span className="font-medium text-slate-700">Duration:</span> <span className="text-rose-700">{cert.duration}</span></div>
                      {cert.student_id && (
                        <div><span className="font-medium text-slate-700">Student ID:</span> <span className="text-rose-700">{cert.student_id}</span></div>
                      )}
                    </div>
                    {cert.credential_link && (
                      <a
                        href={cert.credential_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-rose-600 hover:text-rose-800 mt-2 inline-flex items-center transition-colors"
                      >
                        View Credential <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Languages section */}
        {portfolioData.languages?.length > 0 && (
          <section className="mb-8 print-section">
            <div className="portfolio-section-header">
              <GraduationCap className="h-6 w-6 mr-2 text-cyan-600" />
              <h2 className="text-2xl font-bold text-slate-800">Languages</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {portfolioData.languages.map((lang, index) => (
                <Card key={index} className="portfolio-card overflow-hidden border-t-4 border-t-cyan-500 hover:shadow-cyan-100">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-2 text-cyan-700">{lang.language_name}</h3>
                    <div className="space-y-1 bg-cyan-50 p-3 rounded-md">
                      <p><span className="font-medium text-slate-700">Reading:</span> <span className="text-cyan-700">{lang.reading_proficiency}</span></p>
                      <p><span className="font-medium text-slate-700">Writing:</span> <span className="text-cyan-700">{lang.writing_proficiency}</span></p>
                      <p><span className="font-medium text-slate-700">Speaking:</span> <span className="text-cyan-700">{lang.speaking_proficiency}</span></p>
                      {lang.is_native && (
                        <p className="text-green-600 font-medium mt-1">Native Language</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="flex justify-center pb-8">
        <Button onClick={onSubmitFeedback} variant="secondary" size="lg" className="bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 transition-colors shadow-sm px-8">
          Submit Feedback
        </Button>
      </div>
    </div>
  );
};

export default PortfolioPreview;
