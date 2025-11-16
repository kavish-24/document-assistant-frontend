'use client';

import { useState } from 'react';
import { useView } from '@/lib/store/ViewContext';

interface NavItem {
  key: string;
  label: string;
  icon: string;
  view: 'documents' | 'viewDocuments';
}

const navItems: NavItem[] = [
  { key: 'documents', label: 'Documents', icon: '📄', view: 'documents' },
  { key: 'viewDocuments', label: 'View Documents', icon: '👁️', view: 'viewDocuments' },
];

export default function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { activeView, setActiveView } = useView();

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="mobile-menu-button"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle menu"
      >
        <span style={{ fontSize: '1.5rem' }}>☰</span>
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${isMobileOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-content">
          {/* Logo/Brand */}
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <span style={{ fontSize: '2rem', marginRight: '0.75rem' }}>📄</span>
              <div>
                <h1 className="sidebar-title">Document Assistant</h1>
                <p className="sidebar-subtitle">AI-Powered</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="sidebar-nav">
            <ul className="nav-list">
              {navItems.map((item) => {
                const isActive = activeView === item.view;
                return (
                  <li key={item.key}>
                    <button
                      onClick={() => {
                        setActiveView(item.view);
                        setIsMobileOpen(false);
                      }}
                      className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        fontSize: 'inherit',
                      }}
                    >
                      <span className="nav-icon">{item.icon}</span>
                      <span className="nav-label">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="sidebar-footer">
            <p className="sidebar-footer-text">
              Powered by AI
            </p>
          </div>
        </div>

        {/* Overlay for mobile */}
        {isMobileOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </aside>
    </>
  );
}

