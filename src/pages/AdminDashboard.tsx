
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart } from "recharts";
import { PieChart as PieChartIcon, Users, MessageSquare } from "lucide-react";
import UserManagement from "@/components/admin/UserManagement";
import FeedbackReviews from "@/components/admin/FeedbackReviews";

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    // Redirect non-admin users
    if (!user) {
      navigate("/auth");
      return;
    }

    if (!user.isAdmin) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user || !user.isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users and view feedback</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="outline" onClick={() => navigate("/")}>
            View Portfolio Generator
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold" id="userCount">
                {JSON.parse(localStorage.getItem("users") || "[]").length}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Feedback Received</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold" id="feedbackCount">
                {JSON.parse(localStorage.getItem("feedback") || "[]").length}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <PieChartIcon className="h-5 w-5 text-muted-foreground mr-2" />
              <div className="text-2xl font-bold" id="avgRating">
                {(() => {
                  const feedback = JSON.parse(localStorage.getItem("feedback") || "[]");
                  if (feedback.length === 0) return "N/A";
                  const avg = feedback.reduce((sum: number, item: any) => sum + item.rating, 0) / feedback.length;
                  return avg.toFixed(1);
                })()}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="feedback">Feedback & Ratings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage user accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <UserManagement />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Feedback & Ratings</CardTitle>
              <CardDescription>View user feedback and ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <FeedbackReviews />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
