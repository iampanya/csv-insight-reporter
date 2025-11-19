import Papa from 'papaparse';
import { CleanedDataRow, RawCsvRow } from '../types';

export const parseCsvFile = (file: File): Promise<CleanedDataRow[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<RawCsvRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const cleanedData: CleanedDataRow[] = results.data
            .filter(row => row.BA && row.amount) // Filter out incomplete rows
            .map((row) => ({
              BA: row.BA.trim(),
              monthly: row.monthly.trim(),
              actCode: row.actCode.trim(),
              // Remove commas and convert to float
              amount: parseFloat(row.amount.replace(/,/g, '')) || 0
            }));
          resolve(cleanedData);
        } catch (err) {
          reject(new Error("Error processing CSV data structure."));
        }
      },
      error: (err) => {
        reject(new Error(`CSV Parsing Error: ${err.message}`));
      }
    });
  });
};