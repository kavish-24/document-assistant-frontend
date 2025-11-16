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
      {files.map((filename, index) => (
        <li 
          key={filename} 
          className="file-item"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <span className="file-icon">
            {getFileIcon(filename)}
          </span>
          <span className="file-name">{filename}</span>
          <div className="file-actions">
            <button
              onClick={() => onViewSummary(filename)}
              disabled={loading}
              className="btn btn-secondary"
              style={{ fontSize: '0.875rem', padding: '0.625rem 1.25rem' }}
            >
              <span>📋</span>
              <span>View Summary</span>
            </button>
            <button
              onClick={() => onDelete(filename)}
              disabled={loading}
              className="btn btn-danger"
              style={{ fontSize: '0.875rem', padding: '0.625rem 1.25rem' }}
            >
              <span>🗑️</span>
              <span>Delete</span>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

