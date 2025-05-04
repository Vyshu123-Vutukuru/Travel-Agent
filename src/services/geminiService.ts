
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
    const API_KEY = localStorage.getItem('gemini_api_key');
    
    if (!API_KEY) {
      throw new Error("Please add your Gemini API key in the settings.");
    }
    
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
      const errorData = await response.json();
      const errorMessage = errorData?.error?.message || 'Unknown error';
      const errorStatus = response.status;
      
      if (errorStatus === 400 || errorStatus === 401 || errorStatus === 403) {
        throw new Error(`API Key Error: ${errorMessage}. Please check your Gemini API key.`);
      } else {
        throw new Error(`API Error (${errorStatus}): ${errorMessage}`);
      }
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating travel plan:', error);
    throw error;
  }
}

export async function generateChatResponse(travelPlan: string, userQuestion: string) {
  try {
    const API_KEY = localStorage.getItem('gemini_api_key');
    
    if (!API_KEY) {
      throw new Error("Please add your Gemini API key in the settings.");
    }
    
    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
    
    const prompt = `
      You are a helpful travel assistant that is helping the user with their travel plan.
      
      Here is the travel plan:
      ${travelPlan}
      
      User's question: ${userQuestion}
      
      Provide a helpful, conversational response that focuses on answering their question with specific information from the travel plan.
      Keep your answer concise but informative, directly addressing what they asked about.
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
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error (${response.status}): ${errorData?.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating chat response:', error);
    throw error;
  }
}

export function setGeminiApiKey(key: string) {
  try {
    // Test if the key is valid before saving
    const trimmedKey = key.trim();
    if (!trimmedKey) {
      throw new Error("API key cannot be empty");
    }
    
    localStorage.setItem('gemini_api_key', trimmedKey);
    return true;
  } catch (error) {
    console.error('Error setting API key:', error);
    return false;
  }
}

export function getGeminiApiKey() {
  return localStorage.getItem('gemini_api_key') || '';
}

export function hasGeminiApiKey() {
  const key = localStorage.getItem('gemini_api_key');
  return !!key && key.trim() !== '';
}
