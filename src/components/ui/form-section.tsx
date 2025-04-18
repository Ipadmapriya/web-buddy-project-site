
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
    <Card className="w-full overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-violet-600 p-6">
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className={cn(
        "p-6 bg-gradient-to-b from-white to-blue-50/30",
        className
      )}>
        {children}
      </CardContent>
    </Card>
  );
};

export default FormSection;
