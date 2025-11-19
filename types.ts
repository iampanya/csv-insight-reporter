export interface RawCsvRow {
  BA: string;
  monthly: string;
  actCode: string;
  amount: string;
}

export interface CleanedDataRow {
  BA: string;
  monthly: string;
  actCode: string;
  amount: number;
}

export enum LoadingState {
  IDLE = 'IDLE',
  PARSING = 'PARSING',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface AnalysisResult {
  markdownReport: string;
  rawResponse: string;
}