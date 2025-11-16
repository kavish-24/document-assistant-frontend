'use client';

import { useState, useEffect } from 'react';
import { listSupabaseFiles, getSignedUrl, SupabaseFile } from '@/lib/api';
import DocumentViewer from './DocumentViewer';
import Card from '@/components/ui/Card';
import Alert from '@/components/ui/Alert';

export default function ViewDocuments() {
  const [files, setFiles] = useState<SupabaseFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<SupabaseFile | null>(null);
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);
  const [loadingViewer, setLoadingViewer] = useState(false);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      setLoading(true);
      setError(null);
      const fileList = await listSupabaseFiles();
      setFiles(fileList);
    } catch (err: any) {
      setError(err.message || 'Failed to load documents from Supabase');
    } finally {
      setLoading(false);
    }
  };

  const handleFileClick = async (file: SupabaseFile) => {
    try {
      setLoadingViewer(true);
      setError(null);
      
      // Check if file is a PDF
      const isPDF = file.name.toLowerCase().endsWith('.pdf');
      
      if (!isPDF) {
        setError('Only PDF files can be viewed in the browser. Please download other file types.');
        setLoadingViewer(false);
        return;
      }

      // Get signed URL for the file
      const signedUrl = await getSignedUrl(file.name);
      setViewerUrl(signedUrl);
      setSelectedFile(file);
    } catch (err: any) {
      setError(err.message || 'Failed to load document');
    } finally {
      setLoadingViewer(false);
    }
  };

  const handleCloseViewer = () => {
    setSelectedFile(null);
    setViewerUrl(null);
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return '📄';
      case 'docx':
        return '📝';
      case 'pptx':
        return '📊';
      case 'doc':
        return '📝';
      case 'ppt':
        return '📊';
      default:
        return '📁';
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="page-content">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">👁️ View Documents</h1>
        <p className="page-subtitle">
          Browse and preview your documents from Supabase storage
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

      {/* Document Viewer */}
      {selectedFile && viewerUrl && (
        <DocumentViewer
          filename={selectedFile.name}
          url={viewerUrl}
          onClose={handleCloseViewer}
        />
      )}

      {/* Files List */}
      <Card title="Available Documents">
        {loading ? (
          <div className="loading">
            <span>Loading documents...</span>
          </div>
        ) : files.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📁</div>
            <p>No documents found in Supabase storage.</p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
              Make sure your Supabase bucket "files" is configured correctly.
            </p>
          </div>
        ) : (
          <div className="file-list">
            {files.map((file) => (
              <div
                key={file.id}
                className="file-item"
                style={{
                  cursor: file.name.toLowerCase().endsWith('.pdf') ? 'pointer' : 'default',
                  opacity: loadingViewer && selectedFile?.id === file.id ? 0.6 : 1,
                }}
                onClick={() => file.name.toLowerCase().endsWith('.pdf') && handleFileClick(file)}
              >
                <span className="file-icon">{getFileIcon(file.name)}</span>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span className="file-name">{file.name}</span>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {file.metadata?.size && formatFileSize(file.metadata.size)}
                    {file.created_at && (
                      <span style={{ marginLeft: '1rem' }}>
                        {new Date(file.created_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                {file.name.toLowerCase().endsWith('.pdf') && (
                  <button
                    className="btn btn-primary"
                    style={{ fontSize: '0.875rem', padding: '0.625rem 1.25rem' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFileClick(file);
                    }}
                    disabled={loadingViewer}
                  >
                    <span>👁️</span>
                    <span>View</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

