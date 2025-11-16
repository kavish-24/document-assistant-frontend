'use client';

interface FileListProps {
  files: string[];
  onViewSummary: (filename: string) => void;
  onDelete: (filename: string) => void;
  loading?: boolean;
}

export default function FileList({ files, onViewSummary, onDelete, loading }: FileListProps) {
  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return '📄';
      case 'docx':
        return '📝';
      case 'pptx':
        return '📊';
      default:
        return '📁';
    }
  };

  return (
    <ul className="file-list">
      {files.map((filename) => (
        <li key={filename} className="file-item">
          <span style={{ marginRight: '1rem', fontSize: '1.5rem' }}>
            {getFileIcon(filename)}
          </span>
          <span className="file-name">{filename}</span>
          <div className="file-actions">
            <button
              onClick={() => onViewSummary(filename)}
              disabled={loading}
              className="btn btn-secondary"
              style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
            >
              View Summary
            </button>
            <button
              onClick={() => onDelete(filename)}
              disabled={loading}
              className="btn btn-danger"
              style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

