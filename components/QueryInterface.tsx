import React, { useState } from 'react';
import { Send, Loader2, Sparkles } from 'lucide-react';
import { LoadingState } from '../types';

interface QueryInterfaceProps {
  onQuery: (query: string) => void;
  loadingState: LoadingState;
  hasData: boolean;
}

const QueryInterface: React.FC<QueryInterfaceProps> = ({ onQuery, loadingState, hasData }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (query.trim() && hasData) {
      onQuery(query);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if IME composition is active (important for Thai, Chinese, Japanese, etc.)
    if (e.nativeEvent.isComposing) {
      return;
    }

    // Check if Enter is pressed without Shift
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent new line
      handleSubmit();
    }
  };

  const predefinedQueries = [
    "สรุปยอด amount รวมทั้งหมด",
    "แสดงยอดรวมแยกตาม BA",
    "เปรียบเทียบยอด amount รายเดือน",
    "หา Business Area ที่มียอดสูงสุด 5 อันดับแรก"
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          ถามคำถามเกี่ยวกับข้อมูลของคุณ
        </h2>
        
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!hasData || loadingState === LoadingState.ANALYZING}
            placeholder={hasData ? "พิมพ์คำถามที่ต้องการทราบ เช่น 'สรุปยอด amount รวมต่อ BA'...\n(กด Enter เพื่อส่ง, Shift+Enter เพื่อขึ้นบรรทัดใหม่)" : "กรุณาอัปโหลดไฟล์ CSV ก่อนเริ่มใช้งาน"}
            className="w-full p-4 pr-14 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[120px] disabled:bg-gray-50 disabled:text-gray-400 text-base"
          />
          <button
            type="submit"
            disabled={!query.trim() || !hasData || loadingState === LoadingState.ANALYZING}
            className="absolute bottom-3 right-3 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {loadingState === LoadingState.ANALYZING ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </form>

        {hasData && (
          <div className="mt-4">
            <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">ตัวอย่างคำถาม</p>
            <div className="flex flex-wrap gap-2">
              {predefinedQueries.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setQuery(q)}
                  disabled={loadingState === LoadingState.ANALYZING}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 px-3 rounded-md transition-colors border border-transparent hover:border-gray-300"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QueryInterface;