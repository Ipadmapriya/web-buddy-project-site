
import React, { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Search, Trash2, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import UserManagement from "@/components/admin/UserManagement";

const AdminManagement = () => {
  // Reuse the UserManagement component with showAdmins=true
  return <UserManagement showAdmins={true} />;
};

export default AdminManagement;
