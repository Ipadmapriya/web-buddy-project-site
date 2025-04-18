
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
    <div className="space-y-6">
      <Card className={cn(
        "form-inner-box",
        "p-4 rounded-lg bg-white/40 border border-blue-100 transition-all duration-300 hover:bg-white/60 shadow-[0_2px_8px_rgb(0,0,0,0.04)]",
        className
      )}>
        <CardHeader className="p-4">
          <CardTitle className="text-xl font-bold text-blue-900 flex items-center gap-2">
            {icon && <span className="text-white bg-blue-600 p-1.5 rounded-md">{icon}</span>}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-6">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default FormSection;
