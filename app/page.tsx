'use client';

import { useView } from '@/lib/store/ViewContext';
import DocumentsPage from '@/components/documents/DocumentsPage';
import ViewDocuments from '@/components/documents/ViewDocuments';

export default function Home() {
  const { activeView } = useView();

  // Render the appropriate view based on activeView state
  if (activeView === 'viewDocuments') {
    return <ViewDocuments />;
  }

  // Default to DocumentsPage
  return <DocumentsPage />;
}

