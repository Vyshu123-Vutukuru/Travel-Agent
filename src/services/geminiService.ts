
interface TravelFormData {
  source: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  travelers: string;
  interests: string[];
}

export async function generateTravelPlan(formData: TravelFormData) {
  try {
    const API_KEY = "YOUR_API_KEY"; // You'll need to replace this with your actual API key
    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
    
    const prompt = `
      You are a travel planning assistant. Create a detailed travel itinerary based on the following information:
      
      - Source location: ${formData.source}
      - Destination: ${formData.destination}
      - Travel dates: ${formData.startDate} to ${formData.endDate}
      - Budget: ${formData.budget}
      - Number of travelers: ${formData.travelers}
      - Interests: ${formData.interests.join(', ')}
      
      Please provide:
      1. A day-by-day itinerary with morning, afternoon, and evening activities
      2. Recommended accommodations that fit the budget
      3. Transportation options and estimated costs
      4. Suggested restaurants and local cuisine to try
      5. Hidden gems or local experiences based on the travelers' interests
      6. Estimated total cost breakdown for the trip
      
      Format your response in clear sections with markdown formatting for readability.
    `;

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating travel plan:', error);
    throw error;
  }
}
