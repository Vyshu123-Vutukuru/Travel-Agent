
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TravelDetailsProps {
  budget: string;
  travelers: string;
  onBudgetChange: (value: string) => void;
  onTravelersChange: (value: string) => void;
}

export function TravelDetails({
  budget,
  travelers,
  onBudgetChange,
  onTravelersChange
}: TravelDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="budget">Budget (USD)</Label>
        <Input
          id="budget"
          placeholder="What's your budget?"
          value={budget}
          onChange={(e) => onBudgetChange(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="travelers">Number of Travelers</Label>
        <Input
          id="travelers"
          placeholder="How many people are traveling?"
          value={travelers}
          onChange={(e) => onTravelersChange(e.target.value)}
          required
        />
      </div>
    </div>
  );
}
