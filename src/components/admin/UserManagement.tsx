
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Search, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type User = {
  email: string;
  name?: string;
  username?: string;
  userType?: string;
  isAdmin: boolean;
  created_at?: string;
};

interface UserManagementProps {
  showAdmins?: boolean;
}

const UserManagement = ({ showAdmins = false }: UserManagementProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      try {
        // Load users from localStorage
        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
        
        // Try to fetch from Supabase as well
        let supabaseUsers: any[] = [];
        try {
          console.log("Attempting to fetch users from Supabase...");
          const { data, error } = await supabase
            .from('user_profiles' as any)
            .select('*' as any)
            .then(response => {
              if (response.error) {
                throw response.error;
              }
              return response;
            });
          
          if (error) throw error;
          supabaseUsers = data || [];
          console.log("Supabase users:", supabaseUsers);
        } catch (error) {
          console.error("Error fetching from Supabase:", error);
          console.log("Falling back to localStorage only...");
        }
        
        // Combine both sources, using email as key to avoid duplicates
        const usersMap = new Map();
        
        // Add localStorage users first
        storedUsers.forEach((user: any) => {
          if (showAdmins ? user.isAdmin : !user.isAdmin) { // Filter based on showAdmins prop
            const { password, ...safeUser } = user;
            usersMap.set(user.email, safeUser);
          }
        });
        
        // Add or update with Supabase users
        supabaseUsers.forEach((user) => {
          if (showAdmins ? user.is_admin : !user.is_admin) { // Filter based on showAdmins prop
            const mappedUser = {
              email: user.email,
              name: user.name,
              username: user.username,
              isAdmin: user.is_admin,
              created_at: user.created_at
            };
            
            // Only add/update if matches the admin filter
            usersMap.set(user.email, {
              ...usersMap.get(user.email),
              ...mappedUser
            });
          }
        });
        
        const combinedUsers = Array.from(usersMap.values());
        setUsers(combinedUsers);
      } catch (error) {
        console.error("Error loading users:", error);
        toast({
          variant: "destructive",
          title: "Error loading users",
          description: "There was a problem loading user data."
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUsers();
  }, [showAdmins, toast]);

  useEffect(() => {
    // Filter users based on search term
    const filtered = users.filter(
      (user) =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredUsers(filtered);
  }, [users, searchTerm]);

  const handleDeleteUser = async (email: string) => {
    setIsDeleting(email);
    try {
      // Delete user from localStorage
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = storedUsers.filter((user: any) => user.email !== email);
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      // Try to delete from Supabase as well
      try {
        console.log("Attempting to delete user from Supabase...");
        await supabase
          .from('user_profiles' as any)
          .delete()
          .eq('email', email)
          .then(response => {
            if (response.error) {
              throw response.error;
            }
            console.log("User deleted from Supabase");
          });
      } catch (error) {
        console.error("Error deleting user from Supabase:", error);
        console.log("Only local storage was updated");
      }
      
      // Update state
      const updatedSafeUsers = users.filter((user) => user.email !== email);
      setUsers(updatedSafeUsers);

      toast({
        title: "User deleted",
        description: `User with email ${email} has been deleted.`,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        variant: "destructive",
        title: "Error deleting user",
        description: "There was a problem deleting the user."
      });
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={`Search ${showAdmins ? 'admin' : 'regular'} users...`}
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Username</TableHead>
              {!showAdmins && <TableHead>User Type</TableHead>}
              <TableHead>Role</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={showAdmins ? 5 : 6} className="h-24 text-center">
                  <div className="flex justify-center items-center">
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Loading users...
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.email}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.name || "-"}</TableCell>
                  <TableCell>{user.username || "-"}</TableCell>
                  {!showAdmins && <TableCell>{user.userType || "-"}</TableCell>}
                  <TableCell>{user.isAdmin ? "Admin" : "User"}</TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          disabled={user.email === "admin@example.com" || isDeleting === user.email}
                        >
                          {isDeleting === user.email ? (
                            <Loader2 className="h-4 w-4 animate-spin text-destructive" />
                          ) : (
                            <Trash2 className="h-4 w-4 text-destructive" />
                          )}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the
                            user account and all associated data.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteUser(user.email)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={showAdmins ? 5 : 6} className="h-24 text-center">
                  No {showAdmins ? 'admin' : 'regular'} users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserManagement;
