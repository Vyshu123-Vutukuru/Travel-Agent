
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send } from "lucide-react";
import { generateChatResponse } from "@/services/geminiService";
import { useToast } from "@/hooks/use-toast";

interface Message {
  content: string;
  role: "user" | "assistant";
}

interface TravelChatProps {
  travelPlan: string;
  destination: string;
}

export function TravelChat({ travelPlan, destination }: TravelChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi! I'm your travel assistant. Ask me anything about your trip to ${destination}!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    
    // Add user message to chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: userMessage },
    ]);

    setIsLoading(true);

    try {
      // Generate response based on the travel plan and user's question
      const response = await generateChatResponse(travelPlan, userMessage);
      
      // Add assistant response to chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: response },
      ]);
    } catch (error: any) {
      console.error("Error generating chat response:", error);
      toast({
        title: "Error generating response",
        description: error.message || "Please check your API key or try again later.",
        variant: "destructive",
      });
      
      // Add error message to chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { 
          role: "assistant", 
          content: "I'm sorry, I couldn't process your question. Please check your API key or try again." 
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-white rounded-lg shadow-md mt-8">
      <div className="p-4 border-b flex items-center">
        <MessageSquare className="h-5 w-5 mr-2 text-travel-blue" />
        <h3 className="text-lg font-medium">Travel Assistant Chat</h3>
      </div>
      
      <div className="p-4 h-80 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === "user" ? "flex justify-end" : "flex justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === "user"
                  ? "bg-travel-blue text-white rounded-br-none"
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your travel plan..."
            className="flex-1 min-h-[60px]"
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (input.trim()) {
                  handleSendMessage(e);
                }
              }
            }}
          />
          <Button 
            type="submit" 
            disabled={!input.trim() || isLoading} 
            className="h-[60px]"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
