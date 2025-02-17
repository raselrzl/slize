import { Instagram, Facebook, Twitter } from 'lucide-react';
export function Footer() {
  return (
    <footer className="mt-16 mb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="border-t border-gray-900/10 pt-2 sm:mt-20 lg:mt-24 flex items-center justify-between">
    <p className="text-xs leading-5 text-gray-700 mt-8">
      &copy; 2024 Slize and Co. All Rights Reserved.
    </p>
    <div className="flex space-x-6 items-center mt-8">
        <Instagram className="text-gray-900 hover:text-indigo-600 cursor-pointer" size={24} />
        <Facebook className="text-gray-900 hover:text-indigo-600 cursor-pointer" size={24} />
        <Twitter className="text-gray-900 hover:text-indigo-600 cursor-pointer" size={24} />
      </div>
  </div>
</footer>
  );
}
