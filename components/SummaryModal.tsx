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
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2 style={{ marginBottom: '1rem', color: '#1f2937' }}>
          Summary: {filename}
        </h2>
        {summary ? (
          <div className="summary-content">{summary}</div>
        ) : (
          <div className="loading">Loading summary...</div>
        )}
      </div>
    </div>
  );
}

