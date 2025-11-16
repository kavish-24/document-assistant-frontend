'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  disabled?: boolean;
}

export default function SearchBar({ onSearch, disabled }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', gap: '0.75rem', position: 'relative' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <span style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '1.25rem',
            color: '#9ca3af',
            pointerEvents: 'none'
          }}>
            🔍
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documents by content, keywords, or phrases..."
            className="input"
            disabled={disabled}
            style={{ paddingLeft: '3rem' }}
          />
        </div>
        <button
          type="submit"
          disabled={disabled || !query.trim()}
          className="btn btn-primary"
          style={{ minWidth: '120px' }}
        >
          {disabled ? (
            <>
              <span style={{
                width: '14px',
                height: '14px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderTopColor: 'white',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
                display: 'inline-block'
              }} />
              <span>Searching...</span>
            </>
          ) : (
            <>
              <span>🔎</span>
              <span>Search</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

