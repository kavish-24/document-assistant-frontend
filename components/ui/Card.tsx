'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export default function Card({ children, title, className = '' }: CardProps) {
  return (
    <div className={`card ${className}`}>
      {title && (
        <h2 className="card-title">{title}</h2>
      )}
      {children}
    </div>
  );
}

