import React from 'react';
import { BarChart3 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">CSV Insight Reporter</h1>
            <p className="text-xs text-gray-500">Powered by Google Gemini</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">Beta</span>
        </div>
      </div>
    </header>
  );
};

export default Header;