
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group">
      <div className="relative overflow-hidden h-48">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold">{project.title}</h3>
          <span className="p-2 rounded-full bg-secondary group-hover:bg-primary/10 transition-colors">
            <ArrowUpRight size={16} className="group-hover:text-primary transition-colors" />
          </span>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground mb-4">{project.description}</p>
      </CardContent>
      
      <CardFooter>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
