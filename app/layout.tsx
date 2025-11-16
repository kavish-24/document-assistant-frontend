import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import { ViewProvider } from '@/lib/store/ViewContext';

export const metadata: Metadata = {
  title: 'Document Assistant',
  description: 'Upload, summarize, and search documents',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ViewProvider>
          <div className="app-layout">
            <Sidebar />
            <main className="main-content">
              {children}
            </main>
          </div>
        </ViewProvider>
      </body>
    </html>
  );
}

