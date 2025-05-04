
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LocationInputProps {
  source: string;
  destination: string;
  onSourceChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
}

export function LocationInput({
  source,
  destination,
  onSourceChange,
  onDestinationChange
}: LocationInputProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="source">Source Location</Label>
        <Input
          id="source"
          placeholder="Where are you starting from?"
          value={source}
          onChange={(e) => onSourceChange(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="destination">Destination</Label>
        <Input
          id="destination"
          placeholder="Where do you want to go?"
          value={destination}
          onChange={(e) => onDestinationChange(e.target.value)}
          required
        />
      </div>
    </div>
  );
}
