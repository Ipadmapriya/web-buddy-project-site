
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ProjectCard";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  // Sample project data
  const projects = [
    {
      id: 1,
      title: "Project One",
      description: "A cutting-edge solution for modern problems",
      image: "/placeholder.svg",
      tags: ["Web", "Design", "UI/UX"]
    },
    {
      id: 2,
      title: "Project Two",
      description: "Innovative platform with seamless integration",
      image: "/placeholder.svg",
      tags: ["Mobile", "Development", "API"]
    },
    {
      id: 3,
      title: "Project Three",
      description: "Revolutionary concept built with the latest technology",
      image: "/placeholder.svg",
      tags: ["IoT", "Cloud", "Analytics"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-slate-50">
      <Navbar />
      
      <main>
        <HeroSection />
        
        {/* Projects Section */}
        <section id="projects" className="container py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our portfolio of innovative solutions designed to meet diverse needs and challenges.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg">View All Projects</Button>
          </div>
        </section>
        
        <AboutSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
