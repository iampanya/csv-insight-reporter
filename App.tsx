import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import QueryInterface from './components/QueryInterface';
import ReportViewer from './components/ReportViewer';
import { parseCsvFile } from './utils/csvParser';
import { generateReport } from './services/geminiService';
import { CleanedDataRow, LoadingState } from './types';
import { AlertCircle } from 'lucide-react';

function App() {
  const [data, setData] = useState<CleanedDataRow[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [report, setReport] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback(async (file: File) => {
    setLoadingState(LoadingState.PARSING);
    setError(null);
    setReport('');
    try {
      const parsedData = await parseCsvFile(file);
      if (parsedData.length === 0) {
        throw new Error("ไม่พบข้อมูลในไฟล์ CSV");
      }
      setData(parsedData);
      setFileName(file.name);
      setLoadingState(LoadingState.SUCCESS);
    } catch (err) {
      console.error(err);
      setError((err as Error).message || "ไม่สามารถอ่านไฟล์ CSV ได้ กรุณาตรวจสอบรูปแบบไฟล์");
      setLoadingState(LoadingState.ERROR);
    }
  }, []);

  const handleClearFile = useCallback(() => {
    setData([]);
    setFileName(null);
    setReport('');
    setError(null);
    setLoadingState(LoadingState.IDLE);
  }, []);

  const handleQuery = useCallback(async (query: string) => {
    if (data.length === 0) return;

    setLoadingState(LoadingState.ANALYZING);
    setError(null);
    
    try {
      // Limit data size if necessary, though modern models allow large context.
      // Sending up to 15000 rows as a safe buffer for 2.5 Flash
      const dataToSend = data.length > 15000 ? data.slice(0, 15000) : data;
      
      const markdown = await generateReport(dataToSend, query);
      setReport(markdown);
      setLoadingState(LoadingState.SUCCESS);
    } catch (err) {
      console.error(err);
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อกับ Gemini API หรือวิเคราะห์ข้อมูล");
      setLoadingState(LoadingState.ERROR);
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-5xl">
        
        <div className="space-y-6">
          {/* Step 1: Upload */}
          <section className="animate-fade-in">
            <FileUpload 
              onFileSelect={handleFileSelect} 
              fileName={fileName} 
              onClear={handleClearFile} 
            />
          </section>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 animate-pulse">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Step 2: Query Interface */}
          <section className={`transition-all duration-500 ${fileName ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4 pointer-events-none'}`}>
            <QueryInterface 
              onQuery={handleQuery} 
              loadingState={loadingState} 
              hasData={!!fileName} 
            />
          </section>

          {/* Step 3: Report Display */}
          {report && (
            <section className="animate-slide-up">
              <ReportViewer markdown={report} />
            </section>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2025 Gemini CSV Insight Reporter. Built for performance on Vercel.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;