import { TreePine } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <TreePine
              className="text-amber-400 animate-bounce dark:text-[#5FFFB5]"
              size={24}
            />
            <span className="text-white font-bold">Jungle Treasures</span>
          </div>
          <p className="text-gray-400">
            © 2025 Jungle Treasures. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
