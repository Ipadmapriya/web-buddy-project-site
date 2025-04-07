
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 -z-10" />
      
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 rounded-full bg-indigo-100/50 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 rounded-full bg-blue-100/50 blur-3xl -z-10"></div>
      
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Bringing Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Ideas</span> to Life
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            We create innovative solutions that solve real-world problems with cutting-edge technology and thoughtful design.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="gap-2">
              Explore Projects <ArrowRight size={16} />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
