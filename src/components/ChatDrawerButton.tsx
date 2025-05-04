
import React from "react";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { TravelChatDrawer } from "@/components/TravelChatDrawer";
import { hasGeminiApiKey } from "@/services/geminiService";
import { useToast } from "@/hooks/use-toast";

export function ChatDrawerButton() {
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();
  
  const handleOpenChange = (isOpen: boolean) => {
    // If trying to open the drawer but no API key exists
    if (isOpen && !hasGeminiApiKey()) {
      toast({
        title: "Gemini API Key Required",
        description: "Please add your Gemini API key to use the chat assistant",
        variant: "destructive",
      });
      return;
    }
    
    setOpen(isOpen);
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20" aria-label="Open Travel Assistant">
          <Bot className="h-5 w-5 text-white" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh]">
        <TravelChatDrawer onClose={() => setOpen(false)} />
      </DrawerContent>
    </Drawer>
  );
}
