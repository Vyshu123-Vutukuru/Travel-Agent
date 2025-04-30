
import React, { useState } from "react";
import { TravelHeader } from "@/components/TravelHeader";
import { TravelFooter } from "@/components/TravelFooter";
import { TravelPlanForm } from "@/components/TravelPlanForm";
import { TravelPlanDisplay } from "@/components/TravelPlanDisplay";
import { generateTravelPlan } from "@/services/geminiService";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [travelPlan, setTravelPlan] = useState<string | null>(null);
  const [travelInfo, setTravelInfo] = useState<any>(null);
  const { toast } = useToast();

  const handleSubmit = async (formData: {
    source: string;
    destination: string;
    startDate: string;
    endDate: string;
    budget: string;
    travelers: string;
    interests: string[];
  }) => {
    if (formData.interests.length === 0) {
      toast({
        title: "Please select at least one interest",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setTravelInfo(formData);

    try {
      const plan = await generateTravelPlan(formData);
      setTravelPlan(plan);
      
      // Scroll to results
      setTimeout(() => {
        const resultsElement = document.getElementById("results");
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } catch (error) {
      console.error("Error generating travel plan:", error);
      toast({
        title: "Error generating travel plan",
        description: "Please try again later or check your API key.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <TravelHeader />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-travel-slate mb-4">Journey Gemini Compass</h1>
            <p className="text-xl text-gray-600">
              Your AI-powered travel planning assistant
            </p>
          </div>
          
          <div className="mb-16">
            <TravelPlanForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
          
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-travel-blue"></div>
                <p className="mt-4 text-travel-slate font-medium">Crafting your perfect travel plan...</p>
              </div>
            </div>
          )}
          
          {travelPlan && travelInfo && !isLoading && (
            <div id="results">
              <h2 className="text-2xl font-bold text-travel-slate mb-6">Your Travel Plan</h2>
              <TravelPlanDisplay 
                planContent={travelPlan} 
                travelInfo={travelInfo}
              />
            </div>
          )}
        </div>
      </main>
      
      <TravelFooter />
    </div>
  );
};

export default Index;
