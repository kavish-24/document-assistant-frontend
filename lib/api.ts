import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface FileInfo {
  filename: string;
  message?: string;
  summary_generated?: boolean;
  storage?: string;
  url?: string;
}

export interface SummaryResponse {
  filename: string;
  summary: string;
  summary_file: string;
}

export interface SearchResult {
  document: {
    id: string;
    content: string;
    filename: string;
  };
  relevance: number;
  preview: string;
}

export interface SearchResponse {
  results: SearchResult[] | { error?: string };
}

// File Upload
export const uploadFile = async (file: File): Promise<FileInfo> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post<FileInfo>('/upload/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

// List Files
export const listFiles = async (): Promise<{ files: string[]; source: string }> => {
  const response = await api.get<{ files: string[]; source: string }>('/list_files/');
  return response.data;
};

// View Summary
export const viewSummary = async (filename: string): Promise<SummaryResponse> => {
  const response = await api.get<SummaryResponse>(`/view_summary/${encodeURIComponent(filename)}`);
  return response.data;
};

// Search Documents
export const searchDocuments = async (query: string): Promise<SearchResponse> => {
  const response = await api.post<SearchResponse>('/search/', { query });
  return response.data;
};

// Delete File
export const deleteFile = async (filename: string): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/delete_file/${encodeURIComponent(filename)}`);
  return response.data;
};

// Summarize Document (regenerate summary)
export const summarizeDocument = async (filename: string): Promise<{ filename: string; summary: string }> => {
  const response = await api.post<{ filename: string; summary: string }>('/summarize/', { filename });
  return response.data;
};

