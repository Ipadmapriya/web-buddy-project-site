import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, ArrowLeft, ArrowRight } from "lucide-react";
import PortfolioDownload from "./PortfolioDownload";

const PortfolioPreview = ({ portfolioData, onStartOver, onSubmitFeedback }) => {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded-lg border">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold">Portfolio Preview</h2>
          <div className="flex flex-col md:flex-row gap-2">
            <PortfolioDownload portfolioData={portfolioData} />
            <Button variant="outline" onClick={onStartOver}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Start Over
            </Button>
          </div>
        </div>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Personal Information</h2>
          <div className="space-y-2">
            <p><strong>Name:</strong> {portfolioData.personal?.name || 'N/A'}</p>
            <p><strong>Email:</strong> {portfolioData.personal?.email || 'N/A'}</p>
            <p><strong>Phone:</strong> {portfolioData.personal?.phone || 'N/A'}</p>
            <p><strong>Location:</strong> {portfolioData.personal?.location || 'N/A'}</p>
            <p><strong>LinkedIn:</strong> {portfolioData.personal?.linkedin || 'N/A'}</p>
            <p><strong>Website:</strong> {portfolioData.personal?.website || 'N/A'}</p>
          </div>
        </section>

        {portfolioData.education && portfolioData.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Education</h2>
            {portfolioData.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold">{edu.institution}</h3>
                <p className="text-gray-600">{edu.degree}</p>
                <p className="text-gray-500">{edu.startDate} - {edu.endDate}</p>
                {edu.description && <p className="mt-2">{edu.description}</p>}
              </div>
            ))}
          </section>
        )}

        {portfolioData.internships && portfolioData.internships.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Internships</h2>
            {portfolioData.internships.map((internship, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold">{internship.company}</h3>
                <p className="text-gray-600">{internship.title}</p>
                <p className="text-gray-500">{internship.startDate} - {internship.endDate}</p>
                {internship.description && <p className="mt-2">{internship.description}</p>}
              </div>
            ))}
          </section>
        )}

        {portfolioData.experience && portfolioData.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Work Experience</h2>
            {portfolioData.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold">{exp.company}</h3>
                <p className="text-gray-600">{exp.title}</p>
                <p className="text-gray-500">{exp.startDate} - {exp.endDate}</p>
                {exp.description && <p className="mt-2">{exp.description}</p>}
              </div>
            ))}
          </section>
        )}

        {portfolioData.projects && portfolioData.projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Projects</h2>
            {portfolioData.projects.map((project, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold">{project.name}</h3>
                <p className="text-gray-600">{project.description}</p>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    View Project
                  </a>
                )}
              </div>
            ))}
          </section>
        )}

        {portfolioData.skills && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold">Technical Skills</h3>
                <ul className="list-disc list-inside">
                  {portfolioData.skills.technicalSkills && portfolioData.skills.technicalSkills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Soft Skills</h3>
                <ul className="list-disc list-inside">
                  {portfolioData.skills.softSkills && portfolioData.skills.softSkills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Interests</h3>
              <ul className="list-disc list-inside">
                {portfolioData.skills.interests && portfolioData.skills.interests.map((interest, index) => (
                  <li key={index}>{interest}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Hobbies</h3>
              <ul className="list-disc list-inside">
                {portfolioData.skills.hobbies && portfolioData.skills.hobbies.map((hobby, index) => (
                  <li key={index}>{hobby}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {portfolioData.achievements && portfolioData.achievements.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Achievements</h2>
            {portfolioData.achievements.map((achievement, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </section>
        )}

        {portfolioData.certifications && portfolioData.certifications.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Certifications</h2>
            {portfolioData.certifications.map((certification, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold">{certification.name}</h3>
                <p className="text-gray-600">{certification.issuer}</p>
                <p className="text-gray-500">{certification.date}</p>
                {certification.description && <p className="mt-2">{certification.description}</p>}
              </div>
            ))}
          </section>
        )}

        {portfolioData.languages && portfolioData.languages.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Languages</h2>
            {portfolioData.languages.map((language, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold">{language.name}</h3>
                <p className="text-gray-600">Proficiency: {language.proficiency}</p>
              </div>
            ))}
          </section>
        )}
      </div>
      
      <Button onClick={onSubmitFeedback}>
        Submit Feedback
      </Button>
    </div>
  );
};

export default PortfolioPreview;
