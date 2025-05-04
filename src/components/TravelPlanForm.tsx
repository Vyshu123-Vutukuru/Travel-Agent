
import React, { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { LocationInput } from "./travel-form/LocationInput";
import { DateSelector } from "./travel-form/DateSelector";
import { TravelDetails } from "./travel-form/TravelDetails";
import { InterestSelector } from "./travel-form/InterestSelector";
import { TransportationOption } from "./travel-form/TransportationOption";

interface TravelPlanFormProps {
  onSubmit: (formData: {
    source: string;
    destination: string;
    startDate: string;
    endDate: string;
    budget: string;
    travelers: string;
    interests: string[];
    includeTransportation: boolean;
  }) => void;
  isLoading: boolean;
}

export function TravelPlanForm({ onSubmit, isLoading }: TravelPlanFormProps) {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [budget, setBudget] = useState("");
  const [travelers, setTravelers] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [includeTransportation, setIncludeTransportation] = useState(false);

  const handleInterestChange = (id: string, checked: boolean) => {
    setInterests(
      checked
        ? [...interests, id]
        : interests.filter((item) => item !== id)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({
      source,
      destination,
      startDate: startDate ? format(startDate, 'yyyy-MM-dd') : '',
      endDate: endDate ? format(endDate, 'yyyy-MM-dd') : '',
      budget,
      travelers,
      interests,
      includeTransportation,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-travel-slate mb-6">Plan Your Journey</h2>
      
      <LocationInput 
        source={source}
        destination={destination}
        onSourceChange={setSource}
        onDestinationChange={setDestination}
      />
      
      <DateSelector
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />
      
      <TravelDetails
        budget={budget}
        travelers={travelers}
        onBudgetChange={setBudget}
        onTravelersChange={setTravelers}
      />
      
      <InterestSelector
        selectedInterests={interests}
        onInterestChange={handleInterestChange}
      />
      
      <TransportationOption
        includeTransportation={includeTransportation}
        onIncludeTransportationChange={setIncludeTransportation}
      />
      
      <Button
        type="submit"
        className="w-full bg-travel-blue hover:bg-blue-700 text-white"
        disabled={isLoading}
      >
        {isLoading ? "Generating Travel Plan..." : "Generate Travel Plan"}
      </Button>
    </form>
  );
}
