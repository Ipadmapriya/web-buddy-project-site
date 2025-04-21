
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import PortfolioDownload from "@/components/PortfolioDownload";

const PortfolioView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch the portfolio data from an API
    // For now, we're loading from localStorage for demo purposes
    const storedData = localStorage.getItem("portfolio_data");
    if (storedData) {
      setPortfolioData(JSON.parse(storedData));
    }
    setLoading(false);
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <p>Loading portfolio...</p>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Portfolio Not Found</h2>
        <p className="mb-4">The portfolio you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/")}>Go Back Home</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6 print:hidden">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex gap-2">
          <PortfolioDownload portfolioData={portfolioData} />
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6 print:border-none print:shadow-none">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{portfolioData.personal.name || "Portfolio"}</h1>
          <div className="text-gray-600">
            {portfolioData.personal.email && (
              <p>{portfolioData.personal.email}</p>
            )}
            {portfolioData.personal.phone && (
              <p>{portfolioData.personal.phone}</p>
            )}
            {portfolioData.personal.website && (
              <p>{portfolioData.personal.website}</p>
            )}
            {portfolioData.personal.location && (
              <p>{portfolioData.personal.location}</p>
            )}
          </div>
        </header>

        {portfolioData.education && portfolioData.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Education</h2>
            <div className="space-y-4">
              {portfolioData.education.map((edu: any, index: number) => (
                <div key={index} className="space-y-1">
                  <h3 className="text-lg font-semibold">{edu.institution}</h3>
                  <p className="text-gray-700">{edu.degree}</p>
                  <p className="text-gray-600">{edu.startDate} - {edu.endDate}</p>
                  {edu.description && (
                    <p className="text-gray-600">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {portfolioData.experience && portfolioData.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Work Experience</h2>
            <div className="space-y-6">
              {portfolioData.experience.map((exp: any, index: number) => (
                <div key={index} className="space-y-1">
                  <h3 className="text-lg font-semibold">{exp.title}</h3>
                  <p className="text-gray-700">{exp.company}</p>
                  <p className="text-gray-600">{exp.startDate} - {exp.endDate}</p>
                  {exp.description && (
                    <p className="text-gray-600">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {portfolioData.projects && portfolioData.projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Projects</h2>
            <div className="space-y-6">
              {portfolioData.projects.map((project: any, index: number) => (
                <div key={index} className="space-y-1">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Project Link
                    </a>
                  )}
                  {project.description && (
                    <p className="text-gray-600">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {portfolioData.skills && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Skills</h2>
            
            {portfolioData.skills.technicalSkills && portfolioData.skills.technicalSkills.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {portfolioData.skills.technicalSkills.map((skill: string, index: number) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {portfolioData.skills.softSkills && portfolioData.skills.softSkills.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {portfolioData.skills.softSkills.map((skill: string, index: number) => (
                    <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {portfolioData.certifications && portfolioData.certifications.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Certifications</h2>
            <div className="space-y-4">
              {portfolioData.certifications.map((cert: any, index: number) => (
                <div key={index} className="space-y-1">
                  <h3 className="text-lg font-semibold">{cert.name}</h3>
                  <p className="text-gray-700">{cert.issuer}</p>
                  <p className="text-gray-600">{cert.date}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default PortfolioView;
