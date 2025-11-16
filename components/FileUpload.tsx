'use client';

import { useState } from 'react';

interface FileUploadProps {
  onUpload: (file: File) => void;
  disabled?: boolean;
}

export default function FileUpload({ onUpload, disabled }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (isValidFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (isValidFile(file)) {
        setSelectedFile(file);
      }
    }
  };

  const isValidFile = (file: File): boolean => {
    const validExtensions = ['.pdf', '.docx', '.pptx'];
    const fileName = file.name.toLowerCase();
    return validExtensions.some(ext => fileName.endsWith(ext));
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      setSelectedFile(null);
      // Reset input
      const input = document.getElementById('file-input') as HTMLInputElement;
      if (input) {
        input.value = '';
      }
    }
  };

  return (
    <div>
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        style={{
          border: `3px dashed ${dragActive ? '#667eea' : '#d1d5db'}`,
          borderRadius: '16px',
          padding: '4rem 2rem',
          textAlign: 'center',
          backgroundColor: dragActive ? 'rgba(102, 126, 234, 0.05)' : 'transparent',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          marginBottom: '1.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {dragActive && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
            animation: 'pulse 1.5s ease-in-out infinite',
          }} />
        )}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ 
            fontSize: '4rem', 
            marginBottom: '1rem',
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
            animation: dragActive ? 'pulse 1s ease-in-out infinite' : 'none'
          }}>
            📤
          </div>
          <input
            id="file-input"
            type="file"
            accept=".pdf,.docx,.pptx"
            onChange={handleChange}
            className="file-input"
            disabled={disabled}
          />
          <label htmlFor="file-input" className="file-input-label" style={{ position: 'relative', zIndex: 2 }}>
            <span>📁</span>
            <span>Choose File or Drag & Drop</span>
          </label>
          <p style={{ 
            marginTop: '1.5rem', 
            color: '#6b7280', 
            fontSize: '0.9375rem',
            fontWeight: '500'
          }}>
            Supported formats: <strong>PDF</strong>, <strong>DOCX</strong>, <strong>PPTX</strong>
          </p>
          {selectedFile && (
            <div style={{ 
              marginTop: '1.5rem', 
              padding: '1rem 1.25rem', 
              background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', 
              borderRadius: '12px',
              border: '2px solid #93c5fd',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              animation: 'slideUp 0.3s ease-out'
            }}>
              <span style={{ fontSize: '1.5rem' }}>✅</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: '600', color: '#1e40af', marginBottom: '0.25rem' }}>
                  {selectedFile.name}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#3b82f6' }}>
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {selectedFile && (
        <button
          onClick={handleSubmit}
          disabled={disabled}
          className="btn btn-primary"
          style={{ width: '100%', fontSize: '1rem', padding: '1rem' }}
        >
          {disabled ? (
            <>
              <span className="loading-spinner" style={{
                width: '16px',
                height: '16px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderTopColor: 'white',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
                display: 'inline-block'
              }} />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <span>🚀</span>
              <span>Upload File</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}

