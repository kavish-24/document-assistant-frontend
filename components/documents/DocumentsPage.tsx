'use client';

import { useState, useEffect } from 'react';
import { listFiles, viewSummary, searchDocuments, deleteFile, uploadFile, SearchResult } from '@/lib/api';
import FileUpload from '@/components/FileUpload';
import FileList from '@/components/FileList';
import SummaryModal from '@/components/SummaryModal';
import SearchBar from '@/components/SearchBar';
import SearchResults from '@/components/documents/SearchResults';
import Card from '@/components/ui/Card';
import Alert from '@/components/ui/Alert';

export default function DocumentsPage() {
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

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
    <div className="page-content">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">📄 Document Assistant</h1>
        <p className="page-subtitle">
          Upload, summarize, and search your documents with AI-powered intelligence
        </p>
      </div>

      {/* Alerts */}
      {error && (
        <Alert
          type="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      {success && (
        <Alert
          type="success"
          message={success}
          onClose={() => setSuccess(null)}
        />
      )}

      {/* Upload Section */}
      <Card title="Upload Document">
        <FileUpload onUpload={handleUpload} disabled={loading} />
      </Card>

      {/* Search Section */}
      <Card title="Search Documents">
        <SearchBar onSearch={handleSearch} disabled={loading} />
        <SearchResults results={searchResults} />
      </Card>

      {/* Documents List Section */}
      <Card title="Your Documents">
        {loading && files.length === 0 ? (
          <div className="loading">
            <span>Loading files...</span>
          </div>
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
      </Card>

      {/* Summary Modal */}
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

