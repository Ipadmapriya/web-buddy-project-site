
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
      "w-full overflow-hidden backdrop-blur-sm",
      "border-2 border-indigo-200/50",
      "shadow-[0_8px_30px_rgb(0,0,0,0.08)]",
      "transition-all duration-300",
      "hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
      "hover:border-indigo-300/50",
      "relative",
      "before:absolute before:inset-0",
      "before:bg-gradient-to-r before:from-violet-500/10 before:via-transparent before:to-indigo-500/10",
      "before:rounded-xl before:-z-10",
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
        "after:absolute after:inset-0",
        "after:bg-gradient-to-b after:from-transparent after:to-white/80",
        "after:pointer-events-none after:-z-10"
      )}>
        {children}
      </CardContent>
    </Card>
  );
};

export default FormSection;
