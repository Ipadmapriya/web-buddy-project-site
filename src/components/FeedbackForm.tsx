import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { v4 as uuidv4 } from "@/lib/uuid";
import FormSection from "@/components/ui/form-section";
import { supabase } from "@/integrations/supabase/client";

interface FeedbackFormProps {
  onSubmit: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [suggestion, setSuggestion] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please provide a rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const newFeedback = {
        id: uuidv4(),
        user_id: user?.email,
        rating,
        suggestion,
        created_at: new Date().toISOString()
      };
      
      try {
        console.log("Attempting to store feedback in Supabase...");
        await supabase
          .from('feedback')
          .insert({
            user_id: user?.email || 'anonymous',
            rating: rating,
            suggestion: suggestion,
            created_at: new Date().toISOString()
          })
          .then(response => {
            if (response.error) {
              throw response.error;
            }
            console.log("Feedback stored successfully in Supabase");
          });
      } catch (supabaseError) {
        console.error("Supabase storage error:", supabaseError);
        console.log("Falling back to localStorage...");
        
        // Store in localStorage as backup
        const existingFeedback = JSON.parse(localStorage.getItem("feedback") || "[]");
        existingFeedback.push(newFeedback);
        localStorage.setItem("feedback", JSON.stringify(existingFeedback));
      }

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormSection title="Share Your Feedback" icon={<MessageSquare className="w-5 h-5 text-white" />} >
      <div className="form-inner-box space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Rate Your Experience</h3>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((index) => (
              <button
                key={index}
                type="button"
                className="focus:outline-none transform transition-transform hover:scale-110"
                onMouseEnter={() => setHoveredRating(index)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(index)}
              >
                <Star
                  className={`h-8 w-8 ${
                    index <= (hoveredRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  } transition-colors duration-200`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-gray-700 font-medium">
            Do you have any suggestions for improvement?
          </label>
          <Textarea
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            placeholder="Share your thoughts..."
            className="min-h-[100px] border-blue-100 focus:border-blue-300 bg-white/50 transition-all duration-300"
          />
        </div>

        <Button 
          onClick={handleSubmit} 
          className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit Feedback"}
        </Button>
      </div>
    </FormSection>
  );
};

export default FeedbackForm;
