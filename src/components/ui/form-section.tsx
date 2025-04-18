
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
      "overflow-hidden",
      className
    )}>
      <CardHeader className="bg-indigo-600 p-6 relative">
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {children}
      </CardContent>
    </Card>
  );
};

export default FormSection;
