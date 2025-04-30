
import { Plane, Key } from "lucide-react";
import { ApiKeyDialog } from "@/components/ApiKeyDialog";

export function TravelHeader() {
  return (
    <header className="w-full py-6 px-4 flex items-center justify-center travel-gradient text-white">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Plane className="h-6 w-6" />
          <h1 className="text-xl font-bold">Journey Gemini Compass</h1>
        </div>
        <div className="flex items-center space-x-4">
          <ApiKeyDialog />
          <nav>
            <ul className="flex space-x-6">
              <li><a href="/" className="hover:text-travel-sand transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-travel-sand transition-colors">About</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
