
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send, X } from "lucide-react";
import { generateChatResponse } from "@/services/geminiService";
import { useToast } from "@/hooks/use-toast";

interface Message {
  content: string;
  role: "user" | "assistant";
}

interface TravelChatDrawerProps {
  onClose: () => void;
}

export function TravelChatDrawer({ onClose }: TravelChatDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your travel assistant. How can I help you with your travel plans?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
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
      // Generate response based on the user's question
      const response = await generateChatResponse("", userMessage);
      
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
    <div className="flex flex-col h-[75vh]">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-travel-blue p-2 rounded-full mr-3">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-medium">Travel Assistant</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
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
            placeholder="Ask about travel plans..."
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
