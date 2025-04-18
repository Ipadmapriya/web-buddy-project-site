
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart as PieChartIcon, Users, MessageSquare, ShieldCheck } from "lucide-react";
import UserManagement from "@/components/admin/UserManagement";
import FeedbackReviews from "@/components/admin/FeedbackReviews";
import AdminManagement from "@/components/admin/AdminManagement";

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");

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

  // Calculate user counts
  const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
  const adminCount = allUsers.filter((u: any) => u.isAdmin).length;
  const regularUserCount = allUsers.filter((u: any) => !u.isAdmin).length;

  // Handle navigation to portfolio generator
  const handleViewPortfolioGenerator = () => {
    // We need to temporarily set the user as non-admin to view the portfolio generator
    const currentUser = { ...user };
    
    // Store admin status to restore later
    localStorage.setItem("adminReturning", "true");
    
    // Navigate to the main page
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto py-8 px-4 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Manage users and monitor platform activity</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              variant="outline" 
              onClick={handleViewPortfolioGenerator}
              className="border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
            >
              View Portfolio Generator
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-100 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">Regular Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-500 bg-blue-100 rounded-lg p-1.5" />
                <div className="text-3xl font-bold ml-3 text-blue-900" id="userCount">
                  {regularUserCount}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-white to-purple-50 border-purple-100 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Admin Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <ShieldCheck className="h-8 w-8 text-purple-500 bg-purple-100 rounded-lg p-1.5" />
                <div className="text-3xl font-bold ml-3 text-purple-900" id="adminCount">
                  {adminCount}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-white to-green-50 border-green-100 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Feedback Received</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <MessageSquare className="h-8 w-8 text-green-500 bg-green-100 rounded-lg p-1.5" />
                <div className="text-3xl font-bold ml-3 text-green-900" id="feedbackCount">
                  {JSON.parse(localStorage.getItem("feedback") || "[]").length}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-white to-amber-50 border-amber-100 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-800">Average Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <PieChartIcon className="h-8 w-8 text-amber-500 bg-amber-100 rounded-lg p-1.5" />
                <div className="text-3xl font-bold ml-3 text-amber-900" id="avgRating">
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
        
        <Tabs 
          defaultValue="users" 
          className="space-y-6" 
          value={activeTab} 
          onValueChange={setActiveTab}
        >
          <TabsList className="bg-white/70 backdrop-blur-sm border border-blue-100 p-1">
            <TabsTrigger 
              value="users"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
            >
              User Management
            </TabsTrigger>
            <TabsTrigger 
              value="admins"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
            >
              Admin Management
            </TabsTrigger>
            <TabsTrigger 
              value="feedback"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
            >
              Feedback & Ratings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <Card className="border-blue-100 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-900">User Management</CardTitle>
                <CardDescription className="text-gray-600">View and manage regular user accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <UserManagement showAdmins={false} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="admins">
            <Card className="border-blue-100 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-900">Admin Management</CardTitle>
                <CardDescription className="text-gray-600">View and manage administrator accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <AdminManagement />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="feedback">
            <Card className="border-blue-100 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-900">Feedback & Ratings</CardTitle>
                <CardDescription className="text-gray-600">View user feedback and ratings</CardDescription>
              </CardHeader>
              <CardContent>
                <FeedbackReviews />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
