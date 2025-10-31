import { Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="mb-0 sm:px-6 lg:px-8 bg-black text-white max-w-screen-xl mx-auto px-4 py-8">
      {/* Links Section */}
      <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 mb-6">
        <a href="#" className="hover:text-white transition-colors">
          Tech blog
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Company information
        </a>
        <a href="#" className="hover:text-white transition-colors">
          General terms and conditions
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Data protection
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Cookie settings
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Community Guidelines
        </a>
      </div>

      {/* Bottom Row */}
      <div className="border-t border-gray-900/10 pt-2 sm:mt-10 flex flex-col sm:flex-row items-center justify-between">
        <p className="text-xs leading-5 text-gray-500 mt-4 sm:mt-0">
          &copy; 2024 Kronstil and Co. All Rights Reserved.
        </p>
        <div className="flex space-x-2 items-center mt-4 sm:mt-0">
          <div className="h-10 w-10 bg-red-100 flex justify-center items-center">
            <Instagram
              className="text-black hover:text-gray-600 cursor-pointer"
              size={24}
            />
          </div>
          <div className="h-10 w-10 bg-red-100 flex justify-center items-center">
            <Facebook
              className="text-black hover:text-gray-600 cursor-pointer"
              size={24}
            />
          </div>
          <div className="h-10 w-10 bg-red-100 flex justify-center items-center">
            <Twitter
              className="text-black hover:text-gray-600 cursor-pointer"
              size={24}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
