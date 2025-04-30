
import React, { useState } from "react";
import { Key } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { setGeminiApiKey, getGeminiApiKey } from "@/services/geminiService";

export function ApiKeyDialog() {
  const [open, setOpen] = useState(false);
  const [apiKey, setApiKey] = useState(getGeminiApiKey());
  const { toast } = useToast();
  
  const handleSave = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Gemini API key",
        variant: "destructive",
      });
      return;
    }
    
    setGeminiApiKey(apiKey);
    toast({
      title: "API Key Saved",
      description: "Your Gemini API key has been saved successfully",
    });
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Key className="h-4 w-4" />
          <span>API Key</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Gemini API Key</DialogTitle>
          <DialogDescription>
            Enter your Gemini API key to use the travel planning features. 
            You can get an API key from the 
            <a 
              href="https://ai.google.dev/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 mx-1"
            >
              Google AI Studio
            </a>.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
              type="password"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save API Key</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
