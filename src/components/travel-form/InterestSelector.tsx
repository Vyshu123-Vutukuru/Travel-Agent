
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export interface Interest {
  id: string;
  label: string;
}

export const interestOptions: Interest[] = [
  { id: "adventure", label: "Adventure" },
  { id: "culture", label: "Culture & History" },
  { id: "food", label: "Food & Cuisine" },
  { id: "nature", label: "Nature & Outdoors" },
  { id: "relaxation", label: "Relaxation" },
  { id: "shopping", label: "Shopping" },
  { id: "nightlife", label: "Nightlife" },
  { id: "family", label: "Family Activities" }
];

interface InterestSelectorProps {
  selectedInterests: string[];
  onInterestChange: (id: string, checked: boolean) => void;
}

export function InterestSelector({ selectedInterests, onInterestChange }: InterestSelectorProps) {
  return (
    <div className="space-y-4">
      <Label>Interests (select at least one)</Label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {interestOptions.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <Checkbox
              id={option.id}
              checked={selectedInterests.includes(option.id)}
              onCheckedChange={(checked) =>
                onInterestChange(option.id, checked === true)
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
  );
}
