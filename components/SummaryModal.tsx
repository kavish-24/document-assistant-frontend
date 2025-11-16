'use client';

interface SummaryModalProps {
  filename: string;
  summary: string;
  onClose: () => void;
}

export default function SummaryModal({ filename, summary, onClose }: SummaryModalProps) {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem',
          marginBottom: '1.5rem',
          paddingBottom: '1rem',
          borderBottom: '2px solid #e5e7eb'
        }}>
          <span style={{ fontSize: '2rem' }}>📄</span>
          <div>
            <h2 style={{ 
              margin: 0, 
              color: '#1f2937',
              fontSize: '1.5rem',
              fontWeight: '700'
            }}>
              Document Summary
            </h2>
            <p style={{ 
              margin: '0.25rem 0 0 0', 
              color: '#6b7280',
              fontSize: '0.9375rem',
              fontWeight: '500'
            }}>
              {filename}
            </p>
          </div>
        </div>
        {summary ? (
          <div className="summary-content">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem',
              color: '#667eea',
              fontWeight: '600',
              fontSize: '0.9375rem'
            }}>
              <span>✨</span>
              <span>AI-Generated Summary</span>
            </div>
            {summary}
          </div>
        ) : (
          <div className="loading">
            <span>Loading summary...</span>
          </div>
        )}
      </div>
    </div>
  );
}

