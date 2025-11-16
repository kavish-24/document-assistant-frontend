'use client';

import { useState, useEffect } from 'react';
import { uploadFile, listFiles, viewSummary, searchDocuments, deleteFile } from '@/lib/api';
import FileUpload from '@/components/FileUpload';
import FileList from '@/components/FileList';
import SummaryModal from '@/components/SummaryModal';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Load files on mount
  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      setLoading(true);
      const response = await listFiles();
      setFiles(response.files);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to load files');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file: File) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const response = await uploadFile(file);
      setSuccess(`File "${file.name}" uploaded successfully! Summary generated and document indexed.`);
      
      // Reload file list
      await loadFiles();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to upload file');
    } finally {
      setLoading(false);
    }
  };

  const handleViewSummary = async (filename: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await viewSummary(filename);
      setSummary(response.summary);
      setSelectedFile(filename);
      setShowSummaryModal(true);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to load summary');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await searchDocuments(query);
      
      if (response.results && Array.isArray(response.results)) {
        setSearchResults(response.results);
      } else if (response.results && 'error' in response.results) {
        setError(response.results.error || 'Search failed');
        setSearchResults([]);
      } else {
        setSearchResults([]);
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Search failed');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (filename: string) => {
    if (!confirm(`Are you sure you want to delete "${filename}"?`)) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await deleteFile(filename);
      setSuccess(`File "${filename}" deleted successfully`);
      await loadFiles();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to delete file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '2rem', color: 'white' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          📄 Document Assistant
        </h1>
        <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>
          Upload, summarize, and search your documents
        </p>
      </div>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {success && (
        <div className="success">
          {success}
        </div>
      )}

      <div className="card">
        <h2 style={{ marginBottom: '1.5rem', color: '#1f2937' }}>Upload Document</h2>
        <FileUpload onUpload={handleUpload} disabled={loading} />
      </div>

      <div className="card">
        <h2 style={{ marginBottom: '1.5rem', color: '#1f2937' }}>Search Documents</h2>
        <SearchBar onSearch={handleSearch} disabled={loading} />
        {searchResults.length > 0 && (
          <div className="search-results">
            <h3 style={{ marginBottom: '1rem', color: '#374151' }}>
              Found {searchResults.length} result(s)
            </h3>
            {searchResults.map((result, index) => (
              <div key={index} className="search-result-item">
                <div className="result-filename">{result.document.filename}</div>
                <div className="result-preview">{result.preview}</div>
                <div className="result-relevance">
                  Relevance: {(result.relevance * 100).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <h2 style={{ marginBottom: '1.5rem', color: '#1f2937' }}>Your Documents</h2>
        {loading && files.length === 0 ? (
          <div className="loading">Loading files...</div>
        ) : files.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📁</div>
            <p>No documents uploaded yet. Upload your first document to get started!</p>
          </div>
        ) : (
          <FileList
            files={files}
            onViewSummary={handleViewSummary}
            onDelete={handleDelete}
            loading={loading}
          />
        )}
      </div>

      {showSummaryModal && selectedFile && (
        <SummaryModal
          filename={selectedFile}
          summary={summary || ''}
          onClose={() => {
            setShowSummaryModal(false);
            setSelectedFile(null);
            setSummary(null);
          }}
        />
      )}
    </div>
  );
}

