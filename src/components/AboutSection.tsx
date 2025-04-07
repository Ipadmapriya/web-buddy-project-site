
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      title: "Innovative Solutions",
      description: "We develop cutting-edge solutions using the latest technologies."
    },
    {
      title: "User-Centered Design",
      description: "Our approach puts users first, ensuring intuitive and accessible experiences."
    },
    {
      title: "Agile Development",
      description: "We adapt quickly to changes and deliver value in short, iterative cycles."
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">About Our Project</h2>
            <p className="text-muted-foreground mb-6">
              We are passionate about creating solutions that make a difference. Our team combines technical expertise with creative thinking to build products that stand out.
            </p>
            <p className="text-muted-foreground mb-6">
              With years of experience in the industry, we've developed a deep understanding of what makes a project successful. We focus on quality, performance, and user satisfaction.
            </p>
            
            <div className="space-y-4 mt-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="text-primary mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-blue-200 rounded-lg opacity-50" />
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-indigo-200 rounded-lg opacity-50" />
            
            <Card className="relative w-full overflow-hidden border-2 border-border">
              <CardContent className="p-0">
                <img 
                  src="/placeholder.svg" 
                  alt="About our team"
                  className="w-full h-full object-cover aspect-[4/3]"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
