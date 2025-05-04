
// SerpAPI service for flight data

interface Airport {
  name: string;
  id: string;
  time: string;
}

interface Flight {
  departure_airport: Airport;
  arrival_airport: Airport;
  duration: number;
  airplane: string;
  airline: string;
  airline_logo: string;
  travel_class: string;
  flight_number: string;
  extensions: string[];
  ticket_also_sold_by: string[];
  legroom: string;
  overnight: boolean;
  often_delayed_by_over_30_min: boolean;
  plane_and_crew_by: string;
}

interface Layover {
  duration: number;
  name: string;
  id: string;
  overnight: boolean;
}

interface CarbonEmissions {
  this_flight: number;
  typical_for_this_route: number;
  difference_percent: number;
}

export interface FlightOption {
  flights: Flight[];
  layovers: Layover[];
  total_duration: number;
  carbon_emissions: CarbonEmissions;
  price: number;
  type: string;
  airline_logo: string;
  extensions: string[];
  departure_token: string;
  booking_token: string;
}

export interface SerpApiFlightsResponse {
  best_flights: FlightOption[];
}

// Function to set SerpAPI key in localStorage
export function setSerpApiKey(key: string) {
  localStorage.setItem('serp_api_key', key);
  return true;
}

// Function to get SerpAPI key from localStorage
export function getSerpApiKey() {
  return localStorage.getItem('serp_api_key') || '';
}

// Function to check if SerpAPI key exists
export function hasSerpApiKey() {
  const key = localStorage.getItem('serp_api_key');
  return !!key && key.trim() !== '';
}

export async function getFlightData(source: string, destination: string): Promise<SerpApiFlightsResponse> {
  // For demo purposes, we'll still use the mock data
  // In a real application, you would make an actual API call with the SerpAPI key
  
  // const apiKey = getSerpApiKey();
  // if (!apiKey) {
  //   throw new Error("Please add your SerpAPI key in the settings.");
  // }
  
  // Real implementation would be:
  // const url = `https://serpapi.com/search.json?engine=google_flights&departure_id=${source}&arrival_id=${destination}&api_key=${apiKey}`;
  // const response = await fetch(url);
  // const data = await response.json();
  // return data;
  
  return {
    "best_flights": [
      {
        "flights": [
          {
            "departure_airport": {
              "name": `${source} International Airport`,
              "id": source.substring(0, 3).toUpperCase(),
              "time": "08:45 AM"
            },
            "arrival_airport": {
              "name": `${destination} International Airport`,
              "id": destination.substring(0, 3).toUpperCase(),
              "time": "11:30 AM"
            },
            "duration": 165,
            "airplane": "Boeing 737-800",
            "airline": "Delta Airlines",
            "airline_logo": "https://example.com/delta-logo.png",
            "travel_class": "Economy",
            "flight_number": "DL1234",
            "extensions": ["Wi-Fi available", "USB power"],
            "ticket_also_sold_by": ["Expedia", "Kayak"],
            "legroom": "32 inches",
            "overnight": false,
            "often_delayed_by_over_30_min": false,
            "plane_and_crew_by": "Delta Airlines",
          }
        ],
        "layovers": [],
        "total_duration": 165,
        "carbon_emissions": {
          "this_flight": 450000,
          "typical_for_this_route": 500000,
          "difference_percent": -10
        },
        "price": 299,
        "type": "One way",
        "airline_logo": "https://example.com/delta-logo.png",
        "extensions": ["Best price", "Direct flight"],
        "departure_token": "abc123",
        "booking_token": "xyz789",
      }
    ],
  };
}
