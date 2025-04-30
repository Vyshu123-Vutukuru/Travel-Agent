
import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TravelPlanFormProps {
  onSubmit: (formData: {
    source: string;
    destination: string;
    startDate: string;
    endDate: string;
    budget: string;
    travelers: string;
    interests: string[];
  }) => void;
  isLoading: boolean;
}

const interestOptions = [
  { id: "adventure", label: "Adventure" },
  { id: "culture", label: "Culture & History" },
  { id: "food", label: "Food & Cuisine" },
  { id: "nature", label: "Nature & Outdoors" },
  { id: "relaxation", label: "Relaxation" },
  { id: "shopping", label: "Shopping" },
  { id: "nightlife", label: "Nightlife" },
  { id: "family", label: "Family Activities" }
];

export function TravelPlanForm({ onSubmit, isLoading }: TravelPlanFormProps) {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [budget, setBudget] = useState("");
  const [travelers, setTravelers] = useState("");
  const [interests, setInterests] = useState<string[]>([]);

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
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-travel-slate mb-6">Plan Your Journey</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="source">Source Location</Label>
          <Input
            id="source"
            placeholder="Where are you starting from?"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="destination">Destination</Label>
          <Input
            id="destination"
            placeholder="Where do you want to go?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="startDate"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="endDate"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
                disabled={(date) => 
                  startDate ? date < startDate : false
                }
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="budget">Budget (USD)</Label>
          <Input
            id="budget"
            placeholder="What's your budget?"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="travelers">Number of Travelers</Label>
          <Input
            id="travelers"
            placeholder="How many people are traveling?"
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <Label>Interests (select at least one)</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {interestOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id}
                checked={interests.includes(option.id)}
                onCheckedChange={(checked) =>
                  handleInterestChange(option.id, checked === true)
                }
              />
              <Label
                htmlFor={option.id}
                className="text-sm font-normal cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
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
