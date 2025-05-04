
import React, { useState, useEffect } from "react";
import { TravelHeader } from "@/components/TravelHeader";
import { TravelFooter } from "@/components/TravelFooter";
import { TravelPlanForm } from "@/components/TravelPlanForm";
import { TravelPlanDisplay } from "@/components/TravelPlanDisplay";
import { generateTravelPlan, hasGeminiApiKey } from "@/services/geminiService";
import { getFlightData, FlightOption, hasSerpApiKey } from "@/services/serpApiService";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Key, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [travelPlan, setTravelPlan] = useState<string | null>(null);
  const [travelInfo, setTravelInfo] = useState<any>(null);
  const [flightInfo, setFlightInfo] = useState<FlightOption | undefined>(undefined);
  const [hasGeminiKey, setHasGeminiKey] = useState(false);
  const [hasSerpKey, setHasSerpKey] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if API keys exist on component mount and when localStorage changes
    const checkApiKeys = () => {
      setHasGeminiKey(hasGeminiApiKey());
      setHasSerpKey(hasSerpApiKey());
    };
    
    checkApiKeys();
    
    // Listen for storage changes (in case API key is added in another tab)
    window.addEventListener('storage', checkApiKeys);
    
    return () => {
      window.removeEventListener('storage', checkApiKeys);
    };
  }, []);

  const handleSubmit = async (formData: {
    source: string;
    destination: string;
    startDate: string;
    endDate: string;
    budget: string;
    travelers: string;
    interests: string[];
    includeTransportation: boolean;
  }) => {
    if (!hasGeminiKey) {
      toast({
        title: "Gemini API Key Required",
        description: "Please add your Gemini API key before generating a travel plan",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.includeTransportation && !hasSerpKey) {
      toast({
        title: "SerpAPI Key Recommended",
        description: "For best flight information, consider adding your SerpAPI key",
        variant: "default",
      });
    }
    
    if (formData.interests.length === 0) {
      toast({
        title: "Please select at least one interest",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setTravelInfo(formData);
    setFlightInfo(undefined);

    try {
      // Fetch flight information if requested
      if (formData.includeTransportation) {
        try {
          const flightData = await getFlightData(formData.source, formData.destination);
          if (flightData && flightData.best_flights && flightData.best_flights.length > 0) {
            setFlightInfo(flightData.best_flights[0]);
          }
        } catch (flightError) {
          console.error("Error fetching flight data:", flightError);
          // We don't want to fail the whole operation if just the flight data fails
          toast({
            title: "Flight information unavailable",
            description: "Could not retrieve flight details, but continuing with travel plan generation.",
            variant: "destructive",
          });
        }
      }
      
      // Generate travel plan
      const plan = await generateTravelPlan(formData);
      setTravelPlan(plan);
      
      // Scroll to results
      setTimeout(() => {
        const resultsElement = document.getElementById("results");
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } catch (error: any) {
      console.error("Error generating travel plan:", error);
      toast({
        title: "Error generating travel plan",
        description: error.message || "Please try again later or check your API key.",
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
          
          {!hasGeminiKey && (
            <Alert className="mb-6 bg-amber-50 border-amber-200">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <AlertDescription className="flex items-center justify-between">
                <span>Please add your Gemini API key before generating a travel plan.</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-4 border-amber-200 text-amber-700 hover:bg-amber-100"
                  onClick={() => document.querySelector<HTMLButtonElement>('[aria-label="Add Gemini API Key"]')?.click()}
                >
                  <Key className="h-4 w-4 mr-2" />
                  Add API Key
                </Button>
              </AlertDescription>
            </Alert>
          )}
          
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
                flightInfo={flightInfo}
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
