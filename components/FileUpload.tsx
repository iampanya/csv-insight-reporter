import React, { useRef } from 'react';
import { Upload, FileSpreadsheet, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  fileName: string | null;
  onClear: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, fileName, onClear }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileSelect(event.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".csv"
        className="hidden"
      />
      
      {!fileName ? (
        <div 
          onClick={triggerFileInput}
          className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
        >
          <div className="bg-gray-100 p-4 rounded-full group-hover:bg-white group-hover:shadow-md transition-all duration-200 mb-4">
            <Upload className="w-8 h-8 text-gray-500 group-hover:text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 group-hover:text-blue-700">อัปโหลดไฟล์ CSV</h3>
          <p className="text-sm text-gray-500 mt-1">ลากและวาง หรือคลิกเพื่อเลือกไฟล์ (เช่น H_ZCSR181H_Cleaned...)</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <FileSpreadsheet className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{fileName}</p>
              <p className="text-xs text-gray-500">พร้อมสำหรับการวิเคราะห์</p>
            </div>
          </div>
          <button 
            onClick={onClear}
            className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;