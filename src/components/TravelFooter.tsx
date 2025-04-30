
import { Plane } from "lucide-react";

export function TravelFooter() {
  return (
    <footer className="w-full py-8 px-4 bg-travel-slate text-white mt-16">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Plane className="h-5 w-5" />
            <span className="font-semibold">Journey Gemini Compass</span>
          </div>
          <div className="flex flex-col md:flex-row items-center md:space-x-8 space-y-2 md:space-y-0">
            <a href="#" className="hover:text-travel-coral transition-colors">Terms</a>
            <a href="#" className="hover:text-travel-coral transition-colors">Privacy</a>
            <a href="#" className="hover:text-travel-coral transition-colors">Contact</a>
          </div>
        </div>
        <div className="mt-6 text-center text-sm text-slate-300">
          © {new Date().getFullYear()} Journey Gemini Compass. Powered by Gemini 1.5 Flash API.
        </div>
      </div>
    </footer>
  );
}
