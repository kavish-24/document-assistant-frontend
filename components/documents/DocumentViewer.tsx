'use client';

import { useState, useEffect } from 'react';

interface DocumentViewerProps {
  filename: string;
  url: string;
  onClose: () => void;
}

export default function DocumentViewer({ filename, url, onClose }: DocumentViewerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
  }, [url]);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError('Failed to load PDF. The file may be corrupted or the URL may have expired.');
  };

  return (
    <div className="modal" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '90vw', maxHeight: '90vh', width: '1000px' }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1.5rem',
          paddingBottom: '1rem',
          borderBottom: '2px solid #e5e7eb',
        }}>
          <span style={{ fontSize: '2rem' }}>📄</span>
          <div style={{ flex: 1 }}>
            <h2 style={{
              margin: 0,
              color: '#1f2937',
              fontSize: '1.5rem',
              fontWeight: '700',
            }}>
              {filename}
            </h2>
            <p style={{
              margin: '0.25rem 0 0 0',
              color: '#6b7280',
              fontSize: '0.9375rem',
              fontWeight: '500',
            }}>
              PDF Viewer
            </p>
          </div>
        </div>

        {error ? (
          <div style={{
            padding: '3rem',
            textAlign: 'center',
            color: 'var(--error-color)',
            background: 'var(--bg-secondary)',
            borderRadius: '12px',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
            <p style={{ margin: 0 }}>{error}</p>
            <button
              className="btn btn-primary"
              style={{ marginTop: '1rem' }}
              onClick={() => window.open(url, '_blank')}
            >
              <span>🔗</span>
              <span>Open in New Tab</span>
            </button>
          </div>
        ) : (
          <div style={{
            position: 'relative',
            width: '100%',
            height: '70vh',
            minHeight: '500px',
            background: '#f3f4f6',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '2px solid var(--border-color)',
          }}>
            {loading && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.9)',
                zIndex: 10,
              }}>
                <div className="loading">
                  <span>Loading PDF...</span>
                </div>
              </div>
            )}

            <iframe
              src={url}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              onLoad={handleLoad}
              onError={handleError}
              title={filename}
            />

            {/* Fallback embed for better compatibility */}
            <embed
              src={url}
              type="application/pdf"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: loading ? 'none' : 'block',
              }}
            />
          </div>
        )}

        <div style={{
          marginTop: '1.5rem',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '0.75rem',
        }}>
          <button
            className="btn btn-secondary"
            onClick={() => window.open(url, '_blank')}
          >
            <span>🔗</span>
            <span>Open in New Tab</span>
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              const link = document.createElement('a');
              link.href = url;
              link.download = filename;
              link.click();
            }}
          >
            <span>⬇️</span>
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
}

