
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface FeedbackFormProps {
  onSubmit: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [suggestion, setSuggestion] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please provide a rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Using a type-safe approach for inserting data
      const { error } = await supabase
        .from("user_feedback")
        .insert({
          rating,
          suggestion,
          user_id: user?.id
        });

      if (error) throw error;

      toast({
        title: "Thank you for your feedback!",
        description: "Your feedback has been submitted successfully.",
      });

      onSubmit();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4">Rate Your Experience</h3>
        <div className="flex justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((index) => (
            <button
              key={index}
              type="button"
              className="focus:outline-none"
              onMouseEnter={() => setHoveredRating(index)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => setRating(index)}
            >
              <Star
                className={`h-8 w-8 ${
                  index <= (hoveredRating || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Do you have any suggestions for improvement?
        </label>
        <Textarea
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          placeholder="Share your thoughts..."
          className="min-h-[100px]"
        />
      </div>

      <Button onClick={handleSubmit} className="w-full">
        Submit Feedback
      </Button>
    </div>
  );
};

export default FeedbackForm;
