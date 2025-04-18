
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ShieldCheck, MessageSquare, Star } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
}

const StatsCard = ({ title, value, icon, description }: StatsCardProps) => (
  <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-100 hover:shadow-lg transition-all duration-300">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-blue-800">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center">
        {icon}
        <div className="text-3xl font-bold ml-3 text-blue-900">{value}</div>
      </div>
      {description && (
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      )}
    </CardContent>
  </Card>
);

export const AdminDashboardStats = () => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const feedback = JSON.parse(localStorage.getItem("feedback") || "[]");
  const adminCount = users.filter((u: any) => u.isAdmin).length;
  const regularUserCount = users.filter((u: any) => !u.isAdmin).length;
  
  const avgRating = (() => {
    if (feedback.length === 0) return "N/A";
    const avg = feedback.reduce((sum: number, item: any) => sum + item.rating, 0) / feedback.length;
    return avg.toFixed(1);
  })();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatsCard
        title="Regular Users"
        value={regularUserCount}
        icon={<Users className="h-8 w-8 text-blue-500 bg-blue-100 rounded-lg p-1.5" />}
      />
      <StatsCard
        title="Admin Users"
        value={adminCount}
        icon={<ShieldCheck className="h-8 w-8 text-purple-500 bg-purple-100 rounded-lg p-1.5" />}
      />
      <StatsCard
        title="Feedback Received"
        value={feedback.length}
        icon={<MessageSquare className="h-8 w-8 text-green-500 bg-green-100 rounded-lg p-1.5" />}
      />
      <StatsCard
        title="Average Rating"
        value={avgRating}
        icon={<Star className="h-8 w-8 text-amber-500 bg-amber-100 rounded-lg p-1.5" />}
      />
    </div>
  );
};
