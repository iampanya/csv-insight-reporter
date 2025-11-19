import React from 'react';
import ReactMarkdown from 'react-markdown';
import { FileText } from 'lucide-react';

interface ReportViewerProps {
  markdown: string;
}

const ReportViewer: React.FC<ReportViewerProps> = ({ markdown }) => {
  if (!markdown) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mt-6">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
        <FileText className="w-5 h-5 text-gray-500" />
        <h3 className="font-semibold text-gray-800">รายงานผลการวิเคราะห์</h3>
      </div>
      <div className="p-8 overflow-x-auto report-content">
        <article className="prose prose-blue max-w-none prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-th:bg-gray-100 prose-th:p-3 prose-td:p-3 prose-table:border prose-table:border-collapse">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
};

export default ReportViewer;