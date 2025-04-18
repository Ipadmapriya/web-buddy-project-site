import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Search, Star } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { supabase } from "@/integrations/supabase/client";

type Feedback = {
  id: string;
  user_id: string;
  rating: number;
  suggestion: string;
  created_at: string;
  user_email?: string;
};

const FeedbackReviews = () => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFeedback, setFilteredFeedback] = useState<Feedback[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchFeedback = async () => {
      setIsLoading(true);
      try {
        let supabaseFeedback: Feedback[] = [];
        try {
          console.log("Attempting to fetch feedback from Supabase...");
          const { data, error } = await supabase
            .from('feedback')
            .select('*');
          
          if (error) throw error;
          supabaseFeedback = data || [];
          console.log("Supabase feedback:", supabaseFeedback);
        } catch (error) {
          console.error("Error fetching from Supabase:", error);
          console.log("Falling back to localStorage only...");
        }
        
        const localFeedback = JSON.parse(localStorage.getItem("feedback") || "[]");
        
        const feedbackMap = new Map();
        
        supabaseFeedback.forEach((item) => {
          feedbackMap.set(item.id, {
            ...item,
            user_email: item.user_id
          });
        });
        
        localFeedback.forEach((item: Feedback) => {
          if (!feedbackMap.has(item.id)) {
            feedbackMap.set(item.id, {
              ...item,
              user_email: item.user_id
            });
          }
        });
        
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        
        const combinedFeedback = Array.from(feedbackMap.values()).map((item: any) => {
          const user = users.find((u: any) => u.email === item.user_id);
          return {
            ...item,
            user_email: user ? user.email : item.user_id || "Unknown User",
          };
        });
        
        setFeedback(combinedFeedback);
      } catch (error) {
        console.error("Error loading feedback:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFeedback();
  }, []);

  useEffect(() => {
    const filtered = feedback.filter(
      (item) =>
        (item.user_email && item.user_email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.suggestion && item.suggestion.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredFeedback(filtered);
    setCurrentPage(1);
  }, [feedback, searchTerm]);

  function renderStars(rating: number) {
    return (
      <div className="flex">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={`h-4 w-4 ${
              index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  const totalPages = Math.ceil(filteredFeedback.length / itemsPerPage);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search feedback..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Total Feedback</div>
          <div className="text-2xl font-bold">{feedback.length}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Average Rating</div>
          <div className="text-2xl font-bold">
            {feedback.length > 0
              ? (
                  feedback.reduce((sum, item) => sum + item.rating, 0) / feedback.length
                ).toFixed(1)
              : "N/A"}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">5-Star Ratings</div>
          <div className="text-2xl font-bold">
            {feedback.filter((item) => item.rating === 5).length}
          </div>
        </Card>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Feedback</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFeedback.length > 0 ? (
              filteredFeedback.slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              ).map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.user_email}</TableCell>
                  <TableCell>{renderStars(item.rating)}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {item.suggestion || "No feedback provided"}
                  </TableCell>
                  <TableCell>{formatDate(item.created_at)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No feedback found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default FeedbackReviews;
