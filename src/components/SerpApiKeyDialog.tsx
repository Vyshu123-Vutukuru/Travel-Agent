
import React, { useState } from "react";
import { Search } from "lucide-react";
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
import { setSerpApiKey, getSerpApiKey } from "@/services/serpApiService";

export function SerpApiKeyDialog() {
  const [open, setOpen] = useState(false);
  const [apiKey, setApiKey] = useState(getSerpApiKey());
  const { toast } = useToast();
  
  const handleSave = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your SerpAPI key",
        variant: "destructive",
      });
      return;
    }
    
    setSerpApiKey(apiKey);
    toast({
      title: "API Key Saved",
      description: "Your SerpAPI key has been saved successfully",
    });
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 ml-2">
          <Search className="h-4 w-4" />
          <span>SerpAPI</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set SerpAPI Key</DialogTitle>
          <DialogDescription>
            Enter your SerpAPI key to enable flight data retrieval features. 
            You can get an API key from the 
            <a 
              href="https://serpapi.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 mx-1"
            >
              SerpAPI website
            </a>.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="serpApiKey">API Key</Label>
            <Input
              id="serpApiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your SerpAPI key"
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
