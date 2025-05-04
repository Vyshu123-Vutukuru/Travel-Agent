
import React from "react";
import { Plane, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FlightOption } from "@/services/serpApiService";

interface FlightInfoCardProps {
  flightInfo: FlightOption;
}

export function FlightInfoCard({ flightInfo }: FlightInfoCardProps) {
  const flight = flightInfo.flights[0]; // Get the first flight (for simplicity)
  
  // Convert minutes to hours and minutes format
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Card className="mb-6">
      <CardHeader className="border-b pb-3">
        <CardTitle className="text-lg font-medium flex items-center">
          <Plane className="h-5 w-5 mr-2 text-travel-blue" />
          Flight Information
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Airline</p>
              <p className="font-medium">{flight.airline}</p>
              <p className="text-xs text-muted-foreground">Flight {flight.flight_number}</p>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="min-w-[80px]">
                <p className="font-medium">{flight.departure_airport.time}</p>
                <p className="text-sm">{flight.departure_airport.id}</p>
              </div>
              
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full flex items-center">
                  <div className="h-0.5 flex-1 bg-gray-200"></div>
                  <span className="mx-2">
                    <Clock className="h-4 w-4 text-travel-blue" />
                  </span>
                  <div className="h-0.5 flex-1 bg-gray-200"></div>
                </div>
                <span className="text-xs text-center text-muted-foreground mt-1">
                  {formatDuration(flight.duration)}
                </span>
              </div>
              
              <div className="min-w-[80px] text-right">
                <p className="font-medium">{flight.arrival_airport.time}</p>
                <p className="text-sm">{flight.arrival_airport.id}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="text-xl font-bold text-travel-blue">${flightInfo.price}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Class</p>
              <p className="font-medium">{flight.travel_class}</p>
            </div>
            
            {flight.extensions.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground">Amenities</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {flight.extensions.map((ext, i) => (
                    <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      {ext}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
