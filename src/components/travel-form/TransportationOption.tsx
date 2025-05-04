
import React from "react";
import { Plane } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface TransportationOptionProps {
  includeTransportation: boolean;
  onIncludeTransportationChange: (checked: boolean) => void;
}

export function TransportationOption({
  includeTransportation,
  onIncludeTransportationChange
}: TransportationOptionProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="includeTransportation"
        checked={includeTransportation}
        onCheckedChange={(checked) => onIncludeTransportationChange(checked === true)}
      />
      <Label
        htmlFor="includeTransportation"
        className="text-sm font-medium cursor-pointer flex items-center"
      >
        <Plane className="h-4 w-4 mr-2 text-travel-blue" />
        Include flight information
      </Label>
    </div>
  );
}
