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
          border: `2px dashed ${dragActive ? '#667eea' : '#d1d5db'}`,
          borderRadius: '8px',
          padding: '3rem',
          textAlign: 'center',
          backgroundColor: dragActive ? '#f3f4f6' : 'transparent',
          transition: 'all 0.3s ease',
          marginBottom: '1rem',
        }}
      >
        <input
          id="file-input"
          type="file"
          accept=".pdf,.docx,.pptx"
          onChange={handleChange}
          className="file-input"
          disabled={disabled}
        />
        <label htmlFor="file-input" className="file-input-label">
          Choose File or Drag & Drop
        </label>
        <p style={{ marginTop: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
          Supported formats: PDF, DOCX, PPTX
        </p>
        {selectedFile && (
          <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#dbeafe', borderRadius: '8px' }}>
            <strong>Selected:</strong> {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
          </div>
        )}
      </div>
      {selectedFile && (
        <button
          onClick={handleSubmit}
          disabled={disabled}
          className="btn btn-primary"
          style={{ width: '100%' }}
        >
          {disabled ? 'Uploading...' : 'Upload File'}
        </button>
      )}
    </div>
  );
}

