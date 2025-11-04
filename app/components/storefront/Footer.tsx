import { Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="mb-0 sm:px-6 lg:px-8 bg-gray-200 max-w-screen-xl mx-auto px-4 py-8 border-t border-gray-950/10">
      {/* Links Section */}
      <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-800 mb-6 text-bold">
        <a href="#" className="hover:underline transition-colors">
          Tech blog
        </a>
        <a href="#" className="hover:underline transition-colors">
          Company information
        </a>
        <a href="#" className="hover:underline transition-colors">
          General terms and conditions
        </a>
        <a href="#" className="hover:underline transition-colors">
          Data protection
        </a>
        <a href="#" className="hover:underline transition-colors">
          Cookie settings
        </a>
        <a href="#" className="hover:underline transition-colors">
          Community Guidelines
        </a>
      </div>

      {/* Bottom Row */}
      <div className="border-t border-gray-900/10 pt-2 sm:mt-10 flex flex-col sm:flex-row items-center justify-between">
        <p className="text-xs leading-5 text-gray-500 mt-4 sm:mt-0">
          &copy; 2024 Kronstil and Co. All Rights Reserved.
        </p>
        <div className="flex space-x-2 items-center mt-4 sm:mt-0">
          <div className="h-10 w-10 bg-gray-800 flex justify-center items-center">
            <Instagram
              className="text-gray-100 hover:text-gray-600 cursor-pointer"
              size={24}
            />
          </div>
          <div className="h-10 w-10 bg-gray-800 flex justify-center items-center">
            <Facebook
              className="text-gray-100 hover:text-gray-600 cursor-pointer"
              size={24}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
