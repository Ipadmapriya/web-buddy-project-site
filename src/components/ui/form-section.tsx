
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const FormSection = ({ title, children, className, icon }: FormSectionProps) => {
  return (
    <Card className={cn(
      "form-inner-box",
      "overflow-hidden backdrop-blur-sm",
      className
    )}>
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-violet-600 p-6 relative">
        <div className="absolute inset-0 bg-[linear-gradient(40deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] opacity-20" />
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className={cn(
        "p-6 relative",
        "bg-gradient-to-b from-white via-white to-indigo-50/30",
      )}>
        {children}
      </CardContent>
    </Card>
  );
};

export default FormSection;
