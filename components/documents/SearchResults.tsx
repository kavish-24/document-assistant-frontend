'use client';

import { SearchResult } from '@/lib/api';

interface SearchResultsProps {
  results: SearchResult[];
}

export default function SearchResults({ results }: SearchResultsProps) {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className="search-results">
      <h3 className="search-results-title">
        <span>🔍</span>
        <span>Found {results.length} result{results.length !== 1 ? 's' : ''}</span>
      </h3>
      {results.map((result, index) => (
        <div
          key={index}
          className="search-result-item"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="result-filename">
            <span>📄</span>
            <span>{result.document.filename}</span>
          </div>
          <div className="result-preview">{result.preview}</div>
          <div className="result-relevance">
            <span>⭐</span>
            <span>Relevance: {(result.relevance * 100).toFixed(1)}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}

