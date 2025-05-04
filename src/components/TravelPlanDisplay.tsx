
import React, { useState } from "react";
import { Calendar, MapPin, Ticket, Route, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';
import { FlightInfoCard } from "@/components/FlightInfoCard";
import { FlightOption } from "@/services/serpApiService";
import { TravelChat } from "@/components/TravelChat";
import { Button } from "@/components/ui/button";

interface TravelPlanDisplayProps {
  planContent: string;
  travelInfo: {
    source: string;
    destination: string;
    startDate: string;
    endDate: string;
    budget: string;
    travelers: string;
  };
  flightInfo?: FlightOption;
}

export function TravelPlanDisplay({
  planContent,
  travelInfo,
  flightInfo
}: TravelPlanDisplayProps) {
  const [showChat, setShowChat] = useState(false);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center">
                <Route className="h-4 w-4 mr-2 text-travel-blue" />
                Journey
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium">
                {travelInfo.source} to {travelInfo.destination}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-travel-blue" />
                Dates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium">
                {travelInfo.startDate} - {travelInfo.endDate}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center">
                <Ticket className="h-4 w-4 mr-2 text-travel-blue" />
                Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium">${travelInfo.budget}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-travel-blue" />
                Travelers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium">{travelInfo.travelers}</p>
            </CardContent>
          </Card>
        </div>
        
        {flightInfo && <FlightInfoCard flightInfo={flightInfo} />}
        
        <div className="prose max-w-none">
          <ReactMarkdown>{planContent}</ReactMarkdown>
        </div>
        
        <div className="mt-8 flex justify-center">
          <Button 
            onClick={() => setShowChat(!showChat)}
            className="flex items-center gap-2"
            variant={showChat ? "outline" : "default"}
          >
            <MessageSquare className="h-4 w-4" />
            {showChat ? "Hide Chat Assistant" : "Ask Travel Assistant"}
          </Button>
        </div>
        
        {showChat && (
          <TravelChat 
            travelPlan={planContent} 
            destination={travelInfo.destination} 
          />
        )}
      </div>
    </div>
  );
}
